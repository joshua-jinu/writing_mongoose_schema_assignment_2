const Blog = require("blog.model.js")
const mongoose = require("mongoose");

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({});
    res.status(200).send(blogs);
}

const postBlog = async ( req, res)=> {
    const blogbody = req.body;

    if (!blogbody.content) {
        return res.status(400).json({ error: 'Blog content is required' });
    }

    if (Blog.findOne({title: blogbody.title})) {
        return res.status(400).json({ error: 'Blog with this title already exists.' });
    }

    const newBlog = await Blog.create(blogbody);
    newBlog.save();

    res.status(201).json(newBlog);
}

const deleteBlog = async (req, res)=>{
    const blogPresent = Blog.findById(req.params.id);
    
    if (blogPresent) {
        return res.status(404).json({ error: 'Blog not found.' });
    }
    
    try{
        await Blog.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: `Book ${req.params.id} successfully.` });
    }catch(err){
        res.status(500).json({ message: err.message });
        
    }
}

const putBlog = async (req, res)=>{
    const blogPresent = Blog.findById(req.params.id);
    const updateBody = req.body;
    
    if (blogPresent) {
        return res.status(404).json({ error: 'Blog not found.' });
    }
    
    
    try{
        await Blog.findByIdAndUpdate({updateBody});
        
        res.status(200).json({messgae: "Blog updated"});
    }catch(err){
        res.status(500).json({ message: err.message });
        
    }
}

module.exports = {getBlogs, postBlog, deleteBlog, putBlog}