'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Посты
export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'true'

  await prisma.post.create({
    data: { title, content, published }
  })
  revalidatePath('/adm/posts')
  revalidatePath('/')
}

export async function updatePost(id: number, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const published = formData.get('published') === 'true'

  await prisma.post.update({
    where: { id },
    data: { title, content, published }
  })
  revalidatePath('/adm/posts')
  revalidatePath(`/post/${id}`)
  revalidatePath('/')
}

export async function deletePost(id: number) {
  await prisma.post.delete({ where: { id } })
  revalidatePath('/adm/posts')
  revalidatePath('/')
}

export async function togglePostPublish(id: number, published: boolean) {
  await prisma.post.update({
    where: { id },
    data: { published }
  })
  revalidatePath('/adm/posts')
  revalidatePath('/')
}

// Комментарии
export async function toggleCommentPublish(id: number, published: boolean) {
  await prisma.comment.update({
    where: { id },
    data: { published }
  })
  revalidatePath('/adm/comments')
  const comment = await prisma.comment.findUnique({ where: { id } })
  if (comment) revalidatePath(`/post/${comment.postId}`)
}

export async function deleteComment(id: number) {
  const comment = await prisma.comment.findUnique({ where: { id } })
  await prisma.comment.delete({ where: { id } })
  revalidatePath('/adm/comments')
  if (comment) revalidatePath(`/post/${comment.postId}`)
}

// Настройки
export async function changeAdminPassword(formData: FormData) {
  const newPassword = formData.get('password') as string
  // В данной реализации мы просто имитируем, так как используем фиксированный логин
  // В реальности здесь было бы обновление в БД
  console.log('Password changed to:', newPassword)
  return { success: true }
}
