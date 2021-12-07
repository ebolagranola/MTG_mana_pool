import Canvas from "./classes/Canvas.js";
import ColorPicker from "./classes/ColorPicker.js";
import * as Util from "./draw_utils.js";

function init() {
    let canvas = document.getElementById("canvas");
    let c = new Canvas(canvas);

    let palette = document.getElementById('colorPicker');
    let displayColor = document.getElementById('displayColor');
    let colorSelectCircle = document.getElementById('colorSelectCircle').querySelector('div');
    colorSelectCircle.style.left = palette.offsetLeft+palette.offsetWidth/2-colorSelectCircle.offsetWidth/2 + "px";
    colorSelectCircle.style.top = palette.offsetTop-colorSelectCircle.offsetHeight/2 + "px";
    let colorPicker = new ColorPicker(palette, displayColor, colorSelectCircle, 600, 300);

    let mouseBrush = document.getElementById("mouseBrush");
    let mousePointer = document.getElementById("mousePointer");

    document.onmousemove = function(e) {
        let offset = mouseBrush.offsetWidth/2
        mouseBrush.style.left = e.pageX-offset + "px";
        mouseBrush.style.top = e.pageY-offset + "px";
    }
    document.addEventListener("wheel", (e) => {
        const delta = Math.sign(e.deltaY);
        c.newRadius(delta, true);
    });
    document.getElementById('strokeInput').addEventListener("change", function() {
        c.newRadius(this.value);
    });

    displayColor.addEventListener('sendColor', function() {
        c.setColor(colorPicker.color);
        mouseBrush.style.borderColor = "rgb("+colorPicker.color.r+", "+colorPicker.color.g+", "+colorPicker.color.b+")";
    });
}

document.addEventListener("DOMContentLoaded", init);
