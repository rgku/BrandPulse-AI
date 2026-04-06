"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back, {session?.user?.name || "User"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </Button>

          <Avatar>
            <AvatarFallback className="bg-primary/20 text-primary text-sm">
              {(session?.user?.name || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
