export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="h-[40vh] bg-linear-to-b from-[#F5E7C6] to-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-12 w-64 bg-muted rounded-lg mx-auto animate-pulse" />
          <div className="h-4 w-48 bg-muted rounded mx-auto animate-pulse" />
        </div>
      </div>

      {/* Director Skeleton */}
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-3xl bg-card border border-border/50 p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="h-40 w-40 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-4">
            <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-20 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-card border border-border/50 rounded-xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-2 w-16 bg-muted rounded animate-pulse" />
                </div>
              </div>
              <div className="aspect-square w-full bg-muted animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                <div className="h-12 w-full bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
