import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Activity } from "lucide-react"

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Activity className="h-6 w-6 text-primary" />
          <span>BrandPulse <span className="text-primary">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm">Start Free Trial</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
