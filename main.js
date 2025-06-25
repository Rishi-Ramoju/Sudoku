import { createBoard } from "./board.js";
import { attachEventHandlers, getActiveInput } from "./input.js";
import { startTimer, togglePause } from "./timer.js";
import { checkSolution } from "./validation.js";
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
  attachEventHandlers(checkSolution);
  document.querySelector(".new-game-btn").addEventListener("click", startTimer);
  document.querySelector(".pause-play").addEventListener("click", togglePause);
  document.getElementById("reset-btn").addEventListener("click", () => {
    document.querySelectorAll("#sudoku input").forEach((input) => {
      if (!input.readOnly) {
        input.value = "";
      }
    });
    startTimer(); // Restart the timer
  });
  document.getElementById("delete-btn").addEventListener("mousedown", () => {
    const activeInput = getActiveInput();
    if (activeInput && !activeInput.readOnly) {
      activeInput.value = "";
      activeInput.dispatchEvent(new Event("input"));
    }
  });
});
