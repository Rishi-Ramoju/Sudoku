export function createBoard() {
  const board = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];

  const boardContainer = document.getElementById("sudoku");
  boardContainer.innerHTML = ""; // Clear existing board
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;
      input.style.caretColor = "transparent"; // Hide caret for empty inputs
      input.style.textAlign = "center";

      if (board[row][col] !== "") {
        input.value = board[row][col];
        input.readOnly = true;
        input.style.backgroundColor = "#eee";
        input.style.color = "#333";
      } else {
        input.style.color = "#4caf50";
      }
      if (input.readOnly) input.tabIndex = 0;
      boardContainer.appendChild(input);
    }
  }
}
