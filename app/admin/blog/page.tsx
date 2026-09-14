'use client'

import { BlogSection } from '../blog-section'
import { useAdmin } from '../admin-context'

export default function AdminBlogPage() {
  const admin = useAdmin()
  return <BlogSection categories={admin.blogCategories} posts={admin.blogPosts} message={admin.message} editingCategory={admin.editingBlogCategory} categoryForm={admin.blogCategoryForm} editingPost={admin.editingBlogPost} postForm={admin.blogPostForm} imageFile={admin.blogImageFile} saving={admin.blogSaving} onOpenCategory={admin.openBlogCategory} onEditCategory={admin.editBlogCategory} onCloseCategory={admin.closeBlogCategory} onCategoryChange={admin.setBlogCategoryForm} onSaveCategory={admin.saveBlogCategory} onRemoveCategory={admin.removeBlogCategory} onToggleCategory={admin.toggleBlogCategory} onOpenPost={admin.openBlogPost} onEditPost={admin.editBlogPost} onClosePost={admin.closeBlogPost} onPostChange={admin.setBlogPostForm} onImageChange={admin.setBlogImageFile} onSavePost={admin.saveBlogPost} onRemovePost={admin.removeBlogPost} onTogglePost={admin.toggleBlogPost} />
}