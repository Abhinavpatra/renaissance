export default function ChatLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="container mx-auto flex items-center gap-4 px-4 py-3">
          <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-2 w-16 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Messages Skeleton */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 bg-muted animate-pulse ${
                i % 2 === 0 ? "rounded-br-sm" : "rounded-bl-sm"
              }`}
            >
              <div className="h-3 w-16 bg-background/50 rounded mb-2" />
              <div className="h-4 w-48 bg-background/50 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Input Skeleton */}
      <div className="sticky bottom-0 border-t border-border bg-card p-4">
        <div className="container mx-auto flex items-center gap-3">
          <div className="flex-1 h-10 rounded-full bg-muted animate-pulse" />
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}
