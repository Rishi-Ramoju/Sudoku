let activeInput = null;
export function attachEventHandlers(checkSolution) {
  document.querySelectorAll("#sudoku input").forEach((input) => {
    if (input.readOnly) return;
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^1-9]/g, ""); // Allow only digits 1-9
      if (input.value !== "") {
        setTimeout(() => {
          const isBoardFull = Array.from(
            document.querySelectorAll("#sudoku input:not(:read-only)")
          ).every((input) => input.value !== "");
          if (isBoardFull) {
            checkSolution();
          }
        }, 100); // Let browser render the input before checking
      }
    });

    input.addEventListener("focus", () => {
      input.style.backgroundColor = "#c1f7cf"; // Change background on focus
      activeInput = input;

      //   if (!input.readOnly) {
      //     console.log("Editable input focused, highlighting");
      //     input.style.backgroundColor = "#c1f7cf";
      //     activeInput = input;
      //   } else {
      //     console.log("Read-only input focused, no highlight");
      //     input.style.backgroundColor = "#eee";
      //     activeInput = null;
      //   }
    });

    input.addEventListener("blur", () => {
      //   if (input.readOnly) {
      //     input.style.backgroundColor = "#eee";
      //   } else {
      //     input.style.backgroundColor = ""; // Reset background when focus is lost
      //   }

      if (!input.readOnly) {
        input.style.backgroundColor = ""; // clear highlight
        // activeInput = null;
      }

      //   input.style.backgroundColor = input.readOnly ? "#eee" : ""; // Change background for read-only inputs
      //   activeInput = null;
    });

    input.addEventListener("keydown", (e) => {
      const row = parseInt(input.dataset.row);
      const col = parseInt(input.dataset.col);

      let newRow = row,
        newCol = col;

      switch (e.key) {
        case "ArrowUp":
          newRow = Math.max(0, row - 1);
          break;
        case "ArrowDown":
          newRow = Math.min(8, row + 1);
          break;
        case "ArrowLeft":
          newCol = Math.max(0, col - 1);
          break;
        case "ArrowRight":
          newCol = Math.min(8, col + 1);
          break;
        default:
          return;
      }

      const next = document.querySelector(
        `input[data-row='${newRow}'][data-col='${newCol}']`
      );
      if (next) {
        // next.focus();
        next.dispatchEvent(new FocusEvent("focus", { bubbles: true }));
      } // Focus next input after current event loop
      e.preventDefault();

      //   if (newRow !== row || newCol !== col) {
      //     const nextInput = document.querySelector(
      //       `input[data-row='${newRow}'][data-col='${newCol}']`
      //     );
      //     if (nextInput) nextInput.focus();
      //     e.preventDefault();
      //   }
    });
  });

  document.querySelectorAll(".keypad-button").forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      e.preventDefault(); // Prevent text selection
      const keyValue = btn.getAttribute("data-number");
      if (activeInput && !activeInput.readOnly) {
        activeInput.value = keyValue; // Set the value of the active input
        activeInput.dispatchEvent(new Event("input")); // Trigger input event
      }
    });
  });
}

export function getActiveInput() {
  return activeInput;
}

export function clearActiveInput() {
  activeInput = null;
}
