'use client'

import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await logout()
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 rounded-[12px] text-[15px] font-medium text-destructive hover:bg-destructive/10 transition-all active:scale-[0.97]"
    >
      <LogOut className="h-5 w-5" />
      Выход
    </button>
  )
}
