import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Liên hệ | ShopVN',
  description: 'Liên hệ với ShopVN - Chúng tôi luôn sẵn sàng hỗ trợ bạn',
}

const contactMethods = [
  {
    icon: Phone,
    title: 'Điện thoại',
    value: '1900 1234',
    description: 'Từ 8:00 - 22:00, Thứ 2 - CN',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'support@shopvn.com',
    description: 'Phản hồi trong 24 giờ',
  },
  {
    icon: MessageCircle,
    title: 'Chat trực tuyến',
    value: 'Facebook Messenger',
    description: 'Phản hồi ngay lập tức',
  },
  {
    icon: MapPin,
    title: 'Địa chỉ',
    value: '123 Nguyễn Huệ, Q.1',
    description: 'TP. Hồ Chí Minh',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Liên hệ ngay!
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-primary font-medium">{method.value}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Gửi tin nhắn</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Họ và tên</label>
                        <Input placeholder="Nhập họ và tên của bạn" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Email</label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Số điện thoại</label>
                      <Input type="tel" placeholder="0912 345 678" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Chủ đề</label>
                      <select className="w-full h-10 px-3 border rounded-md bg-background text-sm">
                        <option>Chọn chủ đề</option>
                        <option>Tư vấn sản phẩm</option>
                        <option>Hỗ trợ đơn hàng</option>
                        <option>Khiếu nại</option>
                        <option>Hợp tác kinh doanh</option>
                        <option>Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Nội dung</label>
                      <Textarea placeholder="Viết nội dung tin nhắn của bạn..." rows={5} />
                    </div>
                    <Button className="w-full">Gửi tin nhắn</Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Vị trí của chúng tôi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Bản đồ sẽ hiển thị ở đây</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Trụ sở chính</p>
                          <p className="text-sm text-muted-foreground">
                            123 Nguyễn Huệ, Phường Bến Nghé, Quận 1<br />
                            TP. Hồ Chí Minh, Việt Nam
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Giờ làm việc</p>
                          <p className="text-sm text-muted-foreground">
                            Thứ 2 - Thứ 6: 8:00 - 22:00<br />
                            Thứ 7 - CN: 9:00 - 21:00
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Bạn có câu hỏi thường gặp?</h2>
            <p className="text-muted-foreground mb-6">
              Truy cập trang Hỗ trợ để xem các câu hỏi thường gặp và hướng dẫn sử dụng
            </p>
            <Link href="/help">
              <Button variant="outline">Xem câu hỏi thường gặp</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
