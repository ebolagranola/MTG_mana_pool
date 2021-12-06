const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + file);
});

// var files = fs.readdirSync('./public/views/');
// files.forEach(function(file) {
//     if (file == "index.html") {
//         app.get('/', function(req, res) {
//             res.sendFile(file, {root: './views/'});
//         });
//     } else {
//         app.get('/' + file.replace(".html", ""), function(req, res) {
//             res.sendFile(file, {root: './views/' });
//         });
//     }
// });

app.listen(port);
console.log('Server running at localhost:' + port);