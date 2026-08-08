'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    let { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      await fetch('/api/admin/setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const retry = await supabase.auth.signInWithPassword({ email, password })
      data = retry.data
      signInError = retry.error
    }
    if (signInError || !data.user) {
      setError('Invalid admin email or password.')
      setLoading(false)
      return
    }
    const { data: admin, error: adminError } = await supabase.from('admin_users').select('id').eq('id', data.user.id).maybeSingle()
    if (adminError || !admin) {
      await supabase.auth.signOut()
      setError('This account is not authorized for the admin panel.')
      setLoading(false)
      return
    }
    router.replace('/admin')
  }

  return (
    <main className="min-h-screen bg-brand-navy px-6 py-12 text-primary-foreground sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">
        <div className="w-full rounded-[2rem] bg-background p-7 text-brand-navy shadow-2xl sm:p-10">
          <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-brand-light text-brand-royal"><LockKeyhole className="size-6" /></div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-orange">AMFS administration</p>
          <h1 className="mt-3 font-serif text-4xl font-bold">Welcome back.</h1>
          <p className="mt-3 text-sm leading-6 text-brand-dark-gray">Sign in to manage careers and school opportunities.</p>
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">Email<input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            <label className="grid gap-2 text-sm font-semibold">Password<input required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label>
            {error && <p role="alert" className="text-sm font-medium text-destructive">{error}</p>}
            <button disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-5 py-3.5 text-sm font-bold text-primary-foreground transition hover:bg-brand-royal disabled:opacity-60">{loading ? 'Signing in…' : 'Sign in to dashboard'} <ArrowRight className="size-4" /></button>
          </form>
        </div>
      </div>
    </main>
  )
}
