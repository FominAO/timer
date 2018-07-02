
function bind(func, context) {
  return function() {
    return func.apply(context, arguments);
  };
}
export default class ClockRound {
  constructor(goalDate) {
    this.circle = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style="width: 300px; height: 300px;"><circle id="circle" cx="250" cy="250" r="210" fill="none" stroke="#000" stroke-width="8"/></svg>'
    this.goal = goalDate;
    this.timerId = 0;
    this.data = {"days": 0,
    "hours": 0,
    "minutes": 0,
    "seconds": 0}
  }
  timer() {
    let currentDate = new Date();
    let newDate = this.goal - +currentDate;
    let seconds = Math.round(+newDate / 1000)
    let minutes = Math.round((seconds + 30)  / 60);
    let hours = Math.round((minutes + 30) / 60);
    let days =  Math.round((hours + 12) / 24);
    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;
    this.data =  {
      "days": days,
      "hours": hours,
      "minutes": minutes,
      "seconds": seconds
    }
    return this.data
  }
  render() {
    const timer = document.createElement("div");
    timer.className = "timer";
    for (let key in this.data) {
      let box = document.createElement("div");
      box.className = key + "-box";
      box.innerHTML = this.circle + '<span class="'+ key + '-count">' + this.data[key] + '</span>';
      box.getElementsByTagName("circle")[0].id += "-" + key;
      timer.appendChild(box);
    }
    document.getElementsByClassName("container")[0].appendChild(timer)
  }
  tick() {
    let data = this.timer();
    let datePart = document.querySelectorAll("[class$=-count]")
    let dateCircles = document.getElementsByTagName("circle")
    var i = 0;
    for (let key in data) {
      if (datePart[i].innerHTML != data[key]){
      datePart[i].innerHTML = data[key];
      if (key == "hours") {
        dateCircles[i].style.strokeDasharray = 1319 - Math.round(54.96*data[key])+", 1319" 
      } else {
      dateCircles[i].style.strokeDasharray = 1319 - Math.round(21.87*data[key])+", 1319"
      }
    }
      i++;
    }  
  }
  start() {
    this.render();
    this.timerId = setInterval(bind(this.tick, this), 1000) 
  }
  stop() {
    clearInterval(this.timerId)
  }
}
