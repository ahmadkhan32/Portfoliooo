const express = require('express');
const router = express.Router();
const {
    getBlogs,
    getAllBlogsAdmin,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../controllers/blog.controller');
const { protect, admin } = require('../middlewares/auth.middleware');

router.route('/')
    .get(getBlogs)
    .post(protect, admin, createBlog);

router.get('/all', protect, admin, getAllBlogsAdmin);
router.get('/:slug', getBlogBySlug);

router.route('/:id')
    .put(protect, admin, updateBlog)
    .delete(protect, admin, deleteBlog);

module.exports = router;
