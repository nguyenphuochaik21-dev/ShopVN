import Link from 'next/link'
import { Users, Award, Heart, Truck, Shield, Headphones } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Về chúng tôi | ShopVN',
  description: 'Tìm hiểu về ShopVN - Cửa hàng trực tuyến hàng đầu Việt Nam',
}

const features = [
  {
    icon: Truck,
    title: 'Miễn phí vận chuyển',
    description: 'Miễn phí giao hàng cho đơn từ 500.000đ trên toàn quốc',
  },
  {
    icon: Shield,
    title: 'Bảo mật thanh toán',
    description: 'Thanh toán an toàn với các cổng thanh toán uy tín',
  },
  {
    icon: Heart,
    title: 'Hỗ trợ tận tâm',
    description: 'Đội ngũ hỗ trợ 24/7 sẵn sàng giải đáp mọi thắc mắc',
  },
  {
    icon: Award,
    title: 'Sản phẩm chính hãng',
    description: 'Cam kết 100% sản phẩm chính hãng từ nhà sản xuất',
  },
]

const team = [
  {
    name: 'Nguyễn Văn An',
    role: 'Giám đốc điều hành',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  },
  {
    name: 'Trần Thị Bình',
    role: 'Giám đốc kinh doanh',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    name: 'Lê Minh Cường',
    role: 'Giám đốc công nghệ',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Về ShopVN</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nền tảng thương mại điện tử hàng đầu Việt Nam, mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Câu chuyện của chúng tôi</h2>
                <p className="text-muted-foreground mb-4">
                  ShopVN được thành lập vào năm 2020 với sứ mệnh đơn giản hóa việc mua sắm trực tuyến tại Việt Nam.
                  Chúng tôi tin rằng mọi người đều xứng đáng có quyền truy cập vào các sản phẩm chất lượng với giá cả hợp lý.
                </p>
                <p className="text-muted-foreground mb-4">
                  Từ một cửa hàng nhỏ, ShopVN đã phát triển thành một trong những marketplace lớn nhất cả nước với hàng triệu sản phẩm từ hàng nghìn nhà cung cấp uy tín.
                </p>
                <p className="text-muted-foreground">
                  Chúng tôi không ngừng cải thiện để mang đến cho bạn trải nghiệm mua sắm tốt nhất có thể.
                </p>
              </div>
              <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                <span className="text-muted-foreground">Hình ảnh công ty</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn ShopVN?</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Đội ngũ lãnh đạo</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 bg-muted">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1M+</div>
                <div className="text-primary-foreground/80">Khách hàng</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5M+</div>
                <div className="text-primary-foreground/80">Sản phẩm</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-primary-foreground/80">Nhà cung cấp</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">63</div>
                <div className="text-primary-foreground/80">Tỉnh/Thành</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Bắt đầu mua sắm ngay hôm nay</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Khám phá hàng triệu sản phẩm chất lượng với giá cả hợp lý tại ShopVN
            </p>
            <Link href="/products">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors">
                Khám phá ngay
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
