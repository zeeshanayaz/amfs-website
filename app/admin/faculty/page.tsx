'use client'

import { FacultySection } from '../faculty-section'
import { useAdmin } from '../admin-context'

export default function FacultyPage() {
  const admin = useAdmin()

  return (
    <FacultySection
      faculties={admin.faculties}
      campuses={admin.campuses}
      message={admin.message}
      showForm={admin.showFacultyForm}
      form={admin.facultyForm}
      editing={admin.editingFaculty}
      saving={admin.facultySaving}
      toast={admin.facultyToast}
      onOpenNew={admin.openNewFaculty}
      onEdit={admin.editFaculty}
      onRemove={admin.removeFaculty}
      onToggle={admin.toggleFaculty}
      onFormChange={admin.setFacultyForm}
      onImageFileChange={admin.setFacultyImageFile}
      onSave={admin.saveFaculty}
      onCloseForm={admin.closeFacultyForm}
    />
  )
}
