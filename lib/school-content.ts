import { createClient } from '@/lib/supabase/client'

export type NewsEvent = {
  id: string
  title: string
  slug: string | null
  category: string
  excerpt: string
  body: string
  image_url: string | null
  event_date: string | null
  is_published: boolean
  created_at: string
}

export type Testimonial = {
  id: string
  parent_name: string
  student_name: string
  thoughts: string
  display_order: number
  is_published: boolean
  created_at: string
}

export async function getPublishedNewsEvents() {
  const supabase = createClient()
  return supabase.from('news_events').select('*').eq('is_published', true).order('event_date', { ascending: false, nullsFirst: false }).order('created_at', { ascending: false })
}

export async function getPublishedTestimonials() {
  const supabase = createClient()
  return supabase.from('testimonials').select('*').eq('is_published', true).order('display_order', { ascending: true }).order('created_at', { ascending: false })
}