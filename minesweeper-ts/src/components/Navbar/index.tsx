import React from "react";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <div className="Navbar">
      <div className="NavBrand">
        MinesWeeper
        <span role="img" aria-label="nav-brand">
          💣🚩
        </span>
      </div>
      <ul className="NavItems">
        <li className="NavItem" onClick={handleClick}>
          LeveLs
        </li>
        <li className="NavItem" onClick={handleClick}>
          Controls
        </li>
        <li className="NavItem" onClick={handleClick}>
          NightMode
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
