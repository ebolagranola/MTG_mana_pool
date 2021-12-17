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

server.listen(port, () => {
  logger.info('Server running at localhost:' + port);
});

let reel = [];
fs.readFile('server/storage/imgs.json', function (err, data) {
  if (err) throw err;
  if (data.length > 0) {
    reel = JSON.parse(data).imgs;
  } else {
    reel = [];
  }
});

let clients = [];
io.on('connection', (socket) => {
  clients.push(socket.id);
  logger.debug("connected\t: ", socket.id);
  logger.debug("count\t\t: ", clients.length);
  logger.debug("clts\t\t: ", "[ " + clients.join(', ') + " ]");
  logger.info("sending\t: ", reel.length+" imgs");
  socket.emit('dataURL', reel);

  socket.on('dataURL', (dataURL) => {
    console.log("help");
    reel.unshift(dataURL);
    while (reel.length > 5) { console.log('popping'); reel.pop(); }
    socket.emit('dataURL', reel);
    let imgsJSON = {
      "imgs": reel
    }
    fs.writeFile('server/storage/imgs.json', JSON.stringify(imgsJSON), (err) => {
      if (err) throw err;
      logger.warn("server\t\t", "JSON data saved");
    });
    // logger.debug("imageURL\t:", "[ " + reel.join(', ') + " ]");
  });

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket.id), 1);
    logger.warn("disconnected\t: ", socket.id);
    logger.debug("count\t\t: ", clients.length);
    logger.debug("clts\t\t: ", "[ " + clients.join(', ') + " ]");
  });
});

async function fetchSockets() {
  const connectedSockets = await io.fetchSockets();
  logger.info("Active Sockets: ", connectedSockets);
}
