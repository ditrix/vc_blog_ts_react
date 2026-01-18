import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import PostEditClient from './PostEditClient'

export default async function PostEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const isNew = id === 'new'
  
  let post = null
  
  if (isNew) {
    post = { title: '', content: '', published: false, imagePath: null }
  } else {
    post = await prisma.post.findUnique({ 
      where: { id: parseInt(id) } 
    })
    if (!post) notFound()
  }

  return <PostEditClient post={post} id={id} />
}
