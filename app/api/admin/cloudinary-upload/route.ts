import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const authorization = request.headers.get('authorization')
  const accessToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : ''
  if (!accessToken) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { data: { user } } = await supabase.auth.getUser(accessToken)
  if (!user) return NextResponse.json({ error: 'Your admin session has expired.' }, { status: 401 })

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) return NextResponse.json({ error: 'Supabase server authentication is not configured.' }, { status: 500 })
  const adminClient = createClient(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey)
  const { data: admin } = await adminClient.from('admin_users').select('id').eq('id', user.id).maybeSingle()
  if (!admin) return NextResponse.json({ error: 'Admin access required.' }, { status: 403 })

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: 'Cloudinary is not configured on the server.' }, { status: 500 })

  const body = await request.formData()
  const file = body.get('file')
  const requestedFolder = body.get('folder')
  const folder = requestedFolder === 'faculty' ? 'faculty' : 'careers'
  if (!(file instanceof File) || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'A valid image file is required.' }, { status: 400 })
  }
  if (file.size > 200 * 1024) return NextResponse.json({ error: 'The compressed image must be 200 KB or smaller.' }, { status: 400 })

  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex')
  const uploadBody = new FormData()
  uploadBody.append('file', file)
  uploadBody.append('api_key', apiKey)
  uploadBody.append('timestamp', timestamp)
  uploadBody.append('folder', folder)
  uploadBody.append('signature', signature)

  const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: uploadBody,
  })
  const uploadResult = await uploadResponse.json() as { secure_url?: string }
  if (!uploadResponse.ok || !uploadResult.secure_url) {
    return NextResponse.json({ error: 'Cloudinary rejected the image upload.' }, { status: 502 })
  }

  return NextResponse.json({ secureUrl: uploadResult.secure_url })
}