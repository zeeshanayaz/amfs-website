'use client'

import { FormEvent, useState } from 'react'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function ContactPage() {
    const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus('sending')
        setMessage('')
        const supabase = createClient()
        const result = await supabase.from('contact_submissions').insert([form])
        if (result.error) {
            setStatus('error')
            setMessage(result.error.message || 'We could not send your message. Please check your details and try again.')
            console.error('Contact submission error:', result.error)
            return
        }
        setForm({ full_name: '', email: '', phone: '', subject: '', message: '' })
        setStatus('success')
        setMessage('Thank you. Our school team will be in touch soon.')
    }

    return (
        <>
            <Navbar />
            <main className="bg-brand-off-white text-brand-navy"><section className="bg-brand-navy px-6 py-20 text-primary-foreground sm:px-10"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-gold">Connect with AMFS</p><h1 className="mt-5 max-w-3xl font-serif text-5xl font-bold leading-tight sm:text-6xl">We’re here to help.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-brand-off-white/80">Have a question about admissions, school life, or our programs? Send us a message and our team will respond.</p></div></section><section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[0.75fr_1.25fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Contact details</p><h2 className="mt-3 font-serif text-3xl font-bold">Visit or speak with us</h2><div className="mt-8 grid gap-5"><div className="flex gap-4"><MapPin className="mt-1 size-5 text-brand-royal" /><div><p className="font-bold">Head Campus</p><p className="mt-1 text-sm leading-6 text-brand-dark-gray">MR1/38, Suleman Street<br />Mithadar, Karachi</p></div></div><div className="flex gap-4"><Phone className="mt-1 size-5 text-brand-royal" /><div><p className="font-bold">Phone</p><a className="mt-1 block text-sm text-brand-dark-gray hover:text-brand-royal" href="tel:+922132410539">(+92) 21 324 10539</a></div></div><div className="flex gap-4"><Mail className="mt-1 size-5 text-brand-royal" /><div><p className="font-bold">Email</p><a className="mt-1 block text-sm text-brand-dark-gray hover:text-brand-royal" href="mailto:almusleh.foundation@gmail.com">almusleh.foundation@gmail.com</a></div></div></div></div><form onSubmit={submit} className="rounded-3xl border border-brand-border bg-background p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-semibold">Full name<input required minLength={2} maxLength={120} value={form.full_name} placeholder='Name' onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label><label className="grid gap-2 text-sm font-semibold">Email<input required type="email" maxLength={254} value={form.email} placeholder='Email' onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label><label className="grid gap-2 text-sm font-semibold">Phone <span className="font-normal text-brand-dark-gray">(optional)</span><input value={form.phone} maxLength={40} placeholder='Phone' onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label><label className="grid gap-2 text-sm font-semibold">Subject<input required minLength={2} maxLength={160} value={form.subject} placeholder='Admission Inquiry' onChange={(e) => setForm({ ...form, subject: e.target.value })} className="rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal outline-none focus:border-brand-royal" /></label><label className="grid gap-2 text-sm font-semibold sm:col-span-2">Message<textarea required minLength={10} maxLength={5000} rows={6} placeholder='Message' value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="resize-y rounded-xl border border-brand-border bg-brand-off-white px-4 py-3 font-normal leading-6 outline-none focus:border-brand-royal" /></label></div>{message && <p role={status === 'error' ? 'alert' : 'status'} className={`mt-5 rounded-xl p-3 text-sm ${status === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-brand-light text-brand-royal'}`}>{message}</p>}<button disabled={status === 'sending'} className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-bold text-primary-foreground transition hover:bg-brand-royal disabled:cursor-not-allowed disabled:opacity-60">{status === 'sending' ? 'Sending…' : 'Send message'}<Send className="size-4" /></button></form></section></main>
            <Footer />
        </>
    )
}