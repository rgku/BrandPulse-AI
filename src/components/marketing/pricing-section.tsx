import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small brands getting started with AI monitoring",
    features: [
      "Monitor up to 3 brands",
      "Daily visibility checks",
      "Basic sentiment analysis",
      "Email alerts",
      "Weekly reports",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "For growing brands that need deeper AI search insights",
    features: [
      "Monitor up to 10 brands",
      "Hourly visibility checks",
      "Advanced sentiment analysis",
      "Real-time alerts",
      "Daily reports",
      "Competitor tracking",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: 199,
    description: "For agencies managing multiple client brands at scale",
    features: [
      "Unlimited brands",
      "Real-time visibility checks",
      "Full sentiment breakdown",
      "Instant alerts via SMS",
      "Custom reports",
      "White-label reports",
      "Priority support",
      "Team collaboration",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent{" "}
            <span className="text-primary">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start monitoring your brand today. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`border-border bg-card relative ${
                plan.popular ? "ring-2 ring-primary shadow-lg shadow-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className="block">
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
