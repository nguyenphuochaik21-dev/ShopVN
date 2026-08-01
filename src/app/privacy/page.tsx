import Link from 'next/link'
import { ChevronRight, Shield, Eye, Lock, FileText } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | ShopVN',
  description: 'Chính sách bảo mật thông tin cá nhân của ShopVN',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Chính sách bảo mật</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cam kết bảo vệ thông tin cá nhân của bạn
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Cập nhật lần cuối: 01/08/2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-slate dark:prose-invert">
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <p className="text-lg font-medium">
                  ShopVN cam kết bảo vệ quyền riêng tư và thông tin cá nhân của tất cả người dùng.
                  Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
                </p>
              </div>

              <h2>1. Thông tin chúng tôi thu thập</h2>
              <p>Chúng tôi thu thập các loại thông tin sau:</p>
              <ul>
                <li><strong>Thông tin cá nhân:</strong> Họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng</li>
                <li><strong>Thông tin thanh toán:</strong> Thông tin thẻ (được xử lý qua cổng thanh toán bên thứ ba)</li>
                <li><strong>Thông tin tài khoản:</strong> Tên đăng nhập, mật khẩu (đã mã hóa)</li>
                <li><strong>Dữ liệu sử dụng:</strong> Lịch sử đơn hàng, sản phẩm xem, tìm kiếm</li>
                <li><strong>Dữ liệu thiết bị:</strong> IP, trình duyệt, thiết bị truy cập</li>
              </ul>

              <h2>2. Cách chúng tôi sử dụng thông tin</h2>
              <p>Thông tin của bạn được sử dụng để:</p>
              <ul>
                <li>Xử lý và giao đơn hàng</li>
                <li>Cung cấp hỗ trợ khách hàng</li>
                <li>Gửi thông báo về đơn hàng và khuyến mãi (nếu bạn đồng ý)</li>
                <li>Cải thiện dịch vụ và trải nghiệm người dùng</li>
                <li>Phát hiện và ngăn chặn gian lận</li>
              </ul>

              <h2>3. Bảo mật thông tin</h2>
              <p>Chúng tôi áp dụng các biện pháp bảo mật sau:</p>
              <ul>
                <li>Mã hóa SSL 256-bit cho mọi giao dịch</li>
                <li>Lưu trữ mật khẩu dưới dạng băm (hash) không thể đọc được</li>
                <li>Hệ thống tường lửa và chống xâm nhập</li>
                <li>Giới hạn quyền truy cập nhân viên</li>
                <li>Định kỳ kiểm tra bảo mật</li>
              </ul>

              <h2>4. Chia sẻ thông tin</h2>
              <p>Chúng tôi KHÔNG bán thông tin cá nhân của bạn. Thông tin có thể được chia sẻ với:</p>
              <ul>
                <li><strong>Đối tác giao hàng:</strong> Để vận chuyển đơn hàng</li>
                <li><strong>Cổng thanh toán:</strong> Để xử lý thanh toán an toàn</li>
                <li><strong>Cơ quan chức năng:</strong> Khi được yêu cầu theo pháp luật</li>
              </ul>

              <h2>5. Quyền của bạn</h2>
              <p>Bạn có quyền:</p>
              <ul>
                <li>Truy cập thông tin cá nhân của mình</li>
                <li>Yêu cầu chỉnh sửa thông tin sai sót</li>
                <li>Yêu cầu xóa tài khoản</li>
                <li>Từ chối nhận email marketing</li>
                <li>Yêu cầu xuất dữ liệu của bạn</li>
              </ul>

              <h2>6. Cookies</h2>
              <p>
                Chúng tôi sử dụng cookies để cải thiện trải nghiệm người dùng. Bạn có thể từ chối cookies
                qua cài đặt trình duyệt, tuy nhiên điều này có thể ảnh hưởng đến một số chức năng của website.
              </p>

              <h2>7. Liên hệ</h2>
              <p>
                Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
              </p>
              <ul>
                <li>Email: privacy@shopvn.com</li>
                <li>Điện thoại: 1900 1234</li>
                <li>Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM</li>
              </ul>

              <div className="bg-muted/50 rounded-lg p-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  Chính sách này có thể được cập nhật theo thời gian. Chúng tôi sẽ thông báo
                  cho bạn về bất kỳ thay đổi quan trọng nào qua email hoặc thông báo trên website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/terms" className="text-primary hover:underline">
                Điều khoản sử dụng
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/help" className="text-primary hover:underline">
                Trung tâm hỗ trợ
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/contact" className="text-primary hover:underline">
                Liên hệ
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
