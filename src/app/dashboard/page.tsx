import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScoreChart } from "@/components/dashboard/score-chart"
import { Shield, TrendingUp, AlertTriangle, FileText } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const brands = await prisma.brand.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: "desc" },
    take: 5,
  })

  const monitors = await prisma.monitor.findMany({
    where: { brand: { userId: session?.user?.id } },
    orderBy: { checkedAt: "desc" },
    take: 50,
  })

  const reports = await prisma.report.findMany({
    where: { userId: session?.user?.id },
    orderBy: { sentAt: "desc" },
    take: 5,
  })

  const avgScore = monitors.length
    ? Math.round(monitors.reduce((sum, m) => sum + m.visibility, 0) / monitors.length)
    : 0

  const chartData = monitors.slice(0, 14).reverse().map((m) => ({
    date: new Date(m.checkedAt).toLocaleDateString("en", { month: "short", day: "numeric" }),
    score: m.visibility,
  }))

  const stats = [
    {
      label: "Total Brands",
      value: brands.length,
      icon: Shield,
      color: "text-primary",
    },
    {
      label: "Avg Visibility",
      value: `${avgScore}%`,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      label: "Alerts",
      value: monitors.filter((m) => m.sentiment === "negative").length,
      icon: AlertTriangle,
      color: "text-destructive",
    },
    {
      label: "Reports",
      value: reports.length,
      icon: FileText,
      color: "text-secondary",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Overview</h2>
        <p className="text-muted-foreground">
          Monitor your brand performance across AI search engines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border bg-card">
          <CardHeader>
            <CardTitle>Visibility Trend</CardTitle>
            <CardDescription>Average visibility score over the last 14 checks</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ScoreChart data={chartData} />
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Add a brand to start tracking visibility
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Your Brands</CardTitle>
            <CardDescription>Recently monitored brands</CardDescription>
          </CardHeader>
          <CardContent>
            {brands.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No brands added yet.{" "}
                <a href="/dashboard/brands" className="text-primary hover:underline">
                  Add your first brand
                </a>
              </p>
            ) : (
              <div className="space-y-3">
                {brands.map((brand) => {
                  const brandMonitors = monitors.filter((m) => m.brandId === brand.id)
                  const brandAvg = brandMonitors.length
                    ? Math.round(
                        brandMonitors.reduce((sum, m) => sum + m.visibility, 0) /
                          brandMonitors.length
                      )
                    : 0

                  return (
                    <div
                      key={brand.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium">{brand.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {brandMonitors.length} checks
                        </p>
                      </div>
                      <Badge
                        variant={brandAvg >= 70 ? "default" : brandAvg >= 40 ? "secondary" : "destructive"}
                      >
                        {brandAvg}%
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {reports.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your latest brand monitoring reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium capitalize">{report.type} Report</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.sentAt).toLocaleDateString("en", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge variant="outline">View</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
