const express = require('express');
const morgan  = require('morgan');
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const app = express();
app.use(express.urlencoded({extended:true}))
const dbUrl = 'mongodb://localhost:27017/blog'
mongoose.connect(dbUrl , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(9000, () => console.log("Listening for port 6000")))
.catch(() => console.log("Database connection failed"))

//  Register view engine
app.set('view engine', 'ejs')
app.set('views', 'views')



//Middlewre & static file
app.use(morgan('dev'))
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})


// Blog routes 
app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})
