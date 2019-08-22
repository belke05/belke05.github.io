export default class Countdown {
  constructor(timeLimit) {
    this.timeLimit = timeLimit;
    this.timeLimitMsec = this.timeLimit * 100;
    this.MsecCounter = 0;
    this.ratio = this.MsecCounter / this.timeLimitMsec;
    this.countdownID;
  }

  countdownstart() {
    clearInterval(this.countdownID);
    this.countdownID = setInterval(() => {
      this.MsecCounter++;
      this.ratio = this.MsecCounter / this.timeLimitMsec;
      // console.log(ratio);
      let barToDiminish = document.getElementById("bartoDiminish");
      barToDiminish.style.width = `${100 - 100 * this.ratio}%`;
      if (this.ratio == 1) {
        clearInterval(countdownID);
      } else if (this.ratio == 0.1) {
        barToDiminish.className = "middle";
      } else if (this.ratio == 0.7) {
        barToDiminish.className = "danger";
      }
    }, 10);
  }

  checkIftimeLeft() {
    if (this.ratio == 1) {
      return true;
    } else {
      return false;
    }
  }

  createBar() {
    clearInterval(this.countdownID);
    this.MsecCounter = 0;
    this.timeLimitMsec = this.timeLimit * 100;
    let bar = document.createElement("div");
    bar.id = "bartoReveal";
    let bar2 = document.createElement("div");
    bar2.id = "bartoDiminish";
    bar2.className = "good";
    bar.appendChild(bar2);
    document.getElementById("game_container").appendChild(bar);
  }
}
