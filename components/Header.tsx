import Link from "next/link"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b-[4px] border-black dark:border-white">
      <div className="container mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="neo-press">
          <span className="font-black text-[28px] uppercase tracking-tighter bg-primary px-4 py-1 neo-border neo-shadow-sm">
            BLOG.
          </span>
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
