const minutesInput = document.getElementById('minutes');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');

let timerInterval;
let totalTime;
let timeLeft;
let isPaused = false;

function updateDisplay() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isPaused) {
        totalTime = parseInt(minutesInput.value) * 60;
        timeLeft = totalTime;
    }
    updateDisplay();
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            display.textContent = 'Time is up!';
            startButton.disabled = false;
            pauseButton.disabled = true;
        }
    }, 1000);
    isPaused = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
    isPaused = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    minutesInput.value = '';
    display.textContent = '00:00:00';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    isPaused = false;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
