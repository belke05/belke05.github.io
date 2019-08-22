export default class Grid {
  constructor(boardX, boardY, color, gridSize) {
    this.boardX = boardX;
    this.boardY = boardY;
    this.color = color;
    this.gridSize = gridSize;
    this.backgrnsrc = "../../pics/surface.jpg";
  }

  // first we need to be able to create our board
  createGrid() {
    let gridDiv = document.createElement("div");
    gridDiv.id = "game_container";
    // we give the board the dimensions we prefer
    gridDiv.style.width = `${this.boardX}px`;
    gridDiv.style.height = `${this.boardY}px`;
    // gridDiv.style.backgroundColor = this.color;
    gridDiv.style.display = "grid";
    // gridDiv.style.backgroundImage = this.backgrnsrc;
    return gridDiv;
  }
}
