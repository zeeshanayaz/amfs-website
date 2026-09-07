'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, GraduationCap } from 'lucide-react'
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
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

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
    <main className="flex min-h-screen bg-[#edf4fb] text-brand-navy">
      <section className="hidden w-1/2 flex-col justify-center bg-[#eaf3fb] p-12 lg:flex">
        <div className="max-w-xl">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-royal text-white shadow-xl shadow-brand-royal/20">
            <GraduationCap className="h-8 w-8" aria-hidden="true" />
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.04em] text-brand-navy xl:text-[3.2rem]">
            Al Musleh Foundation School
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-brand-dark-gray">
            Welcome to the admin portal of AMFS Website. Please log in to access your administrative workspace.
          </p>
        </div>
      </section>

      <section className="flex w-full items-center justify-center bg-white px-6 py-12 sm:px-10 lg:w-1/2 lg:px-20">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-royal text-white shadow-md shadow-brand-royal/20">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-brand-navy">AMFS</span>
            </div>
          </div>

          <h2 className="mb-2 text-4xl font-bold tracking-[-0.04em] text-brand-navy">Welcome back</h2>
          <p className="mb-8 text-sm text-brand-dark-gray">Enter your credentials to access your account.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-brand-navy">Email Address</label>
              <input
                id="email"
                name="email"
                required
                type="email"
                placeholder="admin@amfs.edu"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#dfe7f2] bg-[#f8fafc] px-4 py-3 text-sm text-brand-navy placeholder:text-brand-dark-gray/60 transition focus:border-brand-royal focus:outline-none focus:ring-2 focus:ring-brand-sky/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-brand-navy">Password</label>
              <input
                id="password"
                name="password"
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#dfe7f2] bg-[#f8fafc] px-4 py-3 text-sm text-brand-navy placeholder:text-brand-dark-gray/60 transition focus:border-brand-royal focus:outline-none focus:ring-2 focus:ring-brand-sky/30"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-royal text-sm font-bold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
              {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
