const express = require('express');
const path = require('path')
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')

const app = express();

const videoRoute = require('./viedoRouter.js');
const paypalRoute = require('./paypal.js');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// set templating Engine
app.use(expressLayouts);
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  // directory name plus filename
  res.render("index")
});

app.use('/video', videoRoute)
app.use('/pay', paypalRoute)


app.listen(3000, ()=> {
  console.log('App connected')
});