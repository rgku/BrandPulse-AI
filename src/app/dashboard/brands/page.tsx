"use client"

import { useState, useEffect } from "react"
import { BrandCard } from "@/components/dashboard/brand-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"

interface Brand {
  id: string
  name: string
  website: string | null
  createdAt: string
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [brandName, setBrandName] = useState("")
  const [brandWebsite, setBrandWebsite] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBrands()
  }, [])

  const fetchBrands = async () => {
    try {
      const res = await fetch("/api/brands")
      if (res.ok) {
        const data = await res.json()
        setBrands(data)
      }
    } catch (error) {
      console.error("Failed to fetch brands:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: brandName, website: brandWebsite || undefined }),
      })

      if (res.ok) {
        setBrandName("")
        setBrandWebsite("")
        setDialogOpen(false)
        fetchBrands()
      }
    } catch (error) {
      console.error("Failed to add brand:", error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteBrand = async (id: string) => {
    try {
      const res = await fetch(`/api/brands/${id}`, { method: "DELETE" })
      if (res.ok) {
        fetchBrands()
      }
    } catch (error) {
      console.error("Failed to delete brand:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Brands</h2>
          <p className="text-muted-foreground">
            Manage the brands you want to monitor across AI engines.
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Brand
        </Button>
      </div>

      {brands.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground mb-4">No brands added yet</p>
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Your First Brand
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} onDelete={handleDeleteBrand} />
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Brand</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBrand}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  id="brand-name"
                  placeholder="e.g. Acme Corp"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand-website">Website (optional)</Label>
                <Input
                  id="brand-website"
                  type="url"
                  placeholder="https://example.com"
                  value={brandWebsite}
                  onChange={(e) => setBrandWebsite(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Brand"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
