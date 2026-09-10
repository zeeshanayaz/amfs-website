'use client'

import { JobsSection } from './jobs-section'
import { useAdmin } from './admin-context'

export default function AdminPage() {
  const admin = useAdmin()

  return (
    <JobsSection
      jobs={admin.jobs}
      message={admin.message}
      showForm={admin.showJobForm}
      form={admin.jobForm}
      editing={admin.editingJob}
      onOpenNew={admin.openNewJob}
      onEdit={admin.editJob}
      onRemove={admin.removeJob}
      onToggle={admin.toggleJob}
      onFormChange={admin.setJobForm}
      onSave={admin.saveJob}
      onCloseForm={admin.closeJobForm}
    />
  )
}
