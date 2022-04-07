const express = require('express');

const app = express();

const videoRoute = require('./viedoRouter.js')

app.get('/', (req, res) => {
  // directory name plus filename
  res.sendFile(__dirname + "/index.html")
});

app.use('/video', videoRoute)


app.listen(3000, ()=> {
  console.log('App connected')
});