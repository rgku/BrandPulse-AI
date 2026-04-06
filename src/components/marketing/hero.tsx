import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm mb-8">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          Now monitoring 4+ AI search engines
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Know How AI{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Sees Your Brand
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Monitor your brand visibility across ChatGPT, Gemini, Perplexity & more.
          Get actionable insights to improve your AI search presence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href="/auth/register">
            <Button size="lg" className="gap-2">
              Start Free 7-Day Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2">
            <Play className="h-4 w-4" />
            Watch Demo
          </Button>
        </div>

        <div className="relative rounded-xl border border-border bg-muted/50 p-2 max-w-4xl mx-auto">
          <div className="rounded-lg bg-muted p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { engine: "ChatGPT", score: 87 },
                { engine: "Gemini", score: 72 },
                { engine: "Perplexity", score: 91 },
                { engine: "Copilot", score: 68 },
              ].map((item) => (
                <div key={item.engine} className="rounded-lg bg-background p-4 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{item.engine}</p>
                  <p className="text-2xl font-bold text-primary">{item.score}%</p>
                  <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
