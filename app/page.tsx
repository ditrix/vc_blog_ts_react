import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <header className="mb-16">
        <h1 className="text-[64px] font-black uppercase tracking-tighter leading-none text-foreground">
          LATEST<br />
          <span className="bg-accent px-4 py-2 neo-border neo-shadow inline-block mt-2">STORIES.</span>
        </h1>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/post/${post.id}`}
            className="group block neo-press"
          >
            <article 
              className="bg-card text-card-foreground neo-border neo-shadow overflow-hidden h-full flex flex-col"
            >
              {post.imagePath && (
                <div className="relative aspect-[16/9] w-full border-b-[4px] border-black dark:border-white overflow-hidden">
                  <Image
                    src={`/uploads/${post.imagePath}-low.webp`}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[12px] font-black uppercase tracking-widest bg-secondary px-2 py-0.5 neo-border">
                    Post
                  </span>
                  <time className="text-[14px] font-bold text-muted-foreground uppercase">
                    {new Date(post.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </div>
                <h2 className="text-[28px] font-black leading-tight text-foreground uppercase tracking-tighter mb-4 group-hover:underline decoration-[6px] decoration-primary">
                  {post.title}
                </h2>
                <div 
                  className="mt-auto text-[16px] font-medium text-foreground/80 line-clamp-3 mb-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <div className="mt-auto pt-6 border-t-[4px] border-black dark:border-white flex items-center justify-between group-hover:bg-primary transition-colors p-2 -mx-6 -mb-6">
                  <span className="font-black uppercase tracking-tighter text-[18px]">Read more</span>
                  <ArrowRight className="h-6 w-6 stroke-[3px]" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-24 bg-card neo-border neo-shadow">
          <p className="text-[24px] font-black uppercase tracking-tighter">No stories found yet.</p>
        </div>
      )}
    </div>
  )
}
