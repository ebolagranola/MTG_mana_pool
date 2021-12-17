const fs = require("fs");
const Logger = (exports.Logger = {});

const infoStream = fs.createWriteStream("server/logs/info.txt");
const debugStream = fs.createWriteStream("server/logs/debug.txt");
const warnStream = fs.createWriteStream("server/logs/error.txt");

function currTime() {
  let d = new Date();
  let dm = d.getMonth()+"/"+d.getDate()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+(d.getSeconds().toString().length==1?"0"+d.getSeconds():d.getSeconds())+":>  ";
  return dm;
}

let runINFO = false;
let runWARN = false;
let runDEBUG = false;

Logger.info = function(header, msg) {
  if (runINFO) {
    console.log(currTime(), "\x1b[36mINFO\x1b[0m  : ", header, "\x1b[36m"+msg+"\x1b[0m");
    const message = currTime() + msg + "\n";
    infoStream.write(message);
  }
};

Logger.debug = function(header, msg) {
  if (runDEBUG) {
    console.log(currTime(), "\x1b[35mDEBUG\x1b[0m : ", header, "\x1b[35m"+msg+"\x1b[0m");
    const message = currTime() + msg + "\n";
    debugStream.write(message);
  }
};

Logger.warn = function(header, msg) {
  if (runWARN) {
    console.log(currTime(), "\x1b[33mWARN\x1b[0m  : ", header, "\x1b[33m"+msg+"\x1b[0m");
    const message = currTime() + msg + "\n";
    warnStream.write(message);
  }
};
