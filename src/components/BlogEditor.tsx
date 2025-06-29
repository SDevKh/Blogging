import React, { useState, useEffect, Suspense } from 'react';
import { generateSlug, ensureUniqueSlug } from '../utils/slugify';
import { Save, X, Eye } from 'lucide-react';
import { BlogPost } from '../types/blog';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = React.lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

interface BlogEditorProps {
  post?: BlogPost | null;
  onSave: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (title && !post) {
      setSlug(generateSlug(title));
    }
  }, [title, post]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'list', 'bullet', 'indent',
    'blockquote', 'code-block', 'link', 'image', 'align'
  ];

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    setSaving(true);
    
    try {
      const finalSlug = slug.trim() || generateSlug(title);
      const uniqueSlug = await ensureUniqueSlug(finalSlug, post?.id);
      
      onSave({
        title: title.trim(),
        excerpt: excerpt.trim() || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        content: content.trim(),
        slug: uniqueSlug,
      });
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Eye className="h-4 w-4" />
            <span>{showPreview ? 'Editor' : 'Preview'}</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
          
          <button
            onClick={onCancel}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {!showPreview ? (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter post title..."
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="url-friendly-slug"
              />
              <p className="text-sm text-gray-500 mt-1">
                URL: /post/{slug || 'your-slug'}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt (Optional)
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Brief description of your post..."
              />
              <p className="text-sm text-gray-500 mt-1">
                If left empty, it will be auto-generated from the content.
              </p>
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <Suspense fallback={<div className="p-4 text-center text-gray-500">Loading editor...</div>}>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    style={{ minHeight: '300px' }}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {title || 'Untitled Post'}
              </h1>
              
              {excerpt && (
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {excerpt}
                </p>
              )}
              
              <div className="text-sm text-gray-500">
                <span>URL: /post/{slug || 'your-slug'}</span>
              </div>
            </header>

            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: content || '<p>No content yet...</p>' }}
              />
            </article>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
