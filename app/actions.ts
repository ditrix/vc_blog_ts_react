'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function addComment(formData: FormData) {
  const postId = parseInt(formData.get('postId') as string)
  const author = formData.get('author') as string
  const content = formData.get('content') as string

  if (!author || !content) {
    return { error: 'Автор и содержание обязательны' }
  }

  await prisma.comment.create({
    data: {
      postId,
      author,
      content,
    },
  })

  revalidatePath(`/post/${postId}`)
}
