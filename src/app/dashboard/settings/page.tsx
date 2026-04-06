"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and notification preferences.
        </p>
      </div>

      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      defaultValue={session?.user?.name || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={session?.user?.email || ""}
                      disabled
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company (optional)</Label>
                  <Input id="company" placeholder="Your company name" />
                </div>
                <div className="flex items-center gap-4">
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  {saved && (
                    <span className="text-sm text-green-400">Settings saved!</span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Email Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when visibility drops
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Weekly Reports</p>
                  <p className="text-sm text-muted-foreground">
                    Get a summary report every Monday
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Sentiment Changes</p>
                  <p className="text-sm text-muted-foreground">
                    Notify when sentiment shifts significantly
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your plan and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg border border-border bg-muted/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Plan</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {session?.user?.plan || "Free"}
                    </p>
                  </div>
                  <Button variant="outline">Upgrade Plan</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing-email">Billing Email</Label>
                <Input
                  id="billing-email"
                  type="email"
                  defaultValue={session?.user?.email || ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="billing-notes">Billing Notes (optional)</Label>
                <Textarea
                  id="billing-notes"
                  placeholder="Add any billing notes or reference numbers"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
