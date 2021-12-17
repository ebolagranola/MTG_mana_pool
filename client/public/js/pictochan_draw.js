import Canvas from "./classes/PictoCanvas.js";

function init() {
  let canvas = document.getElementById("canvas_input");
  let c = new Canvas(canvas);

  let mouseBrush = document.getElementById("mouseBrush");
  let mousePointer = document.getElementById("mousePointer");

  document.onmousemove = function(e) {
    let offset = mouseBrush.offsetWidth/2
    mouseBrush.style.left = e.pageX-offset + "px";
    mouseBrush.style.top = e.pageY-offset + "px";
  }

  let whiteEl = document.getElementById("whiteEl");
  let blackEl = document.getElementById("blackEl");

  const setWhite = evt => {
    evt.preventDefault();
    c.color = {r: "F", g: "F", b: "F"};
  };
  const setBlack = evt => {
    evt.preventDefault();
    c.color = {r: 0, g: 0, b: 0};
  };
  whiteEl.addEventListener("click", setWhite, false);
  blackEl.addEventListener("click", setBlack, false);

}


document.addEventListener("DOMContentLoaded", init);
