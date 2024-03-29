let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.font = "18px serif";
let img = new Image();
let img2 = new Image();
let img3 = new Image();
let audio = new Audio();
audio.src = "../../music/feeble.mp3";
img.src = "../../pics/x_wing.png";
img2.src = "../../pics/tie.png";
img3.src = "../../pics/destroyer.png";
let crash = false;

// main dimensions
let cvWidth = canvas.width;
let cvHeight = canvas.height;
const PlaneWidth = 70;
const PlaneHeight = 70;
const boltWidth = 3;
const boltHeight = 20;
let boltSpeed = 3;
const destroyerHeight = 300;
const destroyerWidth = 900;

// speed
let badPlanedx = 10;
let badPlanedy = 10;
let planedx = 15;
let planedy = 15;

// amount of bolts
let boltsAmount = 20;

// arrays of objects
let fireBolts = [];
let badPlanes = [];

// frame rate so we can push new bolts every x amount of time
let frames = 0;
var score = frames / 5;

// -------- classes we will use ---------- //

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
}

class FireBolt {
  constructor() {
    this.x = Math.random() * (cvWidth - boltWidth);
    this.y = 200;
    this.dy = boltSpeed;
  }

  // randomXspawn() {
  //   this.x = Math.random() * (cvWidth - boltWidth);
  // }

  update() {
    this.y += this.dy;
    this.draw();
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, boltWidth, boltHeight);
  }
}

class Badplane {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = badPlanedx;
    this.dy = badPlanedy;
  }
}

class Plane {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = planedx;
    this.dy = planedy;
  }

  updateLocation(key) {
    switch (key) {
      case "ArrowLeft":
        if (this.x > 0) {
          this.x -= this.dx;
        }
        break;
      case "ArrowRight":
        if (this.x + PlaneWidth < cvWidth) this.x += this.dx;
        break;
    }
  }

  update() {
    ctx.drawImage(img, this.x, this.y, PlaneWidth, PlaneHeight);
  }

  crashTest(bolt) {
    var myleft = this.x;
    var myright = this.x + PlaneWidth;
    var mytop = this.y;
    var mybottom = this.y + PlaneHeight;
    var otherleft = bolt.x;
    var otherright = bolt.x + boltWidth;
    var othertop = bolt.y;
    var otherbottom = bolt.y + boltHeight;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      return false;
    } else {
      console.log("hit");
      crash = true;
      return true;
    }
  }
}

// --------- instances of classes ----------//

// these dimensions will make it spawn on the bottom
let plane = new Plane(cvWidth / 2 - PlaneWidth / 2, cvHeight - PlaneHeight);

let title = new Text(
  "60",
  "center",
  "da0003",
  cvWidth / 2,
  cvHeight / 2,
  `THE EMPIRE REIGNS SUPREME!`
);

let win = new Text(
  "60",
  "center",
  "#2ED33B",
  cvWidth / 2,
  cvHeight / 2,
  `THE REBEL ESCAPED!`
);

let retry = new Text(
  "30",
  "center",
  "white",
  cvWidth / 2,
  cvHeight / 2 + 60,
  `press r to retry`
);

// will create an array of 20 bolts
for (let index = 0; index < 20; index++) {
  let newBolt = new FireBolt();
  fireBolts.push(newBolt);
}

// -------- controles --------//

document.onkeydown = function(e) {
  console.log(e.key);
  plane.updateLocation(e.key);
  shoot(e.key);
};

let intervalID = setInterval(animate, 20);
// animate();

function animate() {
  // requestAnimationFrame(animate);
  frames++; // use this variable to push new bolts every x amount of frames
  cvHeight = canvas.height; // get the latest cv height
  cvWidth = canvas.width; // get the latest cv width
  ctx.clearRect(0, 0, cvWidth, cvHeight); // clear the whole frame
  fireBolts.forEach(bolt => {
    // each element in the fire bolt array gets fired
    plane.crashTest(bolt);
    bolt.update();
  });
  // let crashed = fireBolts.some(function(bolt) {
  //   return plane.crashTest(bolt);
  // });
  // if (crashed) {
  //   console.log("crash!!!");
  // }
  ctx.drawImage(
    img3,
    cvWidth / 2 - destroyerWidth / 2,
    destroyerHeight - 300,
    destroyerWidth,
    destroyerHeight
  );
  plane.update();
  updateBolts();
  goodbolts.forEach(shot => {
    shot.update();
  });
  ctx.fillStyle = "red";
  ctx.font = "30px Arial";
  ctx.fillText(`score: ${frames / 5}`, 10, 30);
  ctx.font = "30px Arial";
  ctx.fillText(`score: ${frames / 5}`, 10, 30);
  console.log(score);

  if (frames / 5 > 200) {
    clearInterval(intervalID);
    ctx.clearRect(0, 0, cvWidth, cvHeight);
    win.draw();
    retry.draw();
    window.onkeypress = function(e) {
      if (e.key === "r") {
        window.location.href = "index.html";
      }
    };
  }
  if (crash) {
    clearInterval(intervalID);
    ctx.clearRect(0, 0, cvWidth, cvHeight);
    title.draw();
    retry.draw();
    window.onkeypress = function(e) {
      if (e.key === "r") {
        window.location.href = "index.html";
      }
    };
  }
}

function updateBolts() {
  if (frames % 250 === 0) {
    // every 2.4 sec new bolts are send because we update every 20ms
    fireBolts = [];
    boltSpeed++;
    boltsAmount++;
    // we create new bolts
    for (let index = 0; index < boltsAmount; index++) {
      let newBolt = new FireBolt();
      fireBolts.push(newBolt);
    }
  }
}

class Goodbolt {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = boltSpeed;
  }

  // randomXspawn() {
  //   this.x = Math.random() * (cvWidth - boltWidth);
  // }

  update() {
    this.y -= this.dy;
    this.draw();
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, boltWidth, boltHeight);
  }
}

function shoot(e) {
  if (e == " ") {
    let goodshot = new Goodbolt(plane.x + PlaneWidth / 2, plane.y);
    goodbolts.push(goodshot);
  }
}
let goodbolts = [];
