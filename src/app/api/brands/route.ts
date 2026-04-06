import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const brands = await prisma.brand.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(brands)
  } catch (error) {
    console.error("Failed to fetch brands:", error)
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, website } = body

    if (!name) {
      return NextResponse.json(
        { error: "Brand name is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    const brandCount = await prisma.brand.count({
      where: { userId: session.user.id },
    })

    const maxBrands = 100

    if (brandCount >= maxBrands) {
      return NextResponse.json(
        { error: `You can only monitor up to ${maxBrands} brands on your current plan` },
        { status: 403 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        website: website || null,
        userId: session.user.id,
      },
    })

    return NextResponse.json(brand, { status: 201 })
  } catch (error) {
    console.error("Failed to create brand:", error)
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    )
  }
}
