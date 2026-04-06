import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  const reports = await prisma.report.findMany({
    where: { userId: session?.user?.id },
    orderBy: { sentAt: "desc" },
  })

  const brands = await prisma.brand.findMany({
    where: { userId: session?.user?.id },
    include: {
      monitors: {
        orderBy: { checkedAt: "desc" },
        take: 1,
      },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-muted-foreground">
          View and download your brand monitoring reports.
        </p>
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Brand Status Overview</CardTitle>
          <CardDescription>Latest monitoring results for each brand</CardDescription>
        </CardHeader>
        <CardContent>
          {brands.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No brands to display.{" "}
              <a href="/dashboard/brands" className="text-primary hover:underline">
                Add a brand
              </a>
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead>Engine</TableHead>
                  <TableHead>Visibility</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Last Checked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.map((brand) =>
                  brand.monitors.length > 0 ? (
                    brand.monitors.map((monitor) => (
                      <TableRow key={monitor.id}>
                        <TableCell className="font-medium">{brand.name}</TableCell>
                        <TableCell className="capitalize">{monitor.engine}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              monitor.visibility >= 70
                                ? "default"
                                : monitor.visibility >= 40
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {monitor.visibility}%
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{monitor.sentiment}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(monitor.checkedAt).toLocaleDateString("en", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key={brand.id}>
                      <TableCell className="font-medium">{brand.name}</TableCell>
                      <TableCell colSpan={4} className="text-muted-foreground text-sm">
                        No monitoring data yet
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {reports.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>Historical reports for your records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
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
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
