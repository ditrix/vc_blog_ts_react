import Link from 'next/link'
import { FileText, MessageSquare, Settings, LogOut } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menuItems = [
    { name: 'Статьи', href: '/adm/posts', icon: FileText },
    { name: 'Комментарии', href: '/adm/comments', icon: MessageSquare },
    { name: 'Настройки', href: '/adm/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/40 glass sticky top-0 h-screen hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-[20px] font-bold tracking-tight">Админ-панель</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-[12px] text-[15px] font-medium text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all active:scale-[0.97]"
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
