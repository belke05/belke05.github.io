let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// returns us a a linear canvas gradient
// to be applied to a shape it must be assigned to fillstyle or strokestyle
let gradient = ctx.createLinearGradient(0, 0, 1000, 1000);
gradient.addColorStop(0, "green");
gradient.addColorStop(0.5, "cyan");
gradient.addColorStop(1, "green");

// we can use a pattern instead of color $
var img = new Image();
img.src = "../../pics/dagobah.png";
let pattern = ctx.createPattern(img, "repeat");

// width and height are same as the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let squareCollection = [];
let circleCollection = [];
let colors = ["white"];
let maxHeight = 3;
let maxWidth = 3;
let imageWidth = 700;
let imageHeight = 700;
let imageStartX = canvas.width / 2 - imageHeight / 2;
let imageStartY = canvas.height / 2 - imageWidth / 2;

var colorRndm = {
  red: Math.floor(Math.random() * 255),
  green: Math.floor(Math.random() * 255),
  blue: Math.floor(Math.random() * 255),
  rgb: function() {
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
  }
};

class Circle {
  constructor(x, y, radius) {
    this.dy = 1;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.endAngle = Math.PI * 2;
    this.startAngle = 0;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.fillStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    // ctx.stroke();
    ctx.fill();
  }

  randomColLocWH() {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.x = Math.floor(Math.random() * (canvas.width - this.radius));
    this.y = Math.floor(Math.random() * (canvas.height - this.radius));
    this.radius = Math.random() * maxHeight;
  }

  update() {
    this.y -= this.dy;

    if (this.y - this.radius < 0) {
      this.y = canvas.height - this.radius;
      console.log("called it");
    }
    this.draw();
  }
}

// drawing some text on our canvas

class Text {
  constructor(fontsize, textAlign, color, xLocation, yLocation, content) {
    this.fontsize = fontsize;
    this.font = this.fontsize + "px Arial";
    this.textAlign = textAlign;
    this.color = color;
    this.xLocation = xLocation;
    this.yLocation = yLocation;
    this.content = content;
  }

  draw() {
    ctx.beginPath();
    ctx.font = this.font;
    ctx.textAlign = this.textAlign;
    ctx.fillStyle = this.color;
    ctx.fillText(this.content, this.xLocation, this.yLocation);
    ctx.closePath();
  }

  dissapear() {
    this.font = {};
  }

  update() {
    this.xLocation = canvas.width / 2;
    this.yLocation = canvas.height / 2;
    this.fontsize -= 0.5;
    this.font = this.fontsize + "px Arial";
    this.draw();
  }
}
console.log(canvas.width);

// let title = new Text(
//   "200",
//   "center",
//   "#FFE81F",
//   canvas.width / 2,
//   canvas.height / 2,
//   "Escaping Dagobah"
// );

// let description = new Text(
//   "40",
//   "center",
//   "#FFE81F",
//   canvas.width / 2,
//   canvas.height / 2,
//   "It is a dark time for the rebellion. Even though the deathstar has been destroyed. The rebel alliance its biggest hope SKywalker is currently stuck on the planet of Dagobah. If the rebels want to have a change to defeat the empire it is of vital importance that he escapes the planet. The fate of the alliance rests upon your shoulders!"
// );

circleCollection = [];

//event listener to chang our size on window resize

for (let index = 0; index < 1000; index++) {
  let circle = new Circle(0, 0, 10);
  circle.randomColLocWH();
  circleCollection.push(circle);
}

window.onresize = function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circleCollection = [];
  for (let index = 0; index < 1000; index++) {
    let circle = new Circle(0, 0, 5);
    circle.randomColLocWH();
    circleCollection.push(circle);
  }
};

// to make our animations we clear the rectangle and then redraw our images on them
window.onload = () => {
  animate();
};

// function animate() {
//   requestAnimationFrame(animate);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // images we have to update
//   title.draw();
//   ctx.drawImage(img, imageStartX, imageStartY, imageWidth, imageHeight);
// }

/*
1. save a canvas State --> save() method 
2. clear the canvas --> clearRect
3. draw animated shapes 
4. restore canvas state --> restore() gets previous canvas state back 
*/

// Your callback routine must itself call requestAnimationFrame() if you want to animate another frame at the next repaint.

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circleCollection.forEach(circle => {
    circle.draw();
  });
  updateDimensions();
  // ctx.drawImage(img, imageStartX, imageStartY, imageWidth, imageHeight);
  // title.update();
}

function updateDimensions() {
  imageStartX = canvas.width / 2 - imageHeight / 2;
  imageStartY = canvas.height / 2 - imageWidth / 2;
}

let title = document.getElementById("title");
let parent = document.getElementById("textContainer");
let intro = parent.firstChild;

let introSound = new Audio();
introSound.src = "../../music/intro.mp3";

setTimeout(function() {
  parent.removeChild(intro);
  parent.innerHTML = '<h1 id="title">Escaping Dagobah</h1>';
  introSound.play();
  setTimeout(function() {
    parent.classList.add("perspective");
    parent.innerHTML = "";
    parent.innerHTML =
      '<p id="crawlText" class="crawl">It is a dark time for the rebellion.<br> Even though the deathstar has been destroyed.<br> The rebel alliance its biggest hope Skywalker<br> is currently trapped on the planet of Dagobah.<br> If the rebels want to have a chance<br> to defeat the empire, it is of vital<br> importance that he escapes the planet.<br> The fate of the alliance rests upon your shoulders!</p>';
    setTimeout(function() {
      let startBtn = createStart();
      parent.appendChild(startBtn);
      setTimeout(() => {
        parent.removeChild(document.getElementById("crawlText"));
      }, 40000);
    }, 17000);
  }, 6500);
}, 4000);

function createStart() {
  parent.style.flexDirection = "column";
  let btn = document.createElement("a");
  btn.href = "./gamepage.html";
  btn.id = "startbtn";
  btn.innerText = "START";
  return btn;
}
