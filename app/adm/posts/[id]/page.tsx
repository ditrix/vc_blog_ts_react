import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { updatePost, createPost } from '@/app/adm/actions'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function PostEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'
  
  const post = isNew 
    ? { title: '', content: '', published: false } 
    : await prisma.post.findUnique({ where: { id: parseInt(id) } })

  if (!post) notFound()

  async function handleSubmit(formData: FormData) {
    'use server'
    if (isNew) {
      await createPost(formData)
    } else {
      await updatePost(parseInt(id), formData)
    }
    redirect('/adm/posts')
  }

  return (
    <div className="space-y-6">
      <Link 
        href="/adm/posts" 
        className="inline-flex items-center text-primary text-[17px] active:opacity-50 transition-opacity"
      >
        <ChevronLeft className="h-5 w-5 -ml-1" />
        <span>Назад</span>
      </Link>

      <h1 className="text-[34px] font-bold tracking-tight">
        {isNew ? 'Новая статья' : 'Редактирование'}
      </h1>

      <form action={handleSubmit} className="bg-card rounded-[24px] p-6 ios-shadow space-y-6">
        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
            Заголовок
          </label>
          <input
            name="title"
            defaultValue={post.title}
            required
            className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
            Контент
          </label>
          <textarea
            name="content"
            defaultValue={post.content}
            required
            rows={10}
            className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] focus:ring-2 focus:ring-primary/20 transition-all resize-none"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-[18px]">
          <span className="font-semibold text-foreground">Опубликовано</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="published" 
              value="true"
              defaultChecked={post.published} 
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-[16px] text-[17px] font-semibold active:scale-[0.98] transition-all ios-shadow"
        >
          {isNew ? 'Создать' : 'Сохранить изменения'}
        </button>
      </form>
    </div>
  )
}
