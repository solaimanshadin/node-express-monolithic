const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose')
const Blog    = require('./models/blog')
// Express app 

const app = express();
app.use(express.urlencoded({extended:true}))
const dbUrl = 'mongodb://localhost:27017/blog'
mongoose.connect(dbUrl , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(9000, () => console.log("Listening for port 6000")))
.catch(() => console.log("Database connection failed"))

//  Register view engine
app.set('view engine', 'ejs')
// app.set('views', 'views')


// app.use((req, res, next) => {
//     console.log('New Request was made');
//     console.log('Host', req.hostname);
//     console.log('Path', req.path);
//     next();
// })


//Middlewre & static file
app.use(morgan('dev'))
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html' , {root: __dirname})
    Blog.find().sort({createdAt: -1})
    .then(result => res.render('index', { title: 'Home', blogs : result }))
    .catch(err => console.log(err))
    
})
// app.use((req, res, next) => {
//     console.log('In next middleware' );
//     next();
// })
app.get('/about', (req, res) => {
    // res.sendFile('./views/about.html' , {root: __dirname})
    res.render('about', { title: 'About' })
})

app.get('/new-blog', (req, res) => {
    res.render('create', { title: 'Create New Blog' })
})

app.get('/blog', (req, res) => {
    res.redirect('/')
})

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title : 'New Blog 2',
        snippet : 'About my new blog',
        body : 'more about my new blog'
    });
    blog.save()
    .then((result) => res.send(result))
    .catch(err => console.log(err))
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => res.send(result))
    .catch(err => console.log(err))
})
app.get('/single-blog', (req, res) => {
    Blog.findById('5f79d4fa87d70d336032f892')
    .then((result) => res.send(result))
    .catch(err => console.log(err))
})

// Blog

app.post('/blogs', (req, res) => {
    blog = new Blog(req.body)
    blog.save()
    .then(() => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blogData: result , title: "Details page"})
    })
    .catch(err => console.log(err))
})

app.delete('/blogs/:id' , (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
    .then(() => res.end())
    .catch(err => console.log(err))
})
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
