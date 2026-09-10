'use client'

import { JobsSection } from '../jobs-section'
import { useAdmin } from '../admin-context'

export default function AdminJobsPage() {
  const admin = useAdmin()
  return <JobsSection jobs={admin.jobs} message={admin.message} showForm={admin.showJobForm} form={admin.jobForm} editing={admin.editingJob} jobSaving={admin.jobSaving} jobToast={admin.jobToast} onOpenNew={admin.openNewJob} onEdit={admin.editJob} onRemove={admin.removeJob} onToggle={admin.toggleJob} onFetchApplications={admin.fetchJobApplications} onFormChange={admin.setJobForm} onImageFileChange={admin.setJobImageFile} onSave={admin.saveJob} onCloseForm={admin.closeJobForm} />
}
