import { Navbar } from "@/components/marketing/navbar"
import { Hero } from "@/components/marketing/hero"
import { ProblemSection } from "@/components/marketing/problem-section"
import { FeaturesSection } from "@/components/marketing/features-section"
import { PricingSection } from "@/components/marketing/pricing-section"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { FAQSection } from "@/components/marketing/faq-section"
import { FinalCTA } from "@/components/marketing/final-cta"
import { Footer } from "@/components/marketing/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
