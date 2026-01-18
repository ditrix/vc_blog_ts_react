import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-border/40">
      <div className="container mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
        <div className="flex-1">
          {/* Left spacer for symmetry if needed */}
        </div>
        
        <Link href="/" className="flex items-center">
          <span className="font-semibold text-[17px] tracking-tight text-foreground">
            Блог
          </span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
