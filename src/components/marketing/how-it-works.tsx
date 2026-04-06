import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Search, TrendingUp } from "lucide-react"

const steps = [
  {
    icon: Plus,
    step: "01",
    title: "Add Your Brand",
    description: "Enter your brand name, website, and key terms you want to track across AI engines.",
  },
  {
    icon: Search,
    step: "02",
    title: "We Monitor 24/7",
    description: "Our system queries ChatGPT, Gemini, Perplexity, and Copilot to check how your brand appears.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Improve Your Presence",
    description: "Get actionable insights, weekly reports, and recommendations to boost your AI visibility.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it{" "}
            <span className="text-primary">works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started in minutes. No complex setup required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card key={step.step} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
