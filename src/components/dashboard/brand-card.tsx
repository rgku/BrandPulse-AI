import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { aiEngines } from "@/lib/constants"

interface BrandCardProps {
  brand: {
    id: string
    name: string
    website: string | null
    createdAt: string
  }
  scores?: Record<string, number>
  onDelete?: (id: string) => void
}

export function BrandCard({ brand, scores = {}, onDelete }: BrandCardProps) {
  const avgScore = Object.values(scores).length
    ? Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)
    : 0

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 50) return "text-yellow-400"
    return "text-destructive"
  }

  return (
    <Card className="border-border bg-card hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{brand.name}</h3>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mt-1"
              >
                {brand.website}
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(brand.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">Avg Visibility</span>
          <span className={`text-2xl font-bold ${getScoreColor(avgScore)}`}>
            {avgScore}%
          </span>
        </div>

        <Progress value={avgScore} className="mb-4" />

        <div className="grid grid-cols-2 gap-3">
          {aiEngines.map((engine) => (
            <div key={engine.key} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{engine.name}</span>
              <Badge
                variant={scores[engine.key] ? "default" : "outline"}
                className="text-xs"
              >
                {scores[engine.key] ? `${scores[engine.key]}%` : "N/A"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
