let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;
let laps = [];

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        document.getElementById("startStopButton").innerHTML = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        document.getElementById("startStopButton").innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    document.getElementById("display").innerHTML = "00:00:00.000";
    document.getElementById("startStopButton").innerHTML = "Start";
    difference = 0;
    running = false;
    laps = [];
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (running) {
        laps.push(difference);
        displayLaps();
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    document.getElementById("display").innerHTML = formatTime(difference);
}

function formatTime(ms) {
    let milliseconds = Math.floor((ms % 1000) / 1);
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds)
    );
}

function displayLaps() {
    let lapsContainer = document.getElementById("laps");
    lapsContainer.innerHTML = "";
    laps.forEach((lap, index) => {
        let lapElement = document.createElement("div");
        lapElement.className = "lap";
        lapElement.innerHTML = "Lap " + (index + 1) + ": " + formatTime(lap);
        lapsContainer.appendChild(lapElement);
    });
}
