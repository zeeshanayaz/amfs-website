'use client'

import { BriefcaseBusiness, Inbox, LayoutDashboard, LogOut, MessageSquareQuote, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAdmin } from './admin-context'

const navigation = [
  { href: '/admin/jobs', label: 'Career posts', icon: BriefcaseBusiness },
  { href: '/admin/news-events', label: 'News & Events', icon: Newspaper },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/contacts', label: 'Contact inbox', icon: Inbox },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { loading, signOut } = useAdmin()

  if (loading) return <main className="grid min-h-screen place-items-center bg-brand-off-white text-brand-navy"><p className="font-semibold">Loading workspace...</p></main>

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-brand-navy">
      <header className="sticky top-0 z-40 border-b border-brand-border bg-white/95 backdrop-blur">
        <div className="flex min-h-20 items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link href="/admin/jobs" className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand-navy text-brand-gold"><LayoutDashboard className="size-5" /></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">AMFS admin</p>
              <h1 className="font-serif text-lg font-bold sm:text-xl">School operations</h1>
            </div>
          </Link>
          <button type="button" onClick={signOut} className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-3 py-2 text-sm font-semibold hover:bg-brand-light sm:px-4">
            <LogOut className="size-4" /><span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-5 sm:px-6 lg:gap-8 lg:px-10 lg:py-8">
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav className="sticky top-28 rounded-2xl border border-brand-border bg-white p-3 shadow-sm">
            <p className="px-3 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-dark-gray">Workspace</p>
            <div className="space-y-1">
              {navigation.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href === '/admin/jobs' && pathname === '/admin')
                return <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? 'bg-brand-navy text-white shadow-sm' : 'text-brand-dark-gray hover:bg-brand-light hover:text-brand-navy'}`}><Icon className="size-4" />{label}</Link>
              })}
            </div>
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <nav aria-label="Admin sections" className="mb-5 flex gap-2 overflow-x-auto rounded-xl border border-brand-border bg-white p-2 lg:hidden">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href === '/admin/jobs' && pathname === '/admin')
              return <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${active ? 'bg-brand-navy text-white' : 'text-brand-dark-gray hover:bg-brand-light'}`}><Icon className="size-4" />{label}</Link>
            })}
          </nav>
          {children}
        </div>
      </div>
    </main>
  )
}
