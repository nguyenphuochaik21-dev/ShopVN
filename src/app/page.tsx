import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartDrawer } from '@/components/shop/cart-drawer'
import { BannerCarousel } from '@/components/shop/banner-carousel'
import { CategoryGrid } from '@/components/shop/category-grid'
import { ProductSlider } from '@/components/shop/product-slider'
import { Banner } from '@/components/shop/banner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cửa hàng | Mua sắm trực tuyến',
  description: 'Website bán hàng cá nhân với hàng ngàn sản phẩm chất lượng, giá tốt nhất thị trường.',
}

// Mock data for demo
const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB - Titanium Blue',
    slug: 'iphone-15-pro-max-256gb',
    price: 32990000,
    comparePrice: 34990000,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop'],
    sold: 1250,
    averageRating: 4.8,
    reviewCount: 2340,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '2',
    name: 'MacBook Air M3 13 inch 8GB RAM',
    slug: 'macbook-air-m3-13-inch',
    price: 28990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'],
    sold: 890,
    averageRating: 4.9,
    reviewCount: 1560,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '3',
    name: 'Tai nghe AirPods Pro 2nd Generation',
    slug: 'airpods-pro-2nd-gen',
    price: 5990000,
    comparePrice: 6990000,
    images: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop'],
    sold: 2340,
    averageRating: 4.7,
    reviewCount: 4500,
    isFeatured: false,
    isFlashSale: true,
  },
  {
    id: '4',
    name: 'Samsung Galaxy S24 Ultra 512GB',
    slug: 'samsung-galaxy-s24-ultra',
    price: 32990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop'],
    sold: 567,
    averageRating: 4.6,
    reviewCount: 890,
    isFeatured: true,
    isFlashSale: false,
  },
]

const newProducts = [
  {
    id: '5',
    name: 'Apple Watch Series 9 GPS 45mm',
    slug: 'apple-watch-series-9',
    price: 11990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop'],
    sold: 234,
    averageRating: 4.5,
    reviewCount: 456,
    isFeatured: false,
    isFlashSale: false,
  },
  {
    id: '6',
    name: 'iPad Pro 11 inch M2 Chip',
    slug: 'ipad-pro-11-m2',
    price: 22990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'],
    sold: 123,
    averageRating: 4.8,
    reviewCount: 234,
    isFeatured: false,
    isFlashSale: false,
  },
  {
    id: '7',
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    price: 8990000,
    comparePrice: 9990000,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
    sold: 456,
    averageRating: 4.7,
    reviewCount: 890,
    isFeatured: true,
    isFlashSale: false,
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    slug: 'nintendo-switch-oled',
    price: 8990000,
    comparePrice: null,
    images: ['https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop'],
    sold: 789,
    averageRating: 4.6,
    reviewCount: 1234,
    isFeatured: false,
    isFlashSale: true,
  },
]

const flashSaleProducts = [
  {
    id: '9',
    name: 'Xiaomi Mi Band 8 Active',
    slug: 'xiaomi-mi-band-8',
    price: 990000,
    comparePrice: 1490000,
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop'],
    sold: 5678,
    averageRating: 4.4,
    reviewCount: 8900,
    isFeatured: false,
    isFlashSale: true,
  },
  {
    id: '10',
    name: 'Anker PowerBank 20000mAh',
    slug: 'anker-powerbank-20000mah',
    price: 590000,
    comparePrice: 790000,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop'],
    sold: 3456,
    averageRating: 4.5,
    reviewCount: 5600,
    isFeatured: false,
    isFlashSale: true,
  },
  {
    id: '11',
    name: 'Logitech MX Master 3S Mouse',
    slug: 'logitech-mx-master-3s',
    price: 2290000,
    comparePrice: 2990000,
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
    sold: 1234,
    averageRating: 4.8,
    reviewCount: 2100,
    isFeatured: false,
    isFlashSale: true,
  },
  {
    id: '12',
    name: 'SanDisk 256GB USB Flash Drive',
    slug: 'sandisk-256gb-usb',
    price: 350000,
    comparePrice: 550000,
    images: ['https://images.unsplash.com/photo-1597845578709-5e6b4d8e4b11?w=400&h=400&fit=crop'],
    sold: 8900,
    averageRating: 4.3,
    reviewCount: 12000,
    isFeatured: false,
    isFlashSale: true,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner Carousel */}
        <section className="container mx-auto px-4 py-6">
          <BannerCarousel />
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-8">
          <CategoryGrid />
        </section>

        {/* Flash Sale */}
        <section className="bg-gradient-to-r from-red-500 to-orange-500 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white text-red-500 px-4 py-2 rounded-lg font-bold text-xl animate-pulse">
                  ⚡ FLASH SALE
                </div>
                <div className="text-white">
                  <span className="text-sm">Kết thúc trong:</span>
                  <div className="flex gap-1 mt-1">
                    <span className="countdown-box">08</span>
                    <span className="text-white">:</span>
                    <span className="countdown-box">45</span>
                    <span className="text-white">:</span>
                    <span className="countdown-box">30</span>
                  </div>
                </div>
              </div>
              <a href="/flash-sale" className="text-white hover:underline flex items-center gap-1">
                Xem tất cả
                <span>→</span>
              </a>
            </div>
            <ProductSlider
              title=""
              products={flashSaleProducts}
              link="/flash-sale"
            />
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-12">
          <ProductSlider
            title="⭐ Sản phẩm nổi bật"
            products={featuredProducts}
            link="/products?sort=featured"
            linkText="Xem tất cả"
          />
        </section>

        {/* Promo Banner */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
                alt="Khuyến mãi"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Mua sắm thông minh</h3>
                  <p className="mb-4">Giảm đến 30% cho đơn hàng đầu tiên</p>
                  <a href="/promotions/first-order" className="inline-block bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Mua ngay
                  </a>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop"
                alt="Miễn phí vận chuyển"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Miễn phí vận chuyển</h3>
                  <p className="mb-4">Cho đơn hàng từ 500.000đ</p>
                  <a href="/shipping" className="inline-block bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    Tìm hiểu thêm
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Products */}
        <section className="container mx-auto px-4 py-12">
          <ProductSlider
            title="🆕 Sản phẩm mới"
            products={newProducts}
            link="/products?sort=newest"
            linkText="Xem tất cả"
          />
        </section>

        {/* Features */}
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h4 className="font-semibold mb-2">Miễn phí vận chuyển</h4>
                <p className="text-sm text-muted-foreground">Cho đơn hàng từ 500K</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔄</span>
                </div>
                <h4 className="font-semibold mb-2">Đổi trả dễ dàng</h4>
                <p className="text-sm text-muted-foreground">Trong vòng 30 ngày</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💳</span>
                </div>
                <h4 className="font-semibold mb-2">Thanh toán an toàn</h4>
                <p className="text-sm text-muted-foreground">100% secure payment</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📞</span>
                </div>
                <h4 className="font-semibold mb-2">Hỗ trợ 24/7</h4>
                <p className="text-sm text-muted-foreground">Luôn sẵn sàng hỗ trợ</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer />
    </div>
  )
}
