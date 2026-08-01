import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'Điện tử', slug: 'dien-tu', icon: '📱', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=300&fit=crop' },
  { name: 'Thời trang', slug: 'thoi-trang', icon: '👕', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=300&fit=crop' },
  { name: 'Nhà cửa', slug: 'nha-cua', icon: '🏠', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop' },
  { name: 'Sắc đẹp', slug: 'sac-dep', icon: '💄', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop' },
  { name: 'Sức khỏe', slug: 'suc-khoe', icon: '💪', image: 'https://images.unsplash.com/photo-1556760544-74068565f05c?w=300&h=300&fit=crop' },
  { name: 'Thể thao', slug: 'the-thao', icon: '⚽', image: 'https://images.unsplash.com/photo-1461896836934- voices-482ed6ece9f7?w=300&h=300&fit=crop' },
  { name: 'Sách', slug: 'sach', icon: '📚', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=300&fit=crop' },
  { name: 'Đồ chơi', slug: 'do-choi', icon: '🎮', image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop' },
]

interface CategoryGridProps {
  className?: string
}

export function CategoryGrid({ className }: CategoryGridProps) {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-4', className)}>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="group relative aspect-square overflow-hidden rounded-xl"
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
            <span className="text-2xl mb-1">{category.icon}</span>
            <span className="font-medium text-center">{category.name}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
