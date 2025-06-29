import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogList from '../components/BlogList';
import { BlogPost } from '../types/blog';
import { loadPosts } from '../utils/blogUtils';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>BlogCraft - Modern Blog Platform</title>
        <meta name="description" content="A modern blog platform with rich content and beautiful design" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to <span className="text-blue-600">BlogCraft</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover amazing stories, insights, and knowledge from our community of writers
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="text-center text-gray-600">Loading posts...</div>
      ) : filteredPosts.length > 0 ? (
        <BlogList posts={filteredPosts} />
      ) : (
        <div className="text-center text-gray-600">
          No posts found matching your search.
        </div>
      )}
    </>
  );
};

export default Home;
