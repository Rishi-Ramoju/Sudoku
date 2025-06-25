import { stopTimer } from "./timer.js";

export function checkSolution() {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(""));

  // Fill grid with current input values
  document.querySelectorAll("#sudoku input").forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    grid[row][col] = input.value;
  });

  const isValidGroup = (group) => {
    const nums = group.filter((n) => n !== "").map(Number);
    return nums.length === 9 && new Set(nums).size === 9;
  };

  for (let i = 0; i < 9; i++) {
    const row = grid[i];
    const col = grid.map((r) => r[i]);

    if (!isValidGroup(row) || !isValidGroup(col)) {
      alert("Incorrect solution!");
      return;
    }
  }

  // Check 3x3 blocks
  for (let blockRow = 0; blockRow < 3; blockRow++) {
    for (let blockCol = 0; blockCol < 3; blockCol++) {
      const block = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          block.push(grid[blockRow * 3 + i][blockCol * 3 + j]);
        }
      }
      if (!isValidGroup(block)) {
        alert("Incorrect solution!");
        return;
      }
    }
  }

  alert("Congratulations! You solved the puzzle.");
  stopTimer();
}
