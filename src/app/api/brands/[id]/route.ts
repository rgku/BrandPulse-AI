import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const brand = await prisma.brand.findFirst({
      where: { id, userId: session.user.id },
      include: {
        monitors: {
          orderBy: { checkedAt: "desc" },
          take: 30,
        },
      },
    })

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    return NextResponse.json(brand)
  } catch (error) {
    console.error("Failed to fetch brand:", error)
    return NextResponse.json(
      { error: "Failed to fetch brand" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const brand = await prisma.brand.findFirst({
      where: { id, userId: session.user.id },
    })

    if (!brand) {
      return NextResponse.json({ error: "Brand not found" }, { status: 404 })
    }

    await prisma.brand.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete brand:", error)
    return NextResponse.json(
      { error: "Failed to delete brand" },
      { status: 500 }
    )
  }
}
