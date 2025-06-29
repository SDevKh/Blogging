import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminDashboard from '../components/AdminDashboard';
import BlogEditor from '../components/BlogEditor';
// Update the path below to where BlogPost is actually defined, e.g.:
import type { BlogPost } from '../types/blog'; // Adjust the path as needed
import { loadPosts, savePost, deletePost } from '../utils/blogUtils';
import { Plus } from 'lucide-react';

const Admin: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await loadPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSavePost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const savedPost = await savePost(post, editingPost?.id);
      
      if (editingPost) {
        setPosts(posts.map(p => p.id === savedPost.id ? savedPost : p));
      } else {
        setPosts([savedPost, ...posts]);
      }
      
      setShowEditor(false);
      setEditingPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingPost(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Admin Dashboard - BlogCraft</title>
        <meta name="description" content="Manage your blog posts and content" />
      </Helmet>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your blog posts and content</p>
          </div>
          
          {!showEditor && (
            <button
              onClick={handleNewPost}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <Plus className="h-5 w-5" />
              <span>New Post</span>
            </button>
          )}
        </div>
      </div>

      {showEditor ? (
        <BlogEditor
          post={editingPost}
          onSave={handleSavePost}
          onCancel={handleCancelEdit}
        />
      ) : (
        <AdminDashboard
          posts={posts}
          onEdit={handleEditPost}
          onDelete={handleDeletePost}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Admin;
