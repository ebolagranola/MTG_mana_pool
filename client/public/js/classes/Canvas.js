export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.strokeRadius = 50;
    this.color = { r: 0, g: 0, b: 0 };
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.imgData = this.ctx.createImageData(this.width, this.height);
    this.pixels = this.imgData.data;
    this.listenForEvents(this);
  }

  setColor(color) {
    this.color = color;
  }

  newRadius(r, mouseWheel) {
    if (this.strokeRadius > 0 && this.strokeRadius <= 500) {
      let mouseBrush = document.getElementById("mouseBrush");
      let strokeInput = document.getElementById("strokeInput");
      let strokeValue = document.getElementById("strokeValue");
      if (r == -1 && mouseWheel) {
        if (this.strokeRadius < 100) {
          this.strokeRadius++;
        }
      } else if (r == 1 && mouseWheel) {
        if (this.strokeRadius > 1) {
          this.strokeRadius--;
        }
      } else {
        this.strokeRadius = r;
      }
      mouseBrush.style.width = this.strokeRadius-4 + "px";
      mouseBrush.style.height = this.strokeRadius-4 + "px";
      strokeValue.innerHTML = strokeInput.value = this.strokeRadius;
    }
  }

  listenForEvents(parObj) {
    let lastPoint;
    let drawing = false;
    const continueStroke = newPoint => {
        this.ctx.beginPath();
        this.ctx.moveTo(lastPoint[0], lastPoint[1]);
        this.ctx.strokeStyle = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";
        this.ctx.lineWidth = parObj.strokeRadius;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = "round";
        this.ctx.lineTo(newPoint[0], newPoint[1]);
        this.ctx.stroke();
        lastPoint = newPoint;
    };
    const startStroke = point => {
        drawing = true;
        lastPoint = point;
    };
    const placeDot = point => {
      this.ctx.beginPath();
      this.ctx.moveTo(point[0], point[1]);
      this.ctx.strokeStyle = "rgb("+this.color.r+","+this.color.g+","+this.color.b+")";
      this.ctx.lineWidth = parObj.strokeRadius;
      this.ctx.lineTo(point[0], point[1]);
      this.ctx.stroke();
    }
    const BUTTON = 0b01;
    const mouseButtonIsDown = buttons => (BUTTON & buttons) === BUTTON;
    const mouseMove = evt => {
        if (!drawing) {
            return;
        }
        continueStroke([evt.offsetX, evt.offsetY]);
    };
    const mouseDown = evt => {
        if (drawing) {
            return;
        }
        evt.preventDefault();
        this.canvas.addEventListener("mousemove", mouseMove, false);
        startStroke([evt.offsetX, evt.offsetY]);
    };
    const mouseClick = evt => {
      if (drawing) {
          return;
      }
      evt.preventDefault();
      placeDot([evt.offsetX, evt.offsetY]);
    };
    const mouseEnter = evt => {
        if (!mouseButtonIsDown(evt.buttons) || drawing) {
            return;
        }
        mouseDown(evt);
    };
    const endStroke = evt => {
        if (!drawing) {
            return;
        }
        drawing = false;
        evt.currentTarget.removeEventListener("mousemove", mouseMove, false);
    };
    // Touch Interactions
    const getTouchPoint = evt => {
      if (!evt.currentTarget) {
          return [0, 0];
      }
      const rect = evt.currentTarget.getBoundingClientRect();
      const touch = evt.targetTouches[0];
      return [touch.clientX - rect.left, touch.clientY - rect.top];
    };
    const touchStart = evt => {
        if (drawing) {
            return;
        }
        evt.preventDefault();
        startStroke(getTouchPoint(evt));
    };
    const touchMove = evt => {
        if (!drawing) {
            return;
        }
        continueStroke(getTouchPoint(evt));
    };
    const touchEnd = evt => {
        drawing = false;
    };
    // Mouse events
    this.canvas.addEventListener("click", mouseClick, false),
    this.canvas.addEventListener("mousedown", mouseDown, false);
    this.canvas.addEventListener("mouseup", endStroke, false);
    this.canvas.addEventListener("mouseout", endStroke, false);
    this.canvas.addEventListener("mouseenter", mouseEnter, false);
    // Touch events
    this.canvas.addEventListener("touchstart", touchStart, false);
    this.canvas.addEventListener("touchend", touchEnd, false);
    this.canvas.addEventListener("touchcancel", touchEnd, false);
    this.canvas.addEventListener("touchmove", touchMove, false);
  }
}
