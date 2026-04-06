import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function FinalCTA() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to see how AI{" "}
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            sees your brand
          </span>
          ?
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
          Join hundreds of brands already monitoring their AI presence. Start your free 7-day trial today.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/register">
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
