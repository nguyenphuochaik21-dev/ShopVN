import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'product'

    if (!file) {
      return NextResponse.json({ message: 'Không có file' }, { status: 400 })
    }

    // Convert to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type

    // For production, you would upload to Cloudinary here
    // const cloudinaryUrl = await uploadToCloudinary(base64, mimeType)

    // For now, return a placeholder URL
    const dataUrl = `data:${mimeType};base64,${base64}`

    return NextResponse.json({
      url: dataUrl,
      publicId: `temp_${Date.now()}`,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi khi tải lên' },
      { status: 500 }
    )
  }
}
