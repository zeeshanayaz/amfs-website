'use client'

import { NewsSection } from '../news-section'
import { useAdmin } from '../admin-context'

export default function AdminNewsPage() {
  const admin = useAdmin()
  return <NewsSection newsEvents={admin.newsEvents} editingContent={admin.editingContent} newsForm={admin.newsForm} message={admin.message} onOpenEditor={admin.openNewsEditor} onCloseEditor={admin.closeContentEditor} onNewsFormChange={admin.setNewsForm} onSaveNews={admin.saveNews} onTogglePublish={(item) => admin.toggleContent('news_events', item)} onRemove={(id) => admin.removeContent('news_events', id)} />
}
