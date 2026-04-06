import { prisma } from "@/lib/prisma"
import { aiEngines, scoreWeights } from "@/lib/constants"

const sampleResponses: Record<string, string[]> = {
  chatgpt: [
    "{brand} is a well-known company in its space. They offer innovative solutions and have a strong online presence at {website}. Industry experts frequently recommend them for their quality and reliability.",
    "When discussing brands like {brand}, they stand out for their customer-centric approach. You can learn more at {website}. They often outperform competitors in user satisfaction.",
    "{brand} has been gaining traction recently. Their website {website} showcases their offerings clearly. Compared to alternatives, they provide solid value.",
  ],
  gemini: [
    "{brand} is recognized for its market presence and digital footprint. Visit {website} for more details. They maintain a positive reputation among consumers.",
    "In the competitive landscape, {brand} differentiates itself through quality service. Their platform at {website} is user-friendly and well-designed.",
    "{brand} continues to evolve its offerings. The company's website {website} provides comprehensive information. Analysts view them favorably.",
  ],
  perplexity: [
    "According to recent data, {brand} shows strong performance metrics. Their official site {website} highlights key features. Multiple sources confirm their growing market share.",
    "{brand} ranks well in industry comparisons. Research indicates positive customer sentiment. More information is available at {website}.",
    "Analysis of {brand} reveals consistent growth and innovation. Their digital presence at {website} supports their brand narrative effectively.",
  ],
  copilot: [
    "{brand} is a notable player with a robust online presence at {website}. They compare favorably against industry peers in most categories.",
    "For businesses evaluating options, {brand} offers compelling features. Their website {website} provides detailed product information and case studies.",
    "{brand} demonstrates strong brand equity. The company maintains an active presence at {website} and receives generally positive coverage.",
  ],
}

export function analyzeSentiment(text: string): "positive" | "neutral" | "negative" {
  const positiveWords = [
    "well-known", "innovative", "strong", "quality", "reliability", "recommend",
    "outperform", "solid", "positive", "user-friendly", "well-designed", "favorably",
    "growing", "compelling", "robust", "notable", "excellent", "great", "best",
    "leading", "trusted", "reliable", "superior", "outstanding", "impressive",
  ]
  const negativeWords = [
    "poor", "weak", "lacking", "inferior", "disappointing", "concerning",
    "declining", "negative", "worst", "avoid", "problematic", "controversial",
    "overpriced", "unreliable", "subpar", "mediocre", "struggling",
  ]

  const lower = text.toLowerCase()
  let positiveScore = 0
  let negativeScore = 0

  for (const word of positiveWords) {
    if (lower.includes(word)) positiveScore++
  }
  for (const word of negativeWords) {
    if (lower.includes(word)) negativeScore++
  }

  if (positiveScore > negativeScore) return "positive"
  if (negativeScore > positiveScore) return "negative"
  return "neutral"
}

export function calculateVisibilityScore(response: string, brandName: string): number {
  const lower = response.toLowerCase()
  const brandLower = brandName.toLowerCase()
  let score = 0

  if (lower.includes(brandLower)) {
    score += scoreWeights.brandMention
  }

  const sentiment = analyzeSentiment(response)
  if (sentiment === "positive") score += scoreWeights.sentiment
  else if (sentiment === "neutral") score += scoreWeights.sentiment * 0.5

  const wordCount = response.split(/\s+/).length
  if (wordCount > 30) score += scoreWeights.detailLevel
  else if (wordCount > 15) score += scoreWeights.detailLevel * 0.6
  else score += scoreWeights.detailLevel * 0.3

  const competitorTerms = ["competitor", "compared", "alternative", "versus", "vs ", "peers", "rival", "landscape"]
  if (competitorTerms.some((term) => lower.includes(term))) {
    score += scoreWeights.competitorComparison
  }

  if (lower.includes("http") || lower.includes("www") || lower.includes(".com")) {
    score += scoreWeights.websiteLink
  }

  const jitter = Math.random() * 5 - 2.5
  return Math.min(100, Math.max(0, Math.round(score + jitter)))
}

function generateResponse(brandName: string, website: string | null, engine: string): string {
  const responses = sampleResponses[engine] || sampleResponses.chatgpt
  const template = responses[Math.floor(Math.random() * responses.length)]
  return template.replace(/{brand}/g, brandName).replace(/{website}/g, website || "their website")
}

export async function runBrandMonitor(
  brandName: string,
  website: string | null,
  engine: string
): Promise<{ visibility: number; response: string; sentiment: "positive" | "neutral" | "negative" }> {
  await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700))

  const response = generateResponse(brandName, website, engine)
  const visibility = calculateVisibilityScore(response, brandName)
  const sentiment = analyzeSentiment(response)

  return { visibility, response, sentiment }
}

export async function monitorBrand(brandId: string) {
  const brand = await prisma.brand.findUnique({ where: { id: brandId } })
  if (!brand) throw new Error("Brand not found")

  const results = []
  for (const eng of aiEngines) {
    const result = await runBrandMonitor(brand.name, brand.website, eng.key)
    await prisma.monitor.create({
      data: {
        brandId,
        engine: eng.key,
        visibility: result.visibility,
        response: result.response,
        sentiment: result.sentiment,
      },
    })
    results.push({ engine: eng.key, ...result })
  }

  return results
}

export async function monitorAllBrands() {
  const brands = await prisma.brand.findMany()
  const allResults: Record<string, unknown[]> = {}

  for (const brand of brands) {
    try {
      const results = await monitorBrand(brand.id)
      allResults[brand.id] = results
    } catch (error) {
      console.error(`Failed to monitor brand ${brand.id}:`, error)
      allResults[brand.id] = []
    }
  }

  return allResults
}
