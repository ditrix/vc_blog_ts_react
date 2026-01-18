import Link from 'next/link'
import { FileText, MessageSquare, Settings, LogOut } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menuItems = [
    { name: 'POSTS', href: '/adm/posts', icon: FileText },
    { name: 'COMMENTS', href: '/adm/comments', icon: MessageSquare },
    { name: 'SETTINGS', href: '/adm/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-72 border-r-[4px] border-black dark:border-white bg-background sticky top-0 h-screen hidden md:flex flex-col p-6">
        <div className="mb-12">
          <h2 className="text-[28px] font-black uppercase tracking-tighter bg-primary px-3 py-1 neo-border neo-shadow-sm inline-block">
            ADMIN.
          </h2>
        </div>
        
        <nav className="flex-1 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-4 neo-border bg-card font-black uppercase tracking-tighter text-[16px] hover:bg-secondary neo-press neo-shadow-sm"
            >
              <item.icon className="h-5 w-5 stroke-[3px]" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
