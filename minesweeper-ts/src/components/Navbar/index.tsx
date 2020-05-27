import React, { useEffect, useState } from "react";
import { changeGameLevel, MAX_COLS, MAX_ROWS } from "../../constants";
import Modal from "../Modal";
import "./Navbar.scss";

interface NavbarProps {
  onChangeLevel: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onChangeLevel }) => {
  const modals = {
    changeLevel: "changeLevel",
    showControls: "showControls",
    changeMode: "changeMode"
  };

  const levels = {
    beginner: "beginner",
    intermediate: "intermediate",
    expert: "expert",
    custom: "custom"
  };
  const themeColor = {
    day: "#eeeeee",
    night: "#464646"
  };

  const [theme, setTheme] = useState<string>(themeColor.day);
  const [gameModalOpen, setGameModalOpen] = useState<boolean>(false);
  const [controlsModalOpen, setControlsModalOpen] = useState<boolean>(false);
  const [gameOptions, setGameOptions] = useState({
    rows: 9,
    cols: 9,
    bombs: 10
  });
  const [customGame, setCustomGame] = useState({
    rows: 20,
    cols: 30,
    bombs: 95
  });

  useEffect(() => {
    const body = document.querySelector("body")!;
    body.style.backgroundColor = theme;
  }, [theme]);

  const handleClick = (modal: string) => {
    if (modal === modals.changeLevel) {
      setGameModalOpen(true);
    } else if (modal === modals.showControls) {
      setControlsModalOpen(true);
    } else if (modal === modals.changeMode) {
      if (theme === themeColor.day) {
        setTheme(themeColor.night);
      } else {
        setTheme(themeColor.day);
      }
    }
    console.log("Clicked");
  };

  const onCancelHandler = () => {
    setGameModalOpen(false);
    setControlsModalOpen(false);
  };

  const onConfirmHandler = () => {
    setGameModalOpen(false);
    setControlsModalOpen(false);
    console.log(gameOptions);
    changeGameLevel(gameOptions.rows, gameOptions.cols, gameOptions.bombs);
    console.log(MAX_COLS, MAX_ROWS);
    onChangeLevel();
  };

  const handleLevelChange = (e: any) => {
    const currentLevelSelection = e.target.value;
    if (currentLevelSelection === levels.beginner) {
      setGameOptions({
        rows: 9,
        cols: 9,
        bombs: 10
      });
    } else if (currentLevelSelection === levels.intermediate) {
      setGameOptions({
        rows: 15,
        cols: 15,
        bombs: 30
      });
    } else if (currentLevelSelection === levels.expert) {
      setGameOptions({
        rows: 15,
        cols: 30,
        bombs: 70
      });
    } else if (currentLevelSelection === levels.custom) {
      setGameOptions(customGame);
    }
  };

  return (
    <React.Fragment>
      <div className="Navbar">
        <div className="NavBrand">
          MinesWeeper
          <span role="img" aria-label="nav-brand">
            💣🚩
          </span>
        </div>
        <ul className="NavItems">
          <li
            className="NavItem"
            onClick={() => handleClick(modals.changeLevel)}
          >
            LeveLs
          </li>
          <li
            className="NavItem"
            onClick={() => handleClick(modals.showControls)}
          >
            Controls
          </li>
          <li
            className="NavItem"
            onClick={() => handleClick(modals.changeMode)}
          >
            NightMode
          </li>
        </ul>
      </div>
      {gameModalOpen ? (
        <div>
          <Modal
            title="Game Levels"
            subtitle="In custom game maximum 50 rows/columns are allowed!"
            canCancel={true}
            canConfirm={true}
            onCancel={onCancelHandler}
            onConfirm={onConfirmHandler}
          >
            <table className="LevelsTable">
              <tbody>
                <tr>
                  <td></td>
                  <td>Height</td>
                  <td>Width</td>
                  <td>Bombs</td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="field"
                        onChange={e => handleLevelChange(e)}
                        value={levels.beginner}
                      />
                      <strong>Beginner</strong>
                    </label>
                  </td>
                  <td>9</td>
                  <td>9</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="field"
                        onChange={e => handleLevelChange(e)}
                        value={levels.intermediate}
                      />
                      <strong>Intermediate</strong>
                    </label>
                  </td>
                  <td>16</td>
                  <td>16</td>
                  <td>40</td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="field"
                        onChange={e => handleLevelChange(e)}
                        value={levels.expert}
                      />
                      <strong>Expert</strong>
                    </label>
                  </td>
                  <td>16</td>
                  <td>30</td>
                  <td>99</td>
                </tr>
                <tr>
                  <td>
                    <label>
                      <input
                        type="radio"
                        name="field"
                        onChange={e => handleLevelChange(e)}
                        value={levels.custom}
                      />
                      Custom
                    </label>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={customGame.rows}
                      onChange={e =>
                        setCustomGame({
                          ...customGame,
                          rows:
                            +e.target.value <= 50 && +e.target.value > 0
                              ? +e.target.value
                              : 50
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={customGame.cols}
                      onChange={e =>
                        setCustomGame({
                          ...customGame,
                          cols:
                            +e.target.value <= 50 && +e.target.value > 0
                              ? +e.target.value
                              : 50
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={customGame.bombs}
                      onChange={e =>
                        setCustomGame({
                          ...customGame,
                          bombs:
                            +e.target.value <
                              customGame.rows * customGame.cols &&
                            +e.target.value > 0
                              ? +e.target.value
                              : customGame.rows
                        })
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal>
        </div>
      ) : null}
      {controlsModalOpen ? (
        <div>
          <Modal
            title="Controls"
            canCancel={true}
            canConfirm={false}
            onCancel={onCancelHandler}
          >
            <ul>
              <li>Left-click an empty square to reveal it.</li>
              <li>Right-click an empty square to flag it.</li>
              <li>Click the Smile face to restart the game.</li>
              <li>
                You can set the level of game from the level tab on Navbar.
              </li>
            </ul>
          </Modal>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Navbar;
