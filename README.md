# ShopVN - Website Thương mại điện tử

Website bán hàng cá nhân hoàn chỉnh với Next.js 15, Prisma, PostgreSQL.

## 🚀 Tính năng

### Người dùng
- 🛒 Trang chủ với banner, slider sản phẩm
- 📦 Danh sách sản phẩm với bộ lọc, phân trang
- 🔍 Tìm kiếm realtime
- 🛍️ Giỏ hàng với mã giảm giá
- 💳 Thanh toán (COD, Stripe, VNPay)
- 📱 Responsive (Mobile, Tablet, Desktop)
- 🌙 Dark/Light mode
- 📱 PWA support

### Quản trị
- 📊 Dashboard với thống kê
- 📦 Quản lý sản phẩm
- 📁 Quản lý danh mục
- 📋 Quản lý đơn hàng
- 👥 Quản lý khách hàng
- 🎟️ Quản lý mã giảm giá
- 💬 Chat realtime
- 🔔 Thông báo realtime

## 🛠️ Công nghệ

### Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion
- Zustand (State Management)

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- NextAuth

### Deployment
- Docker
- Nginx
- PM2

## 📦 Cài đặt

### Yêu cầu
- Node.js 18+
- PostgreSQL 15+
- npm hoặc yarn

### 1. Clone dự án
```bash
git clone https://github.com/your-repo/shopvn.git
cd shopvn
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình môi trường
```bash
cp .env.example .env
# Chỉnh sửa .env với thông tin của bạn
```

### 4. Khởi tạo database
```bash
# Tạo database PostgreSQL
createdb ecommerce_db

# Chạy migrations
npm run db:push

# (Tùy chọn) Seed dữ liệu mẫu
npm run db:seed
```

### 5. Chạy ứng dụng
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 🐳 Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # Next.js App Router
│   ├── (shop)/           # Customer pages
│   ├── (admin)/          # Admin pages
│   └── api/              # API routes
├── components/
│   ├── admin/            # Admin components
│   ├── layout/           # Layout components
│   ├── shop/             # Shop components
│   └── ui/               # UI components
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── prisma/               # Prisma schema & seed
```

## 🔐 API Documentation

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/[...nextauth]` - Đăng nhập

### Products
- `GET /api/products` - Danh sách sản phẩm
- `POST /api/products` - Tạo sản phẩm (Admin)
- `GET /api/products/[slug]` - Chi tiết sản phẩm

### Orders
- `GET /api/orders` - Danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng

### Cart
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart` - Thêm vào giỏ hàng
- `PATCH /api/cart` - Cập nhật giỏ hàng
- `DELETE /api/cart` - Xóa khỏi giỏ hàng

## 🌐 Deployment lên Server

### Ubuntu 22.04

```bash
# 1. Cài đặt Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Cài đặt PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# 3. Cài đặt PM2
sudo npm install -g pm2

# 4. Clone và cài đặt
git clone https://github.com/your-repo/shopvn.git
cd shopvn
npm install
npm run build

# 5. Cấu hình database
sudo -u postgres psql
CREATE DATABASE ecommerce_db;
CREATE USER shopvn WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ecommerce_db TO shopvn;

# 6. Chạy với PM2
pm2 start ecosystem.config.js --env production

# 7. Cài đặt Nginx
sudo apt-get install -y nginx
sudo cp nginx.conf /etc/nginx/sites-available/shopvn
sudo ln -s /etc/nginx/sites-available/shopvn /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 8. SSL với Certbot
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📝 License

MIT License - xem [LICENSE](LICENSE) để biết thêm chi tiết.

## 📞 Hỗ trợ

- Email: support@shopvn.com
- Phone: 1900 1234

---

Made with ❤️ by ShopVN
