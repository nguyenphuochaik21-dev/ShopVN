import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  file: string,
  folder: string = 'shopvn'
): Promise<{ url: string; publicId: string } | null> {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' },
      ],
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    return null
  }
}

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId)
    return true
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

export function getOptimizedImageUrl(url: string, options?: {
  width?: number
  height?: number
  quality?: string
}): string {
  if (!url.includes('cloudinary.com')) return url

  const transformations: string[] = []

  if (options?.width) {
    transformations.push(`w_${options.width}`)
  }
  if (options?.height) {
    transformations.push(`h_${options.height}`)
  }
  if (options?.quality) {
    transformations.push(`q_${options.quality}`)
  }

  if (transformations.length === 0) return url

  const [baseUrl, publicId] = url.split('/upload/')
  return `${baseUrl}/upload/${transformations.join(',')}/${publicId}`
}

export { cloudinary }
