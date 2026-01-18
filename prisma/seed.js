const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Первый пост',
      content: 'Это содержание первого поста. Добро пожаловать в наш новый блог!',
      comments: {
        create: [
          { content: 'Отличный пост!', author: 'Иван' },
          { content: 'Очень интересно, спасибо.', author: 'Мария' },
        ],
      },
    },
  })

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Тренды веб-разработки 2026',
      content: 'В 2026 году мы видим еще большее распространение ИИ-инструментов...',
      comments: {
        create: [
          { content: 'ИИ действительно меняет всё.', author: 'Алексей' },
        ],
      },
    },
  })

  console.log({ post1, post2 })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
