import { BlogPost } from '../types/blog';

// Simulated MongoDB operations using localStorage
const STORAGE_KEY = 'blogcraft_posts';

export const loadPosts = async (): Promise<BlogPost[]> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return sample data if no posts exist
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        title: 'Welcome to BlogCraft',
        excerpt: 'Discover the power of modern blogging with rich text editing, SEO optimization, and beautiful design.',
        content: `<h2>Welcome to BlogCraft</h2>
        
        <p>BlogCraft is a modern blogging platform that combines beautiful design with powerful functionality. Whether you're a seasoned writer or just starting out, BlogCraft provides all the tools you need to create compelling content.</p>
        
        <h3>Key Features</h3>
        
        <ul>
          <li><strong>Rich Text Editor:</strong> Create beautiful content with our advanced WYSIWYG editor</li>
          <li><strong>SEO Optimization:</strong> Automatic slug generation and meta tag management</li>
          <li><strong>Responsive Design:</strong> Your blog looks great on all devices</li>
          <li><strong>Admin Dashboard:</strong> Easy content management with full CRUD operations</li>
        </ul>
        
        <p>Get started by visiting the <strong>Admin</strong> section to create your first blog post!</p>`,
        slug: 'welcome-to-blogcraft',
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date('2024-01-15').toISOString(),
      },
      {
        id: '2',
        title: 'The Future of Web Development',
        excerpt: 'Exploring the latest trends and technologies that are shaping the future of web development.',
        content: `<h2>The Future of Web Development</h2>
        
        <p>Web development is evolving at an unprecedented pace. With new frameworks, tools, and methodologies emerging regularly, staying current has become both challenging and exciting.</p>
        
        <h3>Current Trends</h3>
        
        <p>Some of the most significant trends shaping web development today include:</p>
        
        <ul>
          <li><strong>React and Next.js:</strong> Component-based architecture continues to dominate</li>
          <li><strong>TypeScript:</strong> Type safety is becoming essential for large applications</li>
          <li><strong>Jamstack:</strong> Static site generation with dynamic capabilities</li>
          <li><strong>Serverless:</strong> Function-as-a-Service changing how we think about backend</li>
        </ul>
        
        <blockquote>
          <p>"The best way to predict the future is to create it." - Peter Drucker</p>
        </blockquote>
        
        <p>As we look ahead, the focus remains on developer experience, performance, and user satisfaction.</p>`,
        slug: 'future-of-web-development',
        createdAt: new Date('2024-01-10').toISOString(),
        updatedAt: new Date('2024-01-12').toISOString(),
      },
      {
        id: '3',
        title: 'Building Responsive Layouts',
        excerpt: 'Learn the principles and techniques for creating layouts that work beautifully across all devices.',
        content: `<h2>Building Responsive Layouts</h2>
        
        <p>Creating responsive layouts is fundamental to modern web development. With the variety of devices and screen sizes available today, ensuring your content looks great everywhere is crucial.</p>
        
        <h3>Core Principles</h3>
        
        <p>Responsive design is built on three core principles:</p>
        
        <ol>
          <li><strong>Flexible Grid Systems:</strong> Use relative units instead of fixed pixels</li>
          <li><strong>Flexible Images:</strong> Images that scale with their container</li>
          <li><strong>Media Queries:</strong> Different styles for different screen sizes</li>
        </ol>
        
        <h3>Modern CSS Tools</h3>
        
        <p>Today's CSS provides powerful tools for responsive design:</p>
        
        <ul>
          <li><strong>CSS Grid:</strong> Two-dimensional layout system</li>
          <li><strong>Flexbox:</strong> One-dimensional layout method</li>
          <li><strong>Container Queries:</strong> Style based on container size</li>
          <li><strong>Logical Properties:</strong> Writing-mode relative properties</li>
        </ul>
        
        <p>Master these tools, and you'll be able to create layouts that adapt beautifully to any context.</p>`,
        slug: 'building-responsive-layouts',
        createdAt: new Date('2024-01-05').toISOString(),
        updatedAt: new Date('2024-01-05').toISOString(),
      }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
    return samplePosts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

export const savePost = async (
  postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>,
  existingId?: string
): Promise<BlogPost> => {
  try {
    const posts = await loadPosts();
    const now = new Date().toISOString();
    
    if (existingId) {
      // Update existing post
      const index = posts.findIndex(p => p.id === existingId);
      if (index === -1) {
        throw new Error('Post not found');
      }
      
      const updatedPost: BlogPost = {
        ...posts[index],
        ...postData,
        updatedAt: now,
      };
      
      posts[index] = updatedPost;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return updatedPost;
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...postData,
        createdAt: now,
        updatedAt: now,
      };
      
      posts.unshift(newPost);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      return newPost;
    }
  } catch (error) {
    console.error('Error saving post:', error);
    throw error;
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const posts = await loadPosts();
    const filteredPosts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};