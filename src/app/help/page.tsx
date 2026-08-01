import Link from 'next/link'
import { ChevronRight, Search, Package, CreditCard, Truck, RotateCcw, Shield, Phone } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Hỗ trợ | ShopVN',
  description: 'Trung tâm hỗ trợ khách hàng ShopVN - Câu hỏi thường gặp và hướng dẫn',
}

const categories = [
  {
    icon: Package,
    title: 'Đơn hàng & Vận chuyển',
    link: '#orders',
    faqs: [
      {
        q: 'Làm sao để theo dõi đơn hàng?',
        a: 'Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản, vào mục "Đơn hàng của tôi" và nhấp vào đơn hàng cần theo dõi. Hoặc sử dụng mã vận đơn được gửi qua email/SMS.',
      },
      {
        q: 'Thời gian giao hàng mất bao lâu?',
        a: 'Thời gian giao hàng phụ thuộc vào địa chỉ nhận hàng. Thông thường: Nội thành TP.HCM và Hà Nội: 1-2 ngày. Các tỉnh thành khác: 3-5 ngày. Vùng sâu vùng xa: 5-7 ngày.',
      },
      {
        q: 'Tôi có thể thay đổi địa chỉ giao hàng không?',
        a: 'Bạn chỉ có thể thay đổi địa chỉ khi đơn hàng chưa được xác nhận. Vui lòng liên hệ bộ phận hỗ trợ ngay khi phát hiện sai sót.',
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Thanh toán',
    link: '#payment',
    faqs: [
      {
        q: 'ShopVN hỗ trợ những phương thức thanh toán nào?',
        a: 'Chúng tôi hỗ trợ: Thanh toán khi nhận hàng (COD), Thẻ tín dụng/ghi nợ (Visa, Mastercard), Chuyển khoản ngân hàng, Ví điện tử (MoMo, ZaloPay, VNPay).',
      },
      {
        q: 'Thanh toán online có an toàn không?',
        a: 'Rất an toàn! Chúng tôi sử dụng công nghệ mã hóa SSL 256-bit và các cổng thanh toán uy tín như Stripe, VNPay để đảm bảo an toàn cho mọi giao dịch.',
      },
    ],
  },
  {
    icon: RotateCcw,
    title: 'Đổi trả & Hoàn tiền',
    link: '#returns',
    faqs: [
      {
        q: 'Chính sách đổi trả như thế nào?',
        a: 'Bạn được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi từ nhà sản xuất, giao sai sản phẩm hoặc không đúng như mô tả. Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng.',
      },
      {
        q: 'Quy trình hoàn tiền mất bao lâu?',
        a: 'Sau khi chúng tôi xác nhận đã nhận được sản phẩm đổi trả, tiền sẽ được hoàn vào tài khoản của bạn trong vòng 5-7 ngày làm việc (tùy phương thức thanh toán ban đầu).',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Tài khoản & Bảo mật',
    link: '#account',
    faqs: [
      {
        q: 'Làm sao để đặt lại mật khẩu?',
        a: 'Nhấp vào "Quên mật khẩu" tại trang đăng nhập, nhập email đã đăng ký và làm theo hướng dẫn trong email để tạo mật khẩu mới.',
      },
      {
        q: 'Tôi có thể thay đổi thông tin tài khoản không?',
        a: 'Có, bạn có thể cập nhật thông tin cá nhân, địa chỉ giao hàng, số điện thoại trong mục "Hồ sơ của tôi". Email đăng nhập không thể thay đổi.',
      },
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Trung tâm hỗ trợ</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Tìm câu trả lời cho các câu hỏi thường gặp hoặc liên hệ với chúng tôi
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm câu hỏi..."
                className="pl-10 h-12"
              />
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tracking">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-muted transition-colors">
                  <Package className="h-4 w-4" />
                  Theo dõi đơn hàng
                </button>
              </Link>
              <Link href="/orders">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-muted transition-colors">
                  <Truck className="h-4 w-4" />
                  Đơn hàng của tôi
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-muted transition-colors">
                  <Shield className="h-4 w-4" />
                  Đăng nhập
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {categories.map((category, index) => (
                <Card key={index} id={category.link.substring(1)}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${index}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Phone className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">Bạn cần hỗ trợ thêm?</h2>
            <p className="text-primary-foreground/80 mb-6">
              Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
            </p>
            <Link href="/contact">
              <button className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                Liên hệ hỗ trợ
              </button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
