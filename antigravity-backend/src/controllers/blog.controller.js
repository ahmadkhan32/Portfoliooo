const asyncHandler = require('express-async-handler');
const Blog = require('../models/Blog');

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    res.json(blogs);
});

// @desc    Fetch all blogs (Admin)
// @route   GET /api/blogs/all
// @access  Private/Admin
const getAllBlogsAdmin = asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
});

// @desc    Fetch single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = asyncHandler(async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const blog = new Blog({
        ...req.body,
        author: req.user._id
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        Object.assign(blog, req.body);
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

module.exports = {
    getBlogs,
    getAllBlogsAdmin,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
};
