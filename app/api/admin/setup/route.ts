import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  // if (body?.email !== 'admin@amfs.edu.pk' || body?.password !== 'admin') {
  //   return NextResponse.json({ error: 'Invalid setup credentials' }, { status: 400 })
  // }
  const admin = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data: users } = await admin.auth.admin.listUsers({ perPage: 1000 })
  const existing = users?.users.find((user) => user.email === body.email)
  let userId = existing?.id
  if (!userId) {
    const { data, error } = await admin.auth.admin.createUser({ email: body.email, password: body.password, email_confirm: true })
    if (error || !data.user) return NextResponse.json({ error: 'Could not create admin account' }, { status: 500 })
    userId = data.user.id
  } else {
    await admin.auth.admin.updateUserById(userId, { password: body.password, email_confirm: true })
  }
  const { error } = await admin.from('admin_users').upsert({ id: userId, email: body.email, role: 'admin' })
  if (error) return NextResponse.json({ error: 'Could not authorize admin account' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
