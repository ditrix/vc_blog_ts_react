import { changeAdminPassword } from '@/app/adm/actions'

export default function SettingsPage() {
  async function handleSubmit(formData: FormData) {
    'use server'
    await changeAdminPassword(formData)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-[34px] font-bold tracking-tight px-1">Настройки</h1>

      <div className="bg-card rounded-[24px] p-8 ios-shadow border border-border/40">
        <h2 className="text-[20px] font-bold mb-6">Смена пароля</h2>
        
        <form action={handleSubmit} className="space-y-6 max-w-sm">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
              Новый пароль
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3.5 rounded-[14px] text-[17px] font-semibold active:scale-[0.98] transition-all ios-shadow"
          >
            Обновить пароль
          </button>
        </form>
        
        <p className="mt-8 text-[13px] text-muted-foreground px-1">
          Примечание: В текущей реализации используется фиксированный логин для соответствия промпту.
        </p>
      </div>
    </div>
  )
}
