export default class Obstacle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.imgsrc = "../../pics/rock.png";
  }

  creationObstacle(XLeft, YTop) {
    let HTMLelement = document.createElement("div");
    HTMLelement.id = "obstacle";
    HTMLelement.style.width = `${this.width}px`;
    HTMLelement.style.height = `${this.height}px`;
    HTMLelement.style.left = `${XLeft}px`;
    HTMLelement.style.top = `${YTop}px`;
    // we need this so that when we update our obstacle its location will be different
    let image = document.createElement("img");
    image.src = this.imgsrc;
    HTMLelement.appendChild(image);
    return HTMLelement;
  }

  creationBasedOnArray(arrOfLevel) {
    let obstaclesArr = [];
    let dimension = arrOfLevel[0].length;
    // we need to add an obstacle to the course for each one 0 represent nothing
    // we loop horizontal over each then we go one down and do the same again
    for (let row = 0; row < dimension; row++) {
      for (let column = 0; column < dimension; column++) {
        if (arrOfLevel[row][column]) {
          // this means the element in the array has a value of one
          // we want to add a new obstacle to our array to put in the game later
          // this will create a new obstacle that has the right coordinates to be put in the game
          let obstacle = this.creationObstacle(
            column * this.width,
            row * this.height
          );
          obstaclesArr.push(obstacle); // we can push our new obstacle to our array
        }
      }
    }
    return obstaclesArr;
  }
}
