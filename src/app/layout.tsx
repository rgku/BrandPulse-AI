import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "BrandPulse AI - Monitor Your Brand Across AI Search Engines",
  description: "Track your brand visibility across ChatGPT, Gemini, Perplexity & more. Get actionable insights to improve your AI search presence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} style={{ colorScheme: "dark" }}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  )
}
