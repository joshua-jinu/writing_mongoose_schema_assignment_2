const mongoose = require('mongoose');

const commentSchema =  new mongoose.Schema({
    username: String,
    message: {
        type: String,
        required: true
    },
    commentedAt: {
        type: Date,
        default: ()=>Date.now(),
    }
})

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minLength: 5
    },
    content: {
        type: String,
        required: true,
        minLength: 50
    },
    author: String,
    tags: [String],
    category: {
        type: String,
        default: "General"
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    comments: [commentSchema]
})

blogSchema.pre("save", function(next){
    this.updatedAt = Date.now();
    next();
})

module.exports = mongoose.model("Blog", blogSchema)