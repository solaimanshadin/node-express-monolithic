const Blog    = require('../models/blog')

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('blogs/index', { title: 'Home', blogs : result }))
    .catch(err => res.status(404).redirect('/views/404'))
}

const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create New Blog' })
}

const blog_create_post = (req, res) => {
    blog = new Blog(req.body)
    blog.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => res.status(404).redirect('/views/404')
    )
}
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('blogs/details', { blogData: result , title: "Details page"})
    })
    .catch(err =>res.status(404).redirect('/views/404'))
}

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(() => res.end())
    .catch(err => res.status(404).redirect('/views/404'))
}

module.exports = {
    blog_index ,
    blog_details,
    blog_delete,
    blog_create_post,
    blog_create_get
}