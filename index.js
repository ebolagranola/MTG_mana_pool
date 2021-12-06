const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '/public/')))

var files = fs.readdirSync('./public/views/');
files.forEach(function(file) {
    if (file == "index.html") {
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, '/public/views/' + file));
        });
    } else {
        app.get('/' + file.replace(".html", ""), function(req, res) {
            res.sendFile(path.join(__dirname, '/public/views/' + file));
        });
    }
});

app.listen(port);
console.log('Server started at http://localhost:' + port);