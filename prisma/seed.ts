import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...\n')

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
        name: 'Admin ShopVN',
        password: hashedPassword,
        role: 'ADMIN',
        isActive: true,
      },
    })

    console.log('✅ Admin user created!')
    console.log(`   📧 Email: ${admin.email}`)
    console.log(`   🔑 Password: ${adminPassword}\n`)
  } else {
    console.log('ℹ️  Admin user already exists\n')
  }

  // Create sample categories
  const categoriesData = [
    {
      name: 'Điện tử',
      slug: 'dien-tu',
      description: 'Các sản phẩm công nghệ - điện thoại, laptop, tablet, phụ kiện',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
    },
    {
      name: 'Thời trang',
      slug: 'thoi-trang',
      description: 'Quần áo, giày dép, túi xách thời trang',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400'
    },
    {
      name: 'Nhà cửa',
      slug: 'nha-cua',
      description: 'Đồ gia dụng, nội thất, trang trí nhà cửa',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'
    },
    {
      name: 'Sắc đẹp',
      slug: 'sac-dep',
      description: 'Mỹ phẩm, chăm sóc da, nước hoa',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
    },
    {
      name: 'Sức khỏe',
      slug: 'suc-khoe',
      description: 'Thực phẩm chức năng, vitamin, thiết bị y tế',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'
    },
    {
      name: 'Thể thao',
      slug: 'the-thao',
      description: 'Dụng cụ tập gym, yoga, các môn thể thao',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400'
    },
  ]

  const categories: any[] = []
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
    categories.push(category)
  }
  console.log(`✅ Created ${categories.length} categories`)

  // Create sample products
  const productsData = [
    // Điện tử
    {
      name: 'iPhone 15 Pro Max 256GB',
      slug: 'iphone-15-pro-max-256gb',
      description: 'iPhone 15 Pro Max với chip A17 Pro, camera 48MP, màn hình Super Retina XDR 6.7 inch',
      price: 32990000,
      comparePrice: 34990000,
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
      categorySlug: 'dien-tu',
      isFeatured: true,
      isFlashSale: true,
      quantity: 100,
      sold: 234,
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description: 'Điện thoại Samsung Galaxy S24 Ultra với bút S Pen, camera 200MP',
      price: 27990000,
      comparePrice: 29990000,
      images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
      categorySlug: 'dien-tu',
      isFeatured: true,
      quantity: 80,
      sold: 156,
    },
    {
      name: 'MacBook Air M3 13 inch',
      slug: 'macbook-air-m3-13-inch',
      description: 'MacBook Air M3 chip Apple M3, 8GB RAM, 256GB SSD',
      price: 27990000,
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
      categorySlug: 'dien-tu',
      isFeatured: true,
      quantity: 50,
      sold: 89,
    },
    {
      name: 'AirPods Pro 2',
      slug: 'airpods-pro-2',
      description: 'Tai nghe AirPods Pro 2 với chống ồn chủ động, sạc USB-C',
      price: 6990000,
      images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500'],
      categorySlug: 'dien-tu',
      quantity: 200,
      sold: 567,
    },
    {
      name: 'iPad Pro 12.9 inch M2',
      slug: 'ipad-pro-12-9-m2',
      description: 'iPad Pro M2 12.9 inch với Liquid Retina XDR display',
      price: 25990000,
      comparePrice: 27990000,
      images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'],
      categorySlug: 'dien-tu',
      isFeatured: true,
      quantity: 60,
      sold: 123,
    },
    // Thời trang
    {
      name: 'Áo Hoodie Nike Classic',
      slug: 'ao-hoodie-nike-classic',
      description: 'Áo hoodie nam Nike Classic Fit với chất liệu cotton thoáng mát',
      price: 1599000,
      comparePrice: 1999000,
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500'],
      categorySlug: 'thoi-trang',
      isFeatured: true,
      quantity: 300,
      sold: 456,
    },
    {
      name: 'Giày Adidas Ultraboost 23',
      slug: 'giay-adidas-ultraboost-23',
      description: 'Giày chạy bộ Adidas Ultraboost 23 với công nghệ Boost',
      price: 5990000,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
      categorySlug: 'thoi-trang',
      isFlashSale: true,
      quantity: 150,
      sold: 234,
    },
    {
      name: 'Túi xách Louis Vuitton Neverfull',
      slug: 'tui-xach-lv-neverfull',
      description: 'Túi xách hàng hiệu Louis Vuitton Neverfull MM',
      price: 45000000,
      images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500'],
      categorySlug: 'thoi-trang',
      quantity: 20,
      sold: 45,
    },
    // Nhà cửa
    {
      name: 'Máy lọc không khí Xiaomi Air Purifier 4',
      slug: 'may-loc-khi-xiaomi-4',
      description: 'Máy lọc không khí Xiaomi với HEPA H13, diện tích 40m²',
      price: 3990000,
      comparePrice: 4990000,
      images: ['https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500'],
      categorySlug: 'nha-cua',
      isFeatured: true,
      quantity: 100,
      sold: 189,
    },
    {
      name: 'Ghế gaming Dxracer Formula',
      slug: 'ghe-gaming-dxracer-formula',
      description: 'Ghế gaming cao cấp Dxracer Formula với chất liệu da PU',
      price: 8990000,
      images: ['https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500'],
      categorySlug: 'nha-cua',
      quantity: 50,
      sold: 78,
    },
    // Sắc đẹp
    {
      name: 'Son kem YSL Tatouage Couture',
      slug: 'son-kem-ysl-tatouage',
      description: 'Son kem lì YSL Tatouage Couture - đỏ cổ điển',
      price: 1150000,
      comparePrice: 1350000,
      images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500'],
      categorySlug: 'sac-dep',
      isFlashSale: true,
      quantity: 200,
      sold: 345,
    },
    {
      name: 'Nước hoa Chanel Bleu de Chanel',
      slug: 'nuoc-hoa-chanel-bdc',
      description: 'Nước hoa nam Chanel Bleu de Chanel EDP 100ml',
      price: 6500000,
      images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?w=500'],
      categorySlug: 'sac-dep',
      quantity: 80,
      sold: 156,
    },
    // Sức khỏe
    {
      name: 'Vitamin C 1000mg Nature Made',
      slug: 'vitamin-c-1000mg-nature-made',
      description: 'Viên uống Vitamin C 1000mg của Nature Made, 500 viên',
      price: 450000,
      images: ['https://images.unsplash.com/photo-1550572017-edd951b55104?w=500'],
      categorySlug: 'suc-khoe',
      quantity: 500,
      sold: 890,
    },
    {
      name: 'Máy đo huyết áp Omron HEM-7124',
      slug: 'may-do-huyet-ap-omron-7124',
      description: 'Máy đo huyết áp điện tử Omron HEM-7124',
      price: 1290000,
      comparePrice: 1590000,
      images: ['https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500'],
      categorySlug: 'suc-khoe',
      quantity: 150,
      sold: 234,
    },
    // Thể thao
    {
      name: 'Thảm yoga cao cấp Liforme',
      slug: 'tham-yoga-liforme',
      description: 'Thảm yoga chống trượt Liforme 4mm',
      price: 2200000,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
      categorySlug: 'the-thao',
      quantity: 200,
      sold: 178,
    },
    {
      name: 'Bộ tạ tay 20kg Adjustable',
      slug: 'bo-ta-tay-20kg',
      description: 'Bộ tạ tay điều chỉnh được 20kg cho tập gym tại nhà',
      price: 1890000,
      comparePrice: 2290000,
      images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500'],
      categorySlug: 'the-thao',
      isFeatured: true,
      quantity: 120,
      sold: 289,
    },
  ]

  let productsCreated = 0
  for (const product of productsData) {
    const category = categories.find(c => c.slug === product.categorySlug)
    if (!category) continue

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        comparePrice: product.comparePrice,
        images: product.images,
        categoryId: category.id,
        isActive: true,
        isFeatured: product.isFeatured || false,
        isFlashSale: product.isFlashSale || false,
        quantity: product.quantity,
        sold: product.sold,
      },
    })
    productsCreated++
  }
  console.log(`✅ Created ${productsCreated} products`)

  // Create sample coupon
  const coupon = await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      name: 'Chào mừng khách mới',
      description: 'Giảm 10% cho đơn hàng đầu tiên',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 200000,
      maxDiscount: 100000,
      quantity: 1000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      isActive: true,
    },
  })
  console.log(`✅ Created coupon: ${coupon.code}`)

  console.log('')
  console.log('🎉 Database seeding completed successfully!')
  console.log('')
  console.log('📝 Summary:')
  console.log('   - Admin: admin@shopvn.com / Admin123@')
  console.log('   - Categories: 6')
  console.log('   - Products: ' + productsCreated)
  console.log('   - Coupon: WELCOME10 (10% off)')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
