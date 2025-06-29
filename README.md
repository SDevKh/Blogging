# BlogCraft - Next.js Blog Platform

A modern, production-ready blog platform built with Next.js, SQLite, and React Quill.

## Features

- **Rich Text Editor**: Advanced WYSIWYG editor with React Quill
- **SQLite Database**: Lightweight, file-based database with Drizzle ORM
- **SEO Optimized**: Dynamic meta tags and SEO-friendly URLs
- **Admin Dashboard**: Complete content management system
- **Responsive Design**: Beautiful design that works on all devices
- **Search Functionality**: Search through blog posts
- **Dynamic Routing**: URL-based routing with slugs

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Drizzle ORM
- **Editor**: React Quill
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blogcraft-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The SQLite database will be automatically created as `blog.db` in your project root when you first run the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── posts/         # Blog post endpoints
│   ├── admin/             # Admin dashboard
│   ├── post/[slug]/       # Dynamic post pages
│   └── globals.css        # Global styles
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── database.ts        # SQLite database connection
│   └── schema.ts          # Database schema
└── utils/                 # Helper functions
```

## API Endpoints

- `GET /api/posts` - Get all posts (with optional search)
- `POST /api/posts` - Create a new post
- `GET /api/posts/[id]` - Get a specific post
- `PUT /api/posts/[id]` - Update a post
- `DELETE /api/posts/[id]` - Delete a post
- `GET /api/posts/slug/[slug]` - Get post by slug
- `POST /api/posts/check-slug` - Check slug uniqueness

## Usage

### Creating Posts

1. Navigate to `/admin`
2. Click "New Post"
3. Fill in the title, excerpt, and content
4. The slug will be auto-generated from the title
5. Use the preview feature to see how your post will look
6. Save the post

### Viewing Posts

- Visit the homepage to see all posts
- Use the search bar to find specific posts
- Click on any post to view the full content
- Posts are accessible via `/post/[slug]`

## Database

This application uses SQLite with Drizzle ORM for data persistence. The database file (`blog.db`) is automatically created in your project root directory when you first run the application.

### Database Schema

The `posts` table includes:
- `id` - Auto-incrementing primary key
- `title` - Post title
- `slug` - URL-friendly slug (unique)
- `excerpt` - Short description
- `content` - Full post content (HTML)
- `published` - Publication status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app`
4. Deploy

The SQLite database will be created automatically on first run. Note that for production use with multiple instances, consider upgrading to a hosted database solution.

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS
- Google Cloud Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.