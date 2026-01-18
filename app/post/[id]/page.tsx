import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CommentForm from '@/components/CommentForm'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      comments: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto pb-20 pt-6 px-4 sm:px-6">
      <Link 
        href="/" 
        className="inline-flex items-center text-primary text-[17px] mb-6 active:opacity-50 transition-opacity"
      >
        <ChevronLeft className="h-5 w-5 -ml-1" />
        <span>Назад</span>
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <time className="text-[13px] font-semibold text-primary uppercase tracking-wide">
            {new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </div>
        <h1 className="text-[34px] font-bold leading-tight text-foreground tracking-tight">
          {post.title}
        </h1>
      </header>

      <div className="text-[19px] leading-[1.5] text-foreground/90 space-y-5 mb-16 px-1">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>
            {paragraph}
          </p>
        ))}
      </div>

      <section className="bg-card rounded-[24px] p-6 ios-shadow">
        <h2 className="text-[22px] font-bold mb-6 px-1">
          Комментарии <span className="text-muted-foreground font-medium ml-1">{post.comments.length}</span>
        </h2>
        
        <div className="mb-10">
          <CommentForm postId={post.id} />
        </div>

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-background/50 rounded-[18px] p-4 border border-border/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[15px] font-bold text-foreground">{comment.author}</span>
                <time className="text-[12px] text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                </time>
              </div>
              <p className="text-[15px] text-foreground/80 leading-snug">{comment.content}</p>
            </div>
          ))}
          {post.comments.length === 0 && (
            <p className="text-muted-foreground text-[15px] italic text-center py-4">Нет комментариев</p>
          )}
        </div>
      </section>
    </article>
  )
}
