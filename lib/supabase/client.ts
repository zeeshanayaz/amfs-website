import { createClient as createBrowserClient } from '@supabase/supabase-js'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export type JobPost = {
  id: string
  title: string
  department: string
  location: string
  employment_type: string
  description: string
  requirements: string[]
  campus_name: string
  address: string
  image_url: string | null
  expires_at: string | null
  is_active: boolean
}

export type JobApplication = {
  job_id: string
  full_name: string
  email: string
  phone: string
  cover_letter: string
  resume_url?: string | null
}

export async function submitJobApplication(application: JobApplication) {
  const supabase = createClient()
  return supabase.from('job_applications').insert(application)
}

export async function getActiveJobs() {
  const supabase = createClient()
  return supabase
    .from('job_posts')
    .select('id, title, department, location, employment_type, description, requirements, campus_name, address, image_url, expires_at, is_active')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
}

export async function getJobById(id: string) {
  const supabase = createClient()
  return supabase
    .from('job_posts')
    .select('id, title, department, location, employment_type, description, requirements, campus_name, address, image_url, expires_at, is_active')
    .eq('id', id)
    .eq('is_active', true)
    .maybeSingle()
}

export function isSupabaseConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
}

export function isValidApplication(application: JobApplication) {
  return application.full_name.trim().length >= 2 &&
    application.email.trim().length >= 5 &&
    application.phone.trim().length >= 5 &&
    application.cover_letter.trim().length >= 20
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
