import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ChevronRight } from 'lucide-react'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <header className="mb-10">
        <h1 className="text-[34px] font-bold tracking-tight text-foreground px-1">
          Обзор
        </h1>
      </header>

      <div className="space-y-4">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/post/${post.id}`}
            className="group block active:scale-[0.98] transition-all duration-200"
          >
            <article 
              className="bg-card text-card-foreground p-5 rounded-[20px] ios-shadow border-none flex items-center justify-between"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary/80">
                    Статья
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    •
                  </span>
                  <time className="text-[11px] font-medium text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </time>
                </div>
                <h2 className="text-[19px] font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-[15px] text-muted-foreground line-clamp-2 leading-snug">
                  {post.content}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50 shrink-0" />
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-[17px]">Постов пока нет</p>
        </div>
      )}
    </div>
  )
}
