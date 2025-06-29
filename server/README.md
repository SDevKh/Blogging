# BlogCraft Backend

This is the backend service for BlogCraft to connect MongoDB and provide API endpoints.

## Setup

1. Install dependencies:
\`\`\`
npm install
\`\`\`

2. Create a \`.env\` file in the root of the server folder based on \`.env.example\` and add your MongoDB connection string.

3. Run the server in development mode:
\`\`\`
npm run dev
\`\`\`

4. The server will run on port 5000 by default. API endpoints:
- GET /api/blogs - Get all blog posts
- POST /api/blogs - Create a new blog post

## Notes

- Make sure MongoDB is accessible from your environment.
- Update the frontend to call these API endpoints to interact with the database.
