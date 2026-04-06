import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { stripe } from "@/lib/stripe"

const planPriceIds: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_ID_STARTER!,
  pro: process.env.STRIPE_PRICE_ID_PRO!,
  agency: process.env.STRIPE_PRICE_ID_AGENCY!,
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 })
    }

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { plan } = body

    if (!plan || !planPriceIds[plan]) {
      return NextResponse.json(
        { error: "Invalid plan selected" },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: planPriceIds[plan],
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
      metadata: {
        userId: session.user.id,
        plan,
      },
      client_reference_id: session.user.id,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Failed to create checkout session:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
