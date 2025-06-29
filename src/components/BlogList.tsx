import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
        <p className="text-gray-500">Create your first blog post to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.id}
          to={`/post/${post.slug}`}
          className="group flex flex-col h-full"
        >
          <article className="flex flex-col flex-grow bg-white rounded-lg border border-gray-100 p-6 hover:border-blue-100 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4" />
                <span>{estimateReadTime(post.content)} min read</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {post.title}
            </h2>

            <p className="text-gray-600 mb-4 flex-grow line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
              Read more
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;