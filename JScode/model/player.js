export default class Player {
  constructor(containX, containY, boardWidth, boardHeight, extraSpacing) {
    // this will represent our movement speed
    this.dx = containX;
    this.dy = containY;
    // the source of your pic
    this.imgsrc = "../../pics/luke.png";
    // the dimensions our player will have
    this.playcontainX = containX;
    this.playcontainY = containY;
    // the boarders will make sure that our player stays inside of the boarders
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    // this wil be the location of the player relative on the board
    this.x = 0;
    this.y = 0;
    this.movementSpeed = 0.5;
    this.direction = "";
    this.extraSpacing = extraSpacing;
  }

  // create the player
  // this will be some image from the pics folder
  creationPlayer() {
    let HTMLelement = document.createElement("div");
    HTMLelement.id = "player";
    // we can define the dimensions of our player on the top
    HTMLelement.style.width = `${this.playcontainY}px`;
    HTMLelement.style.height = `${this.playcontainX}px`;
    // we need this so that when we update our player its location will be different
    let image = document.createElement("img");
    image.src = this.imgsrc;
    HTMLelement.appendChild(image);
    return HTMLelement;
  }

  // only possible if within the boundry that's reason for checks
  changeLocation = () => {
    switch (this.direction) {
      case "ArrowUp":
        if (this.checkUp()) {
          this.y -= this.movementSpeed;
        }
        break;
      case "ArrowDown":
        if (this.checkDown()) {
          this.y += this.movementSpeed;
        }
        break;
      case "ArrowLeft":
        if (this.checkLeft()) {
          this.x -= this.movementSpeed;
        }
        break;
      case "ArrowRight":
        if (this.checkRight()) {
          this.x += this.movementSpeed;
        }
        break;
      default:
    }
  };

  // render a player so we have to create and destroy the player on every arrow press
  updatePlayer = () => {
    // we give the player instance a location update
    // in the main.js the direction of our player class is set-up on each keystroke
    this.changeLocation();
    // we get the element we want to remove which is the player itself
    let playermoving = document.getElementById("player");
    // update the location of the element in the dom itseldf
    playermoving.style.top = `${this.y}px`;
    playermoving.style.left = `${this.x}px`;
    // we get our location every time we update
  };

  //check if we can move left
  checkLeft = () => (this.x <= 0 ? false : true);

  // check if we can move right
  checkRight = () =>
    this.boardWidth - (this.x + this.playcontainX) <= 0 ? false : true;

  //check if we can move up
  checkUp = () => (this.y <= 0 ? false : true);

  //check if we can move down
  checkDown = () =>
    this.boardHeight - (this.y + this.playcontainY) <= 0 ? false : true;

  returnPlayerLocation = () => {
    return [this.x, this.y];
  };
}
