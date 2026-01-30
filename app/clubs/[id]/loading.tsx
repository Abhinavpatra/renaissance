export default function ClubLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Skeleton */}
      <div className="relative h-64 w-full bg-muted animate-pulse" />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Title Skeleton */}
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-96 bg-muted rounded animate-pulse" />
        </div>

        {/* Content Skeleton */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="h-32 w-full bg-muted rounded-xl animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-6 w-32 bg-muted rounded animate-pulse" />
            <div className="h-32 w-full bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
