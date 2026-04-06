"use client"

import { useEffect, useRef } from "react"

interface ScoreChartProps {
  data: {
    date: string
    score: number
  }[]
  height?: number
  color?: string
}

export function ScoreChart({ data, height = 200, color = "#6366f1" }: ScoreChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const padding = 40
    const width = rect.width
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    ctx.clearRect(0, 0, width, height)

    const maxScore = 100
    const minScore = 0

    const getX = (index: number) =>
      padding + (index / (data.length - 1 || 1)) * chartWidth
    const getY = (score: number) =>
      padding + chartHeight - ((score - minScore) / (maxScore - minScore)) * chartHeight

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.beginPath()

    data.forEach((point, index) => {
      const x = getX(index)
      const y = getY(point.score)

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding)
    gradient.addColorStop(0, `${color}30`)
    gradient.addColorStop(1, `${color}00`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(getX(0), getY(data[0].score))

    data.forEach((point, index) => {
      ctx.lineTo(getX(index), getY(point.score))
    })

    ctx.lineTo(getX(data.length - 1), height - padding)
    ctx.lineTo(getX(0), height - padding)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "#a1a1aa"
    ctx.font = "11px system-ui"
    ctx.textAlign = "center"

    const labelCount = Math.min(data.length, 5)
    const step = Math.ceil(data.length / labelCount)

    for (let i = 0; i < data.length; i += step) {
      ctx.fillText(data[i].date, getX(i), height - 10)
    }

    ctx.textAlign = "right"
    for (let i = 0; i <= 4; i++) {
      const score = (i / 4) * 100
      ctx.fillText(`${score}`, padding - 8, getY(score) + 4)
    }
  }, [data, height, color])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height }}
      className="rounded-lg"
    />
  )
}
