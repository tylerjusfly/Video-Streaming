const express = require("express");
const router = express.Router();
const fs = require('fs')

router.get('/', (req, res) =>{
  // tells the client what part of the video you want to send back.
  const range = req.headers.range;
  if( !range){
    res.status(400).send("Requires Range header");
  }

  // getting Video path and size
  const videoPath = "intger_multiply.mp4"
  const videoSize = fs.statSync(videoPath).size

  /*parsing range
    *setting Chunk size
    *the number of rows read at a time
    * 10 raised to power of 6 = 1mb
  */
  const CHUNKSIZE = 10 ** 6; 
  // parsing and converting starting byte
  const start = Number(range.replace(/\D/g, ""));

  // calculating last byte by checking video length
  const end = Math.min(start + CHUNKSIZE, videoSize - 1);
  const contentLength = end - start + 1

  // set Header
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges" : "bytes",
    "Content-Length" : contentLength,
    "Content-Type" : "video/mp4",

  };
  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create a readStream
  const videoStream = fs.createReadStream( videoPath, { start, end });
  // pipe to response 
  videoStream.pipe(res);



});


module.exports = router;