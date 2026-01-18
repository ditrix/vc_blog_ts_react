'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updatePost, createPost } from '@/app/adm/actions'
import Link from 'next/link'
import { ChevronLeft, Loader2 } from 'lucide-react'
import RichTextEditor from '@/components/RichTextEditor'
import ImageUpload from '@/components/ImageUpload'

export default function PostEditClient({ post, id }: { post: any, id: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isNew = id === 'new'
  
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [published, setPublished] = useState(post.published)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteCurrentImage, setDeleteCurrentImage] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', content)
    formData.append('published', published.toString())
    if (imageFile) {
      formData.append('image', imageFile)
    }
    if (deleteCurrentImage) {
      formData.append('deleteCurrentImage', 'true')
    }

    startTransition(async () => {
      if (isNew) {
        await createPost(formData)
      } else {
        await updatePost(parseInt(id), formData)
      }
      router.push('/adm/posts')
      router.refresh()
    })
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

      <div className="flex items-center justify-between px-1">
        <h1 className="text-[34px] font-bold tracking-tight">
          {isNew ? 'Новая статья' : 'Редактирование'}
        </h1>
        {isPending && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-card rounded-[24px] p-6 ios-shadow space-y-6 border border-border/40">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
              Заголовок
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Введите заголовок..."
              className="w-full bg-background border-none rounded-[14px] p-3 text-[17px] font-semibold focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <ImageUpload 
            currentImage={post.imagePath} 
            onImageSelect={(file) => {
              setImageFile(file)
              if (!file && post.imagePath) setDeleteCurrentImage(true)
              else setDeleteCurrentImage(false)
            }} 
          />
        </div>

        <div className="space-y-1.5 px-1">
          <label className="text-[13px] font-semibold text-muted-foreground ml-3 uppercase tracking-wider">
            Содержание
          </label>
          <RichTextEditor 
            content={content} 
            onChange={setContent} 
          />
        </div>

        <div className="bg-card rounded-[24px] p-6 ios-shadow border border-border/40 space-y-6">
          <div className="flex items-center justify-between p-1">
            <div className="space-y-0.5">
              <span className="font-semibold text-[17px] text-foreground block">Опубликовано</span>
              <span className="text-[13px] text-muted-foreground">Статья будет видна всем пользователям</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-4 rounded-[16px] text-[17px] font-semibold active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all ios-shadow mt-4"
          >
            {isPending ? 'Сохранение...' : (isNew ? 'Создать статью' : 'Сохранить изменения')}
          </button>
        </div>
      </form>
    </div>
  )
}
