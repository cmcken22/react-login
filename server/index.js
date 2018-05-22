var config = require('./config');
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + './../')); //serves the index.html
app.get('/*', function(req, res) { 
  const pathToIndex = path.resolve(__dirname + './../index.html'); 
  res.sendFile(pathToIndex, function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(config.port); //listens on port 3000 -> http://localhost:3000/

console.log(`listening on port ${config.port}`)