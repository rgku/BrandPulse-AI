export const pricingPlans = [
  {
    name: "Starter",
    price: 29,
    description: "Perfect for small businesses getting started with AI monitoring.",
    features: [
      "Monitor up to 3 brands",
      "Daily monitoring checks",
      "Basic visibility scores",
      "Email notifications",
      "Weekly reports",
      "ChatGPT & Gemini tracking",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 79,
    description: "For growing brands that need comprehensive AI search insights.",
    features: [
      "Monitor up to 15 brands",
      "Hourly monitoring checks",
      "Advanced sentiment analysis",
      "Real-time alerts",
      "Daily reports",
      "All AI engines tracked",
      "Competitor tracking",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Agency",
    price: 199,
    description: "For agencies managing multiple client brands at scale.",
    features: [
      "Unlimited brands",
      "Real-time monitoring",
      "White-label reports",
      "Team collaboration",
      "Custom integrations",
      "Priority support",
      "Historical data export",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export const aiEngines = [
  { name: "ChatGPT", key: "chatgpt" },
  { name: "Gemini", key: "gemini" },
  { name: "Perplexity", key: "perplexity" },
  { name: "Copilot", key: "copilot" },
]

export const scoreWeights = {
  brandMention: 30,
  sentiment: 20,
  detailLevel: 20,
  competitorComparison: 15,
  websiteLink: 15,
}

export const faqData = [
  {
    question: "What is AI search visibility?",
    answer:
      "AI search visibility measures how often and how positively AI assistants like ChatGPT, Gemini, and Perplexity mention your brand when users ask relevant questions. A higher visibility score means AI engines are more likely to recommend your brand.",
  },
  {
    question: "Which AI engines do you monitor?",
    answer:
      "We currently monitor ChatGPT, Google Gemini, Perplexity AI, and Microsoft Copilot. We're continuously adding new AI platforms as they emerge to ensure comprehensive coverage.",
  },
  {
    question: "How often is my brand monitored?",
    answer:
      "Monitoring frequency depends on your plan. Starter plans check daily, Pro plans check hourly, and Agency plans offer real-time continuous monitoring across all tracked engines.",
  },
  {
    question: "How is the visibility score calculated?",
    answer:
      "Our visibility score (0-100) is based on five factors: brand mention frequency (30%), sentiment analysis (20%), detail level of responses (20%), competitor comparisons (15%), and whether your website is linked (15%).",
  },
  {
    question: "Can I improve my AI search visibility?",
    answer:
      "Yes! We provide actionable recommendations based on your monitoring data. This includes content optimization strategies, SEO improvements for AI crawlers, and specific tactics to increase positive brand mentions.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, all plans come with a 7-day free trial. No credit card required to get started. You'll have full access to all features during the trial period.",
  },
]
