import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user
  const adminEmail = 'admin@shopvn.com'
  const adminPassword = 'Admin123@'

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    })

    console.log(`✅ Admin user created!`)
    console.log(`   Email: ${admin.email}`)
    console.log(`   Password: ${adminPassword}`)
  } else {
    console.log('ℹ️  Admin user already exists')
  }

  // Create sample categories
  const categories = [
    { name: 'Điện tử', slug: 'dien-tu', description: 'Các sản phẩm điện tử' },
    { name: 'Thời trang', slug: 'thoi-trang', description: 'Quần áo, giày dép' },
    { name: 'Nhà cửa', slug: 'nha-cua', description: 'Đồ gia dụng, nội thất' },
    { name: 'Sắc đẹp', slug: 'sac-dep', description: 'Mỹ phẩm, làm đẹp' },
    { name: 'Sức khỏe', slug: 'suc-khoe', description: 'Thực phẩm chức năng' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }

  console.log('✅ Categories created!')
  console.log('')
  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
