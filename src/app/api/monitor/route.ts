import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { runBrandMonitor } from "@/lib/ai-monitor"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { brandId, engine } = body

    if (!brandId) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      )
    }

    const brand = await prisma.brand.findFirst({
      where: { id: brandId, userId: session.user.id },
    })

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    const engines = engine ? [engine] : ["chatgpt", "gemini", "perplexity", "copilot"]
    const results = []

    for (const eng of engines) {
      const result = await runBrandMonitor(brand.name, brand.website, eng)
      results.push(result)

      await prisma.monitor.create({
        data: {
          brandId,
          engine: eng,
          visibility: result.visibility,
          response: result.response,
          sentiment: result.sentiment,
        },
      })
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error("Failed to run monitor:", error)
    return NextResponse.json(
      { error: "Failed to run monitoring" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const brandId = searchParams.get("brandId")

    const where = brandId ? { brandId } : { brand: { userId: session.user.id } }

    const monitors = await prisma.monitor.findMany({
      where,
      include: { brand: true },
      orderBy: { checkedAt: "desc" },
      take: 100,
    })

    return NextResponse.json(monitors)
  } catch (error) {
    console.error("Failed to fetch monitors:", error)
    return NextResponse.json(
      { error: "Failed to fetch monitors" },
      { status: 500 }
    )
  }
}
