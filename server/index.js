const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const path = require('path');
const logger = require("./utils/logger").Logger;
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../client/public')));

const files = fs.readdirSync('./client/public/views/');
files.forEach(function(file) {
    if (file == "index.html") {
        app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, "../client/public/views/" + file));
        });
    } else {
        app.get('/' + file.replace(".html", ""), function(req, res) {
            res.sendFile(path.join(__dirname, "../client/public/views/" + file));
        });
    }
});

app.listen(port);
console.log('Server running at localhost:' + port);
