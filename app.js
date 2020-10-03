const express = require('express');
const morgan  = require('morgan');
// Express app 

const app = express();

//  Register view engine
app.set('view engine', 'ejs')
// app.set('views', 'views')

app.listen(9000, () => console.log("Listening for port 6000"))
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
    const blogs = [
        { title: 'What a nice article', snippet: 'lorem impusm doller sit' },
        { title: 'What a Interesting article', snippet: 'lorem impusm doller sit' },
        { title: 'What a Awsome article', snippet: 'lorem impusm doller sit' },
    ]
    res.render('index', { title: 'Home', blogs })
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

app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})