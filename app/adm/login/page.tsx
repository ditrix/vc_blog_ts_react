'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(formData: FormData) {
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      router.push('/adm/posts')
      router.refresh()
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card p-8 rounded-[24px] ios-shadow border border-border/40">
        <h1 className="text-[28px] font-bold text-center mb-8">Вход в админку</h1>
        
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="admin@mail.com"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
              Пароль
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center font-medium bg-destructive/10 py-2 rounded-[10px]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-[14px] text-[17px] font-semibold active:scale-[0.98] transition-all ios-shadow"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
