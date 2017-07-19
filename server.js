const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} : ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '/n' , (err) => {
        if(err){
        console.log('unable to append to server.log');
        }
    });
    next();
})

// Maintenance mode 
// app.use((req,res,next) =>{
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
        return new Date().getFullYear();
});

hbs.registerHelper('upperCaseIt', (words) => {
    return words.toUpperCase();
})
//.get (first argument determines the page root, and enables you to create subpages sug as /about)
//second argument is a function, it determines what to send back when getting a request from user. (req = info about request, res = response that determins what to send back to user )

app.get('/', (req, res) =>{
    res.render('home.hbs',{
         pageTitle : 'Home page',
        welcomeMessage : "HELLOW USER! WELCOME TO MY WEBZAAIT"
    })
});

app.get('/about', (req,res) =>{
    res.render('about.hbs', {
        pageTitle : 'about page',
        welcomeMessage : "HELLOW USER! WELCOME TO MY WEBZAAIT"
    });
});

app.get('/error',(req,res) =>{
    res.send({error:"DE PAGINA DOET HET NEIT JONGEN!",
         errorMessage:"something is going wruung"});

});

//determine the port 
app.listen((port),() => {
console.log(`server is up on ${port}`)});