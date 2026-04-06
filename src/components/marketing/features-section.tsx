import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Bell, Brain, Mail } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description: "Track your brand across all major AI engines automatically. Never miss a mention.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Get notified instantly when your visibility drops or sentiment changes.",
  },
  {
    icon: Brain,
    title: "AI Recommendations",
    description: "Receive actionable steps to improve your AI search presence and rankings.",
  },
  {
    icon: Mail,
    title: "Weekly Reports",
    description: "Beautiful, detailed reports delivered straight to your inbox every week.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to{" "}
            <span className="text-primary">dominate AI search</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools to monitor, analyze, and improve your brand presence across all AI platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
