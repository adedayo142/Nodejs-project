const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
})

const Post =mongoose.model("post", postSchema)

module.exports = Post