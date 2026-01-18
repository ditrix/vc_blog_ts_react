import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CommentForm from '@/components/CommentForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { 
      id: parseInt(id),
      published: true 
    },
    include: {
      comments: {
        where: { published: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto pb-24 pt-12 px-4 sm:px-6">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 bg-secondary px-4 py-2 neo-border neo-shadow-sm neo-press text-[16px] font-black uppercase tracking-tighter mb-12"
      >
        <ArrowLeft className="h-5 w-5 stroke-[3px]" />
        <span>Go Back</span>
      </Link>

      <header className="mb-12">
        <time className="text-[16px] font-black bg-accent px-3 py-1 neo-border inline-block mb-6 uppercase tracking-tighter">
          {new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
        </time>
        <h1 className="text-[56px] font-black leading-[0.95] text-foreground tracking-tighter uppercase mb-12">
          {post.title}
        </h1>
        
        {post.imagePath && (
          <div className="relative aspect-[21/9] w-full neo-border neo-shadow overflow-hidden mb-16">
            <Image
              src={`/uploads/${post.imagePath}-middle.webp`}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </header>

      <div 
        className="text-[20px] leading-[1.6] text-foreground font-medium mb-24 px-1 prose-neo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section className="bg-background neo-border neo-shadow p-8 md:p-12">
        <h2 className="text-[40px] font-black uppercase tracking-tighter mb-12 bg-primary inline-block px-4 py-1 neo-border">
          Comments ({post.comments.length})
        </h2>
        
        <div className="mb-16">
          <CommentForm postId={post.id} />
        </div>

        <div className="space-y-8">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-card neo-border neo-shadow-sm p-6">
              <div className="flex justify-between items-center mb-4 border-b-[2px] border-black dark:border-white pb-2">
                <span className="text-[18px] font-black uppercase tracking-tighter">{comment.author}</span>
                <time className="text-[14px] font-bold text-muted-foreground uppercase">
                  {new Date(comment.createdAt).toLocaleDateString('ru-RU')}
                </time>
              </div>
              <p className="text-[17px] font-medium leading-relaxed">{comment.content}</p>
            </div>
          ))}
          {post.comments.length === 0 && (
            <div className="text-center py-12 bg-secondary/10 neo-border border-dashed">
              <p className="text-[18px] font-black uppercase tracking-tighter italic">Be the first to speak.</p>
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
