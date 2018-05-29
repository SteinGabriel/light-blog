const mongoose = require('mongoose')
const router = require('express').Router()
const Articles = mongoose.model('Articles')

// Post method called when a new article os added
router.post('/', (req, res, next) => {
  const { body } = req

  // Checks if there is no title
  // and sends a 422 status code
  // with a error message
  if (!body.title) {
    return res.status(422).json({
      erros: {
        title: 'is required'
      }
    })
  }

  // Checks if there is no author
  // and sends a 422 status code
  // with a error message
  if (!body.author) {
    return res.status(422).json({
      erros: {
        author: 'is required'
      }
    })
  }

  // Checks if there is no body
  // and sends a 422 status code
  // with a error message
  if (!body.body) {
    return res.status(422).json({
      erros: {
        body: 'is required'
      }
    })
  }

  // Creates an instance of the Article
  // with data coming from front end
  const finalArticle = new Articles(body)
  // Saves the new article into database
  return finalArticle
    .save()
    .then(() => res.json({ article: finalArticle.toJSON() }))
    .catch(next)
})

// Gets all articles
// sorting by the last created
// articles
router.get('/', (req, res, next) => {
  return Articles.find()
    .sort({ createdAt: 'descending' })
    .then(articles =>
      res.json({ articles: articles.map(article => article.toJSON()) })
    )
    .catch(next)
})

router.param('id', (req, res, next, id) => {
  console.log('Finding article ' + id)
  return Articles.findById(id, (err, article) => {
    console.log('Error getting article. ' + err)
    if (err) {
      return res.sendStatus(404)
    } else if (article) {
      req.article = article
      return next()
    }
  }).catch(next)
})

// Gets an article by its id
router.get('/:id', (req, res, next) => {
  return res.json({
    article: req.article.toJSON() // does it finds automatically?
  })
})

// Not sure but I think this is the method called
// when a user intends to update an article
router.patch('/:id', (req, res, next) => {
  const { body } = req

  if (typeof body.title !== 'undefined') {
    req.article.title = body.title
  }

  if (typeof body.author !== 'undefined') {
    req.article.author = body.author
  }

  if (typeof body.body !== 'undefined') {
    req.article.body = body.body
  }

  return req.article
    .save()
    .then(() => res.json({ articles: req.article.toJSON() }))
    .catch(next)
})

// Deletes an article by its id
router.delete('/:id', (req, res, next) => {
  console.log('Deleting article ' + req.article._id)
  return Articles.findByIdAndRemove(req.article._id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

// exports the router
module.exports = router
