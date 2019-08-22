export default class Target {
  constructor(containX, containY, boardWidth, boardHeight) {
    // the source of your pic
    this.imgsrc = "../../pics/xwing.png";
    // the dimensions our player will have
    this.targetcontainX = containX;
    this.targetcontainY = containY;
    // the boarders will make sure that our player stays inside of the boarders
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    // this wil be the location of the player relative on the board
    this.x = boardWidth - this.targetcontainX;
    this.y = boardHeight - this.targetcontainY;
    this.direction = "";
  }

  creationTarget() {
    let HTMLelement = document.createElement("div");
    HTMLelement.id = "target";
    // we can define the dimensions of our player on the top
    HTMLelement.style.width = `${this.targetcontainX}px`;
    HTMLelement.style.height = `${this.targetcontainY}px`;
    HTMLelement.style.left = `${this.x}px`;
    HTMLelement.style.top = `${this.y}px`;
    // we need this so that when we update our player its location will be different
    let image = document.createElement("img");
    image.src = this.imgsrc;
    HTMLelement.appendChild(image);
    return HTMLelement;
  }
}
