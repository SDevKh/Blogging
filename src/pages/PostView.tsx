import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../types/blog';
import { loadPosts } from '../utils/blogUtils';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PostView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const posts = await loadPosts();
        const foundPost = posts.find(p => p.slug === slug);
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error loading post:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{post.title} - BlogCraft</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.createdAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
      </Helmet>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Blog</span>
      </Link>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{estimatedReadTime} min read</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Read More Articles</span>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PostView;