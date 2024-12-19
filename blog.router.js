const express = require('express');
const { getBlogs, postBlog, deleteBlog, putBlog } = require('./blog.controller');

const router = express.Router()

router.get('/', getBlogs);
router.post('/', postBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', putBlog);

module.exports = router;