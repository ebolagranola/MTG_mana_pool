export default class ColorPicker {
  constructor(canvas, displayColor, colorSelectCircle, width, height) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.displayColor = displayColor;
    this.colorSelectCircle = colorSelectCircle;
    this.color;
    this.width = width;
    this.height = height;
    this.canDraw = true;
    this.pickerCircle = { x: 10, y: 10, width: 6, height: 6 };
    this.renderRainbow();
    this.listenForEvents(this);
  }

  renderRainbow() {
    let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
    gradient.addColorStop(0, "rgb(255, 0, 0)");
    gradient.addColorStop(0.15, "rgb(255, 0, 255)");
    gradient.addColorStop(0.33, "rgb(0, 0, 255)");
    gradient.addColorStop(0.49, "rgb(0, 255, 255)");
    gradient.addColorStop(0.67, "rgb(0, 255, 0)");
    gradient.addColorStop(0.84, "rgb(255, 255, 0)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.6, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.6, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 1)");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  getColor() {
    let imageData = this.ctx.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1);
    return this.color = { r: imageData.data[0], g: imageData.data[1], b: imageData.data[2] };
  }

  sampleColor(e) {
      this.pickerCircle.x = e.clientX - this.canvas.offsetLeft;
      this.pickerCircle.y = e.clientY - this.canvas.offsetTop;
      this.colorSelectCircle.style.left = e.clientX-(this.colorSelectCircle.offsetWidth/2) + "px";
      this.colorSelectCircle.style.top = e.clientY-(this.colorSelectCircle.offsetHeight/2) + "px";
      this.color = this.getColor();
      this.displayColor.style.backgroundColor = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";
      this.displayColor.dispatchEvent(new Event("sendColor"));
  }

  listenForEvents(parentObj) {
    this.canvas.addEventListener("mousedown", function() {
      this.canDraw = true;
      this.onmousemove = (e) => {
        if (this.canDraw) {
          parentObj.sampleColor(e);
        }
      }
    });
    this.canvas.onclick = (e) => {
      this.canDraw = true;
      parentObj.sampleColor(e);
    }
    this.canvas.addEventListener("mouseup", function() {
      this.canDraw = false;
    });
  }
}
