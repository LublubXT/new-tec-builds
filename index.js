const express = require('express');
const app = express();
const jsonfile = require('jsonfile')

const file = "./public/data.json"

const style = './public/style.css'

var authorized = false;

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));


let ts = Date.now();

let date_ob = new Date(ts);
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

app.use(express.static(__dirname + '/public'));

const post = [
    { title: '-New Project!-', main: 'Project Wafnet. What is this? Why this?', footer: 'Wafnet  |  11/22/2021', author: 'Caleb J. Gross', link: "blog-post1" },
]

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('default');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/blog', (req, res) => {
    res.render('blog', { posts: post });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/top-secret-login', (req, res) => {
    res.render('topsecret-login');
});

app.get('/blog-post1', (req, res) => {
    res.render('../posts/post1.pug');
});

app.get('/top-secret', (req, res) => {
    if (authorized == true) {
        res.render('top-secret');
    } else {
        res.redirect('/')
    }
});

app.post('/top-secret', (req, res) => {
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const message = req.body.message;

    jsonfile.readFile(file, function(err, obj) {
        if (err) console.error(err)
        if (email == obj.login.email && first_name == obj.login.firstName && last_name == obj.login.lastName && message == obj.login.message) {
            authorized = true;
            res.redirect('/top-secret')
        } else {
            res.redirect('/')
        }

    })
});

app.post('/contact', (req, res) => {
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const message = req.body.message;

    var data = {
        firstName: first_name,
        lastName: last_name,
        email: email,
        message: message
    }

    res.redirect('/contact')
});


const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});