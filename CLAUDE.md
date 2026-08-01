# ROLE

Bạn là một Senior Full Stack Engineer với hơn 15 năm kinh nghiệm phát triển hệ thống thương mại điện tử quy mô lớn.

Nhiệm vụ của bạn là xây dựng một website bán hàng cá nhân hoàn chỉnh, hiện đại, tối ưu SEO, bảo mật cao và có thể triển khai trực tiếp lên server production.

Website phải được tạo ra như một sản phẩm thương mại thực tế, không phải bản demo.

---

# TECH STACK

Sử dụng các công nghệ sau:

Frontend:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

Backend:

- Next.js API Routes
- Prisma ORM
- PostgreSQL

Authentication:

- NextAuth

Storage:

- Cloudinary

Payment:

- Stripe
- VNPay

Email:

- Nodemailer

State management:

- Zustand

Deployment:

- Docker
- Nginx
- PM2
- Vercel hoặc VPS Ubuntu

---

# WEBSITE REQUIREMENTS

Xây dựng một website bán hàng cá nhân hoàn chỉnh bằng tiếng Việt.

Website phải responsive cho:

- Mobile
- Tablet
- Desktop

Thiết kế theo phong cách hiện đại giống:

- Shopee
- Lazada
- Tiki
- Apple Store

Màu sắc:

- Trắng
- Xanh dương
- Xám

---

# USER FEATURES

## Trang chủ

- Banner động
- Slider sản phẩm nổi bật
- Danh mục sản phẩm
- Sản phẩm mới
- Sản phẩm bán chạy
- Sản phẩm giảm giá
- Khuyến mãi

## Đăng ký / Đăng nhập

- Email + mật khẩu
- Google Login
- Quên mật khẩu
- Xác thực email

## Hồ sơ người dùng

- Thông tin cá nhân
- Đổi mật khẩu
- Địa chỉ giao hàng
- Lịch sử đơn hàng
- Danh sách yêu thích

## Sản phẩm

- Danh sách sản phẩm
- Chi tiết sản phẩm
- Hình ảnh
- Video
- Đánh giá
- Bình luận
- Rating sao

## Tìm kiếm

- Tìm kiếm realtime
- Gợi ý sản phẩm
- Bộ lọc

Bộ lọc:

- Giá
- Danh mục
- Màu sắc
- Kích thước
- Đánh giá

## Giỏ hàng

- Thêm sản phẩm
- Xóa sản phẩm
- Cập nhật số lượng
- Mã giảm giá

## Thanh toán

- COD
- Stripe
- VNPay

## Đơn hàng

- Theo dõi trạng thái:

    - Chờ xác nhận
    - Đang đóng gói
    - Đang giao
    - Hoàn thành
    - Đã hủy

## Chat

- Chat trực tiếp với cửa hàng
- Thông báo realtime

## Thông báo

- Notification realtime

---

# ADMIN DASHBOARD

Tạo dashboard quản trị riêng.

## Quản lý sản phẩm

- Thêm
- Sửa
- Xóa
- Upload ảnh
- Upload video

## Quản lý danh mục

- CRUD

## Quản lý đơn hàng

- Xem đơn hàng
- Cập nhật trạng thái
- In hóa đơn

## Quản lý khách hàng

- Danh sách khách hàng
- Khóa tài khoản

## Quản lý khuyến mãi

- Voucher
- Coupon
- Flash sale

## Thống kê

Biểu đồ:

- Doanh thu
- Đơn hàng
- Người dùng
- Sản phẩm bán chạy

Sử dụng:

- Chart.js

---

# DATABASE

Thiết kế đầy đủ database:

- users
- products
- categories
- carts
- orders
- order_items
- reviews
- coupons
- wishlists
- notifications
- chats
- messages

Sử dụng Prisma Schema.

---

# SEO

Tối ưu SEO:

- sitemap.xml
- robots.txt
- metadata
- Open Graph
- JSON-LD

Điểm Lighthouse:

- trên 90

---

# SECURITY

Triển khai:

- JWT
- CSRF protection
- XSS protection
- SQL injection protection
- Rate limiting
- Input validation

---

# PERFORMANCE

- Lazy loading
- Pagination
- Infinite scroll
- Image optimization
- Caching
- SSR
- ISR

---

# PROJECT STRUCTURE

Tạo cấu trúc thư mục:

src/

- app/
- components/
- lib/
- hooks/
- store/
- services/
- prisma/
- types/
- utils/
- middleware/

---

# API DOCUMENTATION

Tạo đầy đủ:

- REST API
- Swagger

Ví dụ:

GET /api/products

POST /api/orders

PUT /api/profile

DELETE /api/cart

---

# TESTING

Tạo:

- Unit test
- Integration test
- E2E test

Sử dụng:

- Jest
- Cypress

---

# DEPLOYMENT

Tự động tạo:

- Dockerfile
- docker-compose.yml
- nginx.conf
- ecosystem.config.js
- .env.example

Tạo script:

npm run dev

npm run build

npm run start

docker-compose up -d

---

# SERVER DEPLOYMENT

Triển khai được trên:

- Ubuntu 22.04
- VPS
- Vercel

Tự động sinh hướng dẫn:

1. Cài Node.js
2. Cài Docker
3. Cài PostgreSQL
4. Cấu hình Nginx
5. Chạy SSL với Certbot
6. Deploy production

---

# EXTRA FEATURES

- Dark mode
- Light mode
- Đa ngôn ngữ
- PWA
- Offline mode
- Analytics
- Chatbot AI
- Gửi email tự động
- QR code thanh toán

---

# FINAL REQUIREMENTS

Sau khi hoàn thành:

1. Sinh toàn bộ source code.
2. Không sử dụng dữ liệu giả.
3. Sinh file README.md đầy đủ.
4. Sinh script cài đặt tự động.
5. Kiểm tra lỗi TypeScript.
6. Đảm bảo chạy được ngay sau khi clone.
7. Đảm bảo deploy được lên server.
8. Tự sửa lỗi nếu phát hiện lỗi build.
9. Tạo dữ liệu mẫu để test.

Cuối cùng, hãy hiển thị toàn bộ cây thư mục của dự án và hướng dẫn deploy từng bước.