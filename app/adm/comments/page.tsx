import { prisma } from '@/lib/prisma'
import { Trash2, Eye, EyeOff, MessageSquare } from 'lucide-react'
import { toggleCommentPublish, deleteComment } from '@/app/adm/actions'

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    include: { post: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="px-1">
        <h1 className="text-[34px] font-bold tracking-tight">Комментарии</h1>
      </div>

      <div className="bg-card rounded-[20px] ios-shadow overflow-hidden">
        <div className="divide-y divide-border/40">
          {comments.map((comment) => (
            <div key={comment.id} className="p-5 flex items-start justify-between hover:bg-secondary/20 transition-colors">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-bold text-foreground">{comment.author}</span>
                  <span className="text-muted-foreground text-[12px]">•</span>
                  <span className="text-[12px] text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  {!comment.published && (
                    <span className="ml-2 text-[10px] font-bold text-destructive uppercase">Скрыт</span>
                  )}
                </div>
                <p className="text-[15px] text-foreground/90 mb-2 italic">"{comment.content}"</p>
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <MessageSquare className="h-3 w-3" />
                  <span>К статье: <span className="font-medium text-foreground">{comment.post.title}</span></span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <form action={async () => {
                  'use server'
                  await toggleCommentPublish(comment.id, !comment.published)
                }}>
                  <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                    {comment.published ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </form>
                
                <form action={async () => {
                  'use server'
                  await deleteComment(comment.id)
                }}>
                  <button className="p-2 rounded-full hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="p-10 text-center text-muted-foreground">Комментариев нет</div>
          )}
        </div>
      </div>
    </div>
  )
}
