var config = require('./config');
var express = require('express');
var app = express();

app.use(express.static(__dirname +'./../')); //serves the index.html
app.listen(config.port); //listens on port 3000 -> http://localhost:3000/

console.log(`listening on port ${config.port}`)