const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String, required: true },
    published: { type: Date }
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article