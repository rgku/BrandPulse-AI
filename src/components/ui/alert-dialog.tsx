"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

function Toast({
  className,
  title,
  description,
  variant = "default",
  onClose,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  title: string
  description?: string
  variant?: "default" | "destructive"
  onClose?: () => void
}) {
  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-border bg-card p-6 pr-8 shadow-lg",
        variant === "destructive" && "border-destructive bg-destructive text-destructive-foreground",
        className
      )}
      {...props}
    >
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

function AlertDialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        {children}
      </div>
    </div>
  )
}

function AlertDialogContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  )
}

function AlertDialogHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {children}
    </div>
  )
}

function AlertDialogTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

function AlertDialogDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

function AlertDialogFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-end gap-3", className)} {...props}>
      {children}
    </div>
  )
}

export {
  Toast,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
}
