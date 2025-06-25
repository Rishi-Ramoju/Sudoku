// Timer variables
let timerInterval = null;
let startTime = null;
let elapsedBeforePause = 0;
let isPaused = false;

// Button references
const pausePlayBtn = document.querySelector(".pause-play");
const timeDisplay = document.getElementById("time");

// Update the timer display
function updateTimer() {
  if (isPaused) return;

  const now = new Date();
  const elapsed = Math.floor((now - startTime + elapsedBeforePause) / 1000);

  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");

  timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Start new game + timer
export function startTimer() {
  clearInterval(timerInterval);
  elapsedBeforePause = 0;
  isPaused = false;
  timeDisplay.textContent = "00:00";
  pausePlayBtn.textContent = "⏸"; // Start as pause icon
  startTime = new Date();
  timerInterval = setInterval(updateTimer, 1000);

  // Clear existing board inputs
  document.querySelectorAll("#sudoku input").forEach((input) => {
    if (!input.readOnly) {
      input.value = "";
    }
  });
}

// Pause/resume toggle
export function togglePause() {
  if (!timerInterval) return;

  if (isPaused) {
    // Resume
    isPaused = false;
    startTime = new Date();
    pausePlayBtn.textContent = "⏸";
  } else {
    // Pause
    isPaused = true;
    elapsedBeforePause += new Date() - startTime;
    pausePlayBtn.textContent = "▶";
  }
}

export function stopTimer() {
  clearInterval(timerInterval);
}

// Event listeners
// newGameBtn.addEventListener("click", startTimer);
// pausePlayBtn.addEventListener("click", togglePause);
