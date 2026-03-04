const progressBar = document.getElementById("progress-bar");
const loadingInfo = document.getElementById("loading-info");

const loadingInformation = [
  "loading the loading screen",
  "downloading more RAM",
  "untangling the cables in the mainframe",
  "waiting for bogosort to finish",
  "counting to infinity",
  "thinking really hard",
  "centering the divs",
  "encrypting your data",
  "waiting for cloud response",
  "accepting AWS conditions",
  "increasing the voltage",
  "warming up the graphics card",
  "initializing LLMs",
  "interpreting the datastream",
  "arranging the pixels",
];

for (let i = 0; i < loadingInformation.length; i++) {
  loadingInformation[i] = loadingInformation[i] + " ...";
}

loadingInformation.sort(() => Math.random() - 0.5);
loadingInfo.textContent = loadingInformation[0];

const progressSegments = [
  [40, 0.9],
  [0, 0.5],
  [25, 4.0],
  [0, 2.0],
  [15, 1.0],
  [10, 6.0],
  [0, 3.5],
  [5, 8.0],
  [0, 3.0],
  [3, 2],
  [1, 12.0],
  [0.9, 999999],
];

var sum = 0;
var progressSum = 0;
const convertedTime = [];
var prev_index = 0;

for (let i = 0; i < progressSegments.length; i++) {
  sum += progressSegments[i][1] * 1000;
  progressSum += progressSegments[i][0] / 100;
  var ins_arr = [progressSum, sum];
  convertedTime.push(ins_arr);
}

let startTime = null;
var switch_time = 0;
let index = 0;
let lastInterval = 0;
const intervalTarget = 6000;

let infoIndex = 0;

function animateProgressBar(currentTime) {
  if (startTime === null) {
    startTime = currentTime;
  }

  const timeElapsed = currentTime - 40 - startTime;
  let currentInterval = Math.floor(timeElapsed / intervalTarget);

  if (currentInterval > lastInterval) {
    infoIndex += 1;
    if (infoIndex >= loadingInformation.length) {
      infoIndex = 0;
    }
    loadingInfo.textContent = loadingInformation[infoIndex];
    lastInterval = currentInterval;
  }

  index = progressSegments.length - 1;
  for (let i = 0; i < progressSegments.length; i++) {
    if (timeElapsed <= convertedTime[i][1]) {
      index = i;
      break;
    }
  }

  var index_time = timeElapsed - switch_time;

  if (index != prev_index) {
    prev_index = index;
    switch_time = timeElapsed;
    index_time = 0;
  }

  var sm2 = 1;
  var sm = 0;

  if (index == 0) {
    sm = 0;
  } else {
    sm = convertedTime[index - 1][1] * convertedTime[index - 1][0];
    sm2 = convertedTime[index - 1][1];
  }

  let progressDecimal =
    sm / sm2 +
    (index_time / (progressSegments[index][1] * 1000)) *
      (progressSegments[index][0] / 100);

  if (progressDecimal > 1) {
    progressDecimal = 1;
  }

  progressBar.style.width = progressDecimal * 100 + "%";

  if (timeElapsed < sum) {
    requestAnimationFrame(animateProgressBar);
  }
}

requestAnimationFrame(animateProgressBar);
