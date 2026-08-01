import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  about: [
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Tin tức', href: '/news' },
    { name: 'Tuyển dụng', href: '/careers' },
    { name: 'Liên hệ', href: '/contact' },
  ],
  customerService: [
    { name: 'Trung tâm hỗ trợ', href: '/help' },
    { name: 'Chính sách đổi trả', href: '/return-policy' },
    { name: 'Chính sách bảo mật', href: '/privacy' },
    { name: 'Điều khoản sử dụng', href: '/terms' },
  ],
  payment: [
    { name: 'Thanh toán khi nhận hàng', href: '/payment/cod' },
    { name: 'Thanh toán online', href: '/payment/online' },
    { name: 'VNPay', href: '/payment/vnpay' },
    { name: 'Stripe', href: '/payment/stripe' },
  ],
  followUs: [
    { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
    { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
    { name: 'Youtube', href: 'https://youtube.com', icon: Youtube },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6" />
              <div>
                <h4 className="font-semibold text-white">Đăng ký nhận tin</h4>
                <p className="text-sm text-gray-400">Nhận thông tin khuyến mãi mới nhất</p>
              </div>
            </div>
            <form className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                className="w-full md:w-64 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Đăng ký</span>
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-white">ShopVN</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Cửa hàng trực tuyến hàng đầu Việt Nam với hàng ngàn sản phẩm chất lượng, giá tốt nhất thị trường.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@shopvn.com</span>
              </div>
            </div>
          </div>

          {/* About links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Về chúng tôi</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="font-semibold text-white mb-4">Dịch vụ khách hàng</h4>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment */}
          <div>
            <h4 className="font-semibold text-white mb-4">Thanh toán</h4>
            <ul className="space-y-2">
              {footerLinks.payment.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kết nối</h4>
            <div className="flex gap-3">
              {footerLinks.followUs.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2024 ShopVN. Tất cả quyền được bảo lưu.</p>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white">Chính sách bảo mật</Link>
              <Link href="/terms" className="hover:text-white">Điều khoản sử dụng</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
