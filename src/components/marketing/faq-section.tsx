"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is AI search visibility?",
    answer: "AI search visibility measures how often and how prominently your brand appears when users ask AI assistants like ChatGPT, Gemini, or Perplexity about your industry, products, or competitors.",
  },
  {
    question: "Which AI engines do you monitor?",
    answer: "We currently monitor ChatGPT, Google Gemini, Perplexity AI, and Microsoft Copilot. We're constantly adding support for new AI platforms as they emerge.",
  },
  {
    question: "How often is my brand checked?",
    answer: "Depending on your plan, brands are checked anywhere from once daily (Starter) to real-time monitoring (Agency). Pro plans include hourly checks.",
  },
  {
    question: "Can I track my competitors too?",
    answer: "Yes! Pro and Agency plans include competitor tracking. You can add competitor brands and compare visibility scores side by side.",
  },
  {
    question: "How is the visibility score calculated?",
    answer: "Our score (0-100) is based on: brand mention frequency (30%), sentiment analysis (20%), detail level in responses (20%), competitor comparisons (15%), and whether your website is linked (15%).",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. You can cancel your subscription at any time with no penalties. Your access continues until the end of your current billing period.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked{" "}
            <span className="text-primary">questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about BrandPulse AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
