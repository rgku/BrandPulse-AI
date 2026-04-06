import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { monitorBrand } from "@/lib/ai-monitor"

export async function POST() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const brands = await prisma.brand.findMany({
      where: { userId: session.user.id },
    })

    const results: Record<string, unknown> = {}

    for (const brand of brands) {
      try {
        const monitorResults = await monitorBrand(brand.id)
        results[brand.id] = monitorResults
      } catch (error) {
        console.error(`Failed to monitor brand ${brand.id}:`, error)
        results[brand.id] = { error: "Monitoring failed" }
      }
    }

    return NextResponse.json({
      success: true,
      brandsMonitored: brands.length,
      results,
    })
  } catch (error) {
    console.error("Failed to trigger monitoring:", error)
    return NextResponse.json(
      { error: "Failed to trigger monitoring" },
      { status: 500 }
    )
  }
}
