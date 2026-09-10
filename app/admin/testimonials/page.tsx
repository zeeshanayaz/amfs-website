'use client'

import { TestimonialsSection } from '../testimonials-section'
import { useAdmin } from '../admin-context'

export default function AdminTestimonialsPage() {
  const admin = useAdmin()
  return <TestimonialsSection testimonials={admin.testimonials} editingContent={admin.editingContent} testimonialForm={admin.testimonialForm} message={admin.message} onOpenEditor={admin.openTestimonialEditor} onCloseEditor={admin.closeContentEditor} onTestimonialFormChange={admin.setTestimonialForm} onSaveTestimonial={admin.saveTestimonial} onTogglePublish={(item) => admin.toggleContent('testimonials', item)} onRemove={(id) => admin.removeContent('testimonials', id)} />
}
