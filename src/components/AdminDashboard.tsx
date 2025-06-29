import React from 'react';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface AdminDashboardProps {
  posts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  posts,
  onEdit,
  onDelete,
  loading
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-600">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">All Posts ({posts.length})</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created: {formatDate(post.createdAt)}</span>
                  </div>
                  {post.updatedAt !== post.createdAt && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Updated: {formatDate(post.updatedAt)}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    /{post.slug}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onEdit(post)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                  title="Edit post"
                >
                  <Edit className="h-5 w-5" />
                </button>
                
                <button
                  onClick={() => onDelete(post.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  title="Delete post"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
