import React, { useEffect, useState } from "react";
import { MAX_COLS, MAX_ROWS, NO_OF_BOMBS } from "../../constants";
import { Cell, CellState, CellValue, Face } from "../../types";
import { generateCells, openMultipleCells } from "../../utils";
import Button from "../Button";
import Navbar from "../Navbar";
import NumberDisplay from "../NumberDisplay";
import "./App.scss";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>(generateCells());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [bombCounter, setBombCounter] = useState<number>(NO_OF_BOMBS);
  const [live, setLive] = useState<boolean>(false);
  const [hasLost, setHasLost] = useState<boolean>(false);
  const [hasWon, setHasWon] = useState<boolean>(false);

  const levelChangedHandler = () => {
    const newCells = generateCells();
    console.log(MAX_COLS, MAX_ROWS);
    setCells(newCells);
    handleFaceClick();
  }

  useEffect(() => {
    const handleMouseDown = () => {
      if (hasLost || hasWon) {
        return;
      }
      setFace(Face.oh);
    };
    const handleMouseUp = () => {
      if (hasLost || hasWon) {
        return;
      }
      setFace(Face.smile);
    };
    const Body = document.querySelector(".Body")!;
    Body.addEventListener("mousedown", handleMouseDown);
    Body.addEventListener("mouseup", handleMouseUp);
    return () => {
      Body.removeEventListener("mousedown", handleMouseDown);
      Body.removeEventListener("mouseup", handleMouseUp);
    };
  }, [hasLost, hasWon]);

  useEffect(() => {
    if (live && time < 999) {
      const timer = setInterval(() => {
        setTime(prevTime => {
          return prevTime + 1;
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [live, time]);

  useEffect(() => {
    if (hasLost) {
      setFace(Face.lost);
      setLive(false);
    }
  }, [hasLost]);

  useEffect(() => {
    if (hasWon) {
      setFace(Face.won);
      setLive(false);
    }
  }, [hasWon]);

  const handleCellClick = (rowParam: number, colParam: number) => (): void => {
    let newCells = cells.slice();

    if (hasLost || hasWon) {
      return;
    }

    if (!live) {
      let isBomb = newCells[rowParam][colParam].value === CellValue.bomb;
      console.log("isbomb : " + isBomb);
      while (isBomb) {
        newCells = generateCells();
        if (!(newCells[rowParam][colParam].value === CellValue.bomb)) {
          isBomb = false;
          break;
        }
      }
      setLive(true);
    }

    const currentCell = newCells[rowParam][colParam];

    if ([CellState.flagged, CellState.visible].includes(currentCell.state)) {
      return;
    }

    if (currentCell.value === CellValue.bomb) {
      setHasLost(true);
      newCells[rowParam][colParam].red = true;
      newCells = showAllBombs();
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      newCells = openMultipleCells(newCells, rowParam, colParam);
    } else {
      newCells[rowParam][colParam].state = CellState.visible;
    }

    // Check to see if you have won
    let openCellState = false;
    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = cells[row][col];
        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          openCellState = true;
          break;
        }
      }
    }

    if (!openCellState) {
      newCells = newCells.map(row =>
        row.map(cell => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged
            };
          }
          return cell;
        })
      );
      setHasWon(true);
    }

    setCells(newCells);
  };

  const handleContext = (rowParam: number, colParam: number) => (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();

    if (!live) {
      return;
    }

    const currentCells = cells.slice();
    const currentCell = cells[rowParam][colParam];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.open) {
      currentCells[rowParam][colParam].state = CellState.flagged;
      setCells(currentCells);
      setBombCounter(bombCounter - 1);
    } else if (currentCell.state === CellState.flagged) {
      currentCells[rowParam][colParam].state = CellState.open;
      setCells(currentCells);
      setBombCounter(bombCounter + 1);
    }
  };

  const handleFaceClick = (): void => {
    setLive(false);
    setTime(0);
    setBombCounter(NO_OF_BOMBS);
    setCells(generateCells());
    setHasLost(false);
    setHasWon(false);
    setFace(Face.smile);
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          value={cell.value}
          onClick={handleCellClick}
          onContext={handleContext}
          row={rowIndex}
          col={colIndex}
          red={cell.red}
        />
      ))
    );
  };

  const showAllBombs = (): Cell[][] => {
    const currentCells = cells.slice();
    return currentCells.map(row =>
      row.map(cell => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible
          };
        } else {
          return cell;
        }
      })
    );
  };

  return (
    <React.Fragment>
    <Navbar onChangeLevel={levelChangedHandler} />
    <div className="GameArea">
      <div className="App">
        <div className="Header">
          <NumberDisplay value={bombCounter} />
          <div className="Face" onClick={handleFaceClick}>
            <span role="img" aria-label="face">
              {face}
            </span>
          </div>
          <NumberDisplay value={time} />
        </div>
          <div className="Body" style={{
            display: "grid",
            gridTemplateRows: `repeat(${MAX_ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${MAX_COLS}, 1fr)`
          }}>
          {renderCells()}
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default App;
