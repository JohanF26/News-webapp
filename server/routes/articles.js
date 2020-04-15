const express = require('express')
const router = express.Router()

const adminAuth = require('../middlewares/adminAuthorization')
const Article = require('../models/Article')

router.get('/', (req,res) => {
    Article.find()
        .then(articles => res.json(articles))
        .catch(err => res.status(400).json(err))
})

router.get('/:id', (req,res) => {
    const id = req.params.id

    Article.findById(id)
        .then(article => {
            if(article) {
                res.json(article)
            } else{
                res.status(404).json({
                    msg: 'News Article Not Found'
                })
            }
        })
        .catch(err => res.status(400).json(err))
})

router.post('/', adminAuth, (req,res) => {
    const { title, description, url, imageUrl, published } = req.body

    const article = new Article()
    article.title = title
    article.description = description
    article.url = url
    article.imageUrl = imageUrl
    article.published = new Date(published)

    article.save()
        .then(article => res.json(article))
        .catch(err => res.status(400).json(err))

})

router.delete('/:id', adminAuth, (req,res) => {
    const id = req.params.id

    Article.findByIdAndRemove(id)
        .then(article => res.json(article))
        .catch(err => res.json(400).json(err))
})

//update
router.put('/:id', adminAuth, (req,res) => {
    const id = req.params.id
    const { title, description, url, imageUrl } = req.body

    Article.findById(id)
        .then(article => {
            article.title = title
            article.description = description
            article.url = url
            article.imageUrl = imageUrl
            return article.save()
        })
        .then(updatedArticle => {
            res.json(updatedArticle)
        })
        .catch(err => res.status(400).json(err))
})

module.exports = router