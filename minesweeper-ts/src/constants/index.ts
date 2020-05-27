let max_rows = 9;
let max_cols = 9;
let no_of_bombs = 10;

export let MAX_ROWS: number;
export let MAX_COLS: number;
export let NO_OF_BOMBS: number;

export const changeGameLevel = (
  rows: number,
  cols: number,
  bombs: number
): void => {
    console.log(rows, cols, bombs);
  MAX_ROWS = rows;
  MAX_COLS = cols;
  NO_OF_BOMBS = bombs;
};


changeGameLevel(max_rows, max_cols, no_of_bombs);
