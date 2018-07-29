const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const favicon = require('serve-favicon');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(favicon('./favicon.ico'));


//middleware
app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log+'\n');
    next();
})

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
*/
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());



app.get('/', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.render('home.hbs',{
        pageTitle: 'My Home Page',
        welcomeMessage: 'Welcome to My Page'
    });
});

app.get('/about', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.render('about.hbs',{
        pageTitle:'About My Page'
    });
});

app.get('/bad', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.send({
        title: 'Bad page',
        status: 403,
        contact: 'Administrator'
    });
});


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});