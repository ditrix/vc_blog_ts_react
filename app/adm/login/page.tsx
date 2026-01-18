'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/auth'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="w-full max-w-sm bg-card p-8 neo-border neo-shadow">
        <h1 className="text-[32px] font-black uppercase tracking-tighter text-center mb-10">Вход.</h1>
        
        <form action={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-[14px] font-black uppercase tracking-tighter ml-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-background neo-border p-4 text-[18px] font-bold focus:bg-primary transition-colors"
              placeholder="admin@mail.com"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[14px] font-black uppercase tracking-tighter ml-1">
              Пароль
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-background neo-border p-4 text-[18px] font-bold focus:bg-secondary transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 rounded-md transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-destructive text-white p-3 neo-border text-center font-black uppercase tracking-tighter text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-foreground py-5 neo-border neo-shadow neo-press text-[20px] font-black uppercase tracking-tighter"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  )
}
