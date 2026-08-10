'use client'

export type Job = {
  id: string
  title: string
  description: string
  department: string
  employment_type: string
  campus_name: string
  location: string
  address: string
  image_url: string | null
  expires_at: string | null
  is_active: boolean
}

export type NewsEvent = {
  id: string
  title: string
  category: string
  excerpt: string
  body: string
  image_url: string | null
  event_date: string | null
  is_published: boolean
}

export type Testimonial = {
  id: string
  parent_name: string
  student_name: string
  thoughts: string
  display_order: number
  is_published: boolean
}

export type ContactSubmission = {
  id: string
  full_name: string
  email: string
  phone: string | null
  subject: string
  message: string
  is_read: boolean
  created_at: string
}

export type FormState = Omit<Job, 'id'>
export type NewsFormState = Omit<NewsEvent, 'id' | 'is_published'>
export type TestimonialFormState = Omit<Testimonial, 'id' | 'is_published'>

export const emptyForm: FormState = {
  title: '',
  description: '',
  department: 'Teaching',
  employment_type: 'Full-time',
  campus_name: 'Main Campus',
  location: 'Karachi, Pakistan',
  address: 'Karachi, Pakistan',
  image_url: '',
  expires_at: '',
  is_active: true,
}
