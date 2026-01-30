import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/95 p-4 text-center backdrop-blur">
      <Link
        href="/credits"
        className="text-sm text-muted-foreground uppercase tracking-widest font-bold hover:text-primary transition-colors"
      >
        CBDE
      </Link>
    </footer>
  );
}
