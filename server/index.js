<<<<<<< HEAD
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Sample schema and model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Sample API endpoint to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sample API endpoint to create a blog
app.post('/api/blogs', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Sample schema and model
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model('Blog', blogSchema);

// Sample API endpoint to get all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Sample API endpoint to create a blog
app.post('/api/blogs', async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> 28ec4fe (Commit)
