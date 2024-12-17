let isRunning = false;
let elapsedTime = 0; // In seconds
let startTime = null;
let intervalId = null;
let lapTimes = [];

const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapList = document.getElementById("lap-list");

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    timeDisplay.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

function padTime(time) {
    return time < 10 ? "0" + time : time;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime * 1000;
    intervalId = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        updateDisplay();
    }, 1000);
    isRunning = true;
    startStopBtn.textContent = "Pause";
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function stopStopwatch() {
    clearInterval(intervalId);
    isRunning = false;
    startStopBtn.textContent = "Resume";
}

function resetStopwatch() {
    clearInterval(intervalId);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapTimes = [];
    renderLapTimes();
    startStopBtn.textContent = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLapTime() {
    lapTimes.push(elapsedTime);
    renderLapTimes();
}

function renderLapTimes() {
    lapList.innerHTML = "";
    lapTimes.forEach((lapTime, index) => {
        const lapItem = document.createElement("li");
        const hours = Math.floor(lapTime / 3600);
        const minutes = Math.floor((lapTime % 3600) / 60);
        const seconds = lapTime % 60;
        lapItem.textContent = `Lap ${index + 1}: ${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
        lapList.appendChild(lapItem);
    });
}

startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        if (elapsedTime === 0) {
            startStopwatch();
        } else {
            startStopwatch();
        }
    }
});

resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLapTime);
