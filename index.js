const express = require('express');
const path = require('path')

const app = express();

const videoRoute = require('./viedoRouter.js');
const paypalRoute = require('./paypal.js');

// app.use(express.static(path.join(__dirname + 'css')));

app.get('/', (req, res) => {
  // directory name plus filename
  res.sendFile(__dirname + "/index.html")
});

app.use('/video', videoRoute)
app.use('/pay', paypalRoute)


app.listen(3000, ()=> {
  console.log('App connected')
});