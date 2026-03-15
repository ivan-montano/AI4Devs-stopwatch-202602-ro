class Stopwatch {

    constructor(displayElement, msElement) {
        this.displayElement = displayElement;
        this.msElement = msElement;

        this.startTime = 0;
        this.elapsed = 0;
        this.interval = null;
        this.running = false;
    }

    start() {
        this.startTime = Date.now() - this.elapsed;
        this.interval = setInterval(() => this.update(), 10);
        this.running = true;
    }

    pause() {
        clearInterval(this.interval);
        this.elapsed = Date.now() - this.startTime;
        this.running = false;
    }

    reset() {
        clearInterval(this.interval);
        this.startTime = 0;
        this.elapsed = 0;
        this.running = false;
        this.render(0);
    }

    update() {
        const time = Date.now() - this.startTime;
        this.render(time);
    }

    render(time) {

        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = time % 1000;

        this.displayElement.textContent =
            `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

        this.msElement.textContent = this.padMs(milliseconds);
    }

    pad(num) {
        return num.toString().padStart(2, "0");
    }

    padMs(num) {
        return num.toString().padStart(3, "0");
    }
}


const display = document.getElementById("display");
const ms = document.getElementById("ms");

const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");

const stopwatch = new Stopwatch(display, ms);


startBtn.addEventListener("click", () => {

    const text = startBtn.textContent;

    if (text === "Start") {
        stopwatch.start();
        startBtn.textContent = "Pause";
        startBtn.className = "pause";
    }

    else if (text === "Pause") {
        stopwatch.pause();
        startBtn.textContent = "Continue";
        startBtn.className = "continue";
    }

    else if (text === "Continue") {
        stopwatch.start();
        startBtn.textContent = "Pause";
        startBtn.className = "pause";
    }

});


clearBtn.addEventListener("click", () => {

    stopwatch.reset();

    startBtn.textContent = "Start";
    startBtn.className = "start";

});
