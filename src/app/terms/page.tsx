import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { Metadata } from 'next'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng | ShopVN',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ ShopVN',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Điều khoản sử dụng</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Các điều khoản và điều kiện khi sử dụng dịch vụ của ShopVN
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
                  Bằng việc truy cập và sử dụng website ShopVN, bạn đồng ý tuân thủ các điều khoản
                  và điều kiện được nêu dưới đây.
                </p>
              </div>

              <h2>1. Chấp nhận điều khoản</h2>
              <p>
                Khi truy cập và sử dụng website ShopVN, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý
                với các điều khoản này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng
                không sử dụng dịch vụ của chúng tôi.
              </p>

              <h2>2. Tài khoản người dùng</h2>
              <h3>2.1 Đăng ký tài khoản</h3>
              <p>
                Để sử dụng một số tính năng, bạn cần đăng ký tài khoản. Bạn cam kết cung cấp
                thông tin chính xác và cập nhật khi có thay đổi.
              </p>
              <h3>2.2 Trách nhiệm của người dùng</h3>
              <ul>
                <li>Bảo mật thông tin đăng nhập của bạn</li>
                <li>Không chia sẻ tài khoản với người khác</li>
                <li>Thông báo ngay cho chúng tôi nếu phát hiện truy cập trái phép</li>
                <li>Chịu trách nhiệm về mọi hoạt động dưới tài khoản của bạn</li>
              </ul>

              <h2>3. Đơn hàng và thanh toán</h2>
              <h3>3.1 Đặt hàng</h3>
              <p>
                Khi đặt hàng trên ShopVN, bạn cam kết mua sản phẩm với giá được hiển thị tại thời
                điểm đặt hàng. Chúng tôi có quyền hủy đơn hàng nếu có lỗi về giá hoặc tồn kho.
              </p>
              <h3>3.2 Thanh toán</h3>
              <p>Chúng tôi hỗ trợ các phương thức thanh toán:</p>
              <ul>
                <li>Thanh toán khi nhận hàng (COD)</li>
                <li>Thẻ tín dụng/ghi nợ (Visa, Mastercard)</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Ví điện tử (MoMo, ZaloPay, VNPay)</li>
              </ul>

              <h2>4. Chính sách vận chuyển</h2>
              <p>
                Chúng tôi cung cấp dịch vụ vận chuyển trên toàn quốc. Thời gian giao hàng dao động
                từ 1-7 ngày tùy địa điểm. Phí vận chuyển được miễn phí cho đơn hàng từ 500.000đ.
              </p>

              <h2>5. Chính sách đổi trả</h2>
              <p>
                Bạn được đổi trả sản phẩm trong vòng 7 ngày kể từ ngày nhận hàng nếu:
              </p>
              <ul>
                <li>Sản phẩm bị lỗi từ nhà sản xuất</li>
                <li>Giao sai sản phẩm hoặc số lượng</li>
                <li>Sản phẩm không đúng như mô tả</li>
              </ul>
              <p>
                Sản phẩm đổi trả phải còn nguyên vẹn, chưa qua sử dụng và còn đầy đủ phụ kiện đi kèm.
              </p>

              <h2>6. Quyền sở hữu trí tuệ</h2>
              <p>
                Tất cả nội dung trên website ShopVN (logo, hình ảnh, văn bản, thiết kế) đều thuộc
                quyền sở hữu của ShopVN hoặc được cấp phép hợp lệ. Nghiêm cấm sao chép, phân phối
                hoặc sử dụng cho mục đích thương mại khi chưa có sự đồng ý bằng văn bản.
              </p>

              <h2>7. Giới hạn trách nhiệm</h2>
              <p>
                ShopVN không chịu trách nhiệm về:
              </p>
              <ul>
                <li>Thiệt hại gián tiếp hoặc do sử dụng sản phẩm</li>
                <li>Lỗi kỹ thuật ngoài tầm kiểm soát</li>
                <li>Hành vi của bên thứ ba</li>
              </ul>

              <h2>8. Sửa đổi điều khoản</h2>
              <p>
                Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Các thay đổi sẽ có
                hiệu lực ngay khi được đăng tải trên website. Việc tiếp tục sử dụng sau khi có thay
                đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
              </p>

              <h2>9. Luật áp dụng</h2>
              <p>
                Các điều khoản này được điều chỉnh bởi luật pháp Việt Nam. Mọi tranh chấp phát sinh
                sẽ được giải quyết tại Tòa án có thẩm quyền tại TP. Hồ Chí Minh.
              </p>

              <h2>10. Liên hệ</h2>
              <p>Nếu bạn có câu hỏi về điều khoản sử dụng, vui lòng liên hệ:</p>
              <ul>
                <li>Email: legal@shopvn.com</li>
                <li>Điện thoại: 1900 1234</li>
                <li>Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM</li>
              </ul>

              <div className="bg-muted/50 rounded-lg p-6 mt-8">
                <p className="text-sm text-muted-foreground">
                  Cảm ơn bạn đã đọc và đồng ý với các điều khoản sử dụng của ShopVN.
                  Chúng tôi mong muốn mang đến cho bạn trải nghiệm mua sắm tốt nhất.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-8 border-t">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/privacy" className="text-primary hover:underline">
                Chính sách bảo mật
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
