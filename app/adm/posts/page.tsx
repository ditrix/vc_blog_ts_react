import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import { togglePostPublish, deletePost } from '@/app/adm/actions'

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[34px] font-bold tracking-tight">Статьи</h1>
        <Link
          href="/adm/posts/new"
          className="bg-primary text-white p-2 rounded-full ios-shadow active:scale-90 transition-all"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </div>

      <div className="bg-card rounded-[20px] ios-shadow overflow-hidden">
        <div className="divide-y divide-border/40">
          {posts.map((post) => (
            <div key={post.id} className="p-5 flex items-center justify-between group hover:bg-secondary/20 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  {post.published ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-green-500 uppercase tracking-wider">
                      <Eye className="h-3 w-3" /> Опубликовано
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      <EyeOff className="h-3 w-3" /> Черновик
                    </span>
                  )}
                </div>
                <h3 className="text-[17px] font-semibold truncate text-foreground">{post.title}</h3>
                <p className="text-[13px] text-muted-foreground line-clamp-1">{post.content}</p>
              </div>

              <div className="flex items-center gap-2">
                <form action={async () => {
                  'use server'
                  await togglePostPublish(post.id, !post.published)
                }}>
                  <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    {post.published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </form>
                
                <Link
                  href={`/adm/posts/${post.id}`}
                  className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-primary"
                >
                  <Edit2 className="h-5 w-5" />
                </Link>

                <form action={async () => {
                  'use server'
                  await deletePost(post.id)
                }}>
                  <button className="p-2 rounded-full hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="p-10 text-center text-muted-foreground">Статей пока нет</div>
          )}
        </div>
      </div>
    </div>
  )
}
