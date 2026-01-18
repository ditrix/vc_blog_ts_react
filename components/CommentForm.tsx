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
    <form ref={formRef} action={action} className="space-y-8">
      <input type="hidden" name="postId" value={postId} />
      <div className="space-y-2">
        <label htmlFor="author" className="block text-[16px] font-black uppercase tracking-tighter ml-1">
          Your Name
        </label>
        <input
          type="text"
          name="author"
          id="author"
          required
          placeholder="Who are you?"
          className="w-full bg-background neo-border p-4 text-[18px] font-bold focus:bg-primary transition-colors placeholder:text-muted-foreground/50"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="content" className="block text-[16px] font-black uppercase tracking-tighter ml-1">
          Message
        </label>
        <textarea
          name="content"
          id="content"
          rows={4}
          required
          placeholder="Say something bold..."
          className="w-full bg-background neo-border p-4 text-[18px] font-bold focus:bg-secondary transition-colors placeholder:text-muted-foreground/50 resize-none"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-foreground py-5 neo-border neo-shadow neo-press text-[20px] font-black uppercase tracking-tighter"
      >
        Post Comment
      </button>
    </form>
  )
}
