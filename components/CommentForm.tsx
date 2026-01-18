'use client'

import { useRef } from 'react'
import { addComment } from '@/app/actions'

export default function CommentForm({ postId }: { postId: number }) {
  const formRef = useRef<HTMLFormElement>(null)

  async function action(formData: FormData) {
    await addComment(formData)
    formRef.current?.reset()
  }

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />
      <div className="space-y-1.5">
        <label htmlFor="author" className="block text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
          Имя
        </label>
        <input
          type="text"
          name="author"
          id="author"
          required
          placeholder="Как вас зовут?"
          className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="content" className="block text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
          Сообщение
        </label>
        <textarea
          name="content"
          id="content"
          rows={3}
          required
          placeholder="Напишите комментарий..."
          className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50 resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-3.5 rounded-[14px] text-[17px] font-semibold active:scale-[0.98] active:opacity-90 transition-all ios-shadow"
      >
        Отправить
      </button>
    </form>
  )
}
