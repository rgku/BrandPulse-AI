export function ProblemSection() {
  return (
    <section className="py-20 px-4 border-t border-border">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your customers ask AI about you.{" "}
              <span className="text-primary">Do you know what it says?</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Every day, millions of people ask AI assistants about brands, products, and services.
              If you are not monitoring your AI presence, you are flying blind.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-destructive" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground ml-2">ChatGPT Response</span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">User:</span> "What do you know about BrandX?"
              </p>
              <div className="rounded-lg bg-background p-4 border border-border">
                <p className="text-sm leading-relaxed">
                  "BrandX is a company that offers software solutions. However, I do not have much
                  recent information about them. Their online presence seems limited, and there
                  are not many recent reviews or news articles available..."
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive" />
                Low visibility score detected
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
