import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/frizmee-logo.png";

function Header(props) {
  return (
    <header>
      <img src={logo} alt="frizmee-logo" className="frizmee-logo" />
      {/* <h1>Frizmee !!!</h1> */}
      {props.page === "Home" && (
        <Link to="/friztip">
          <i className="far fa-lightbulb fa-4x link-icon"></i>
        </Link>
      )}
      {props.page === "FrizTip" && (
        <Link to="/">
          <i className="fas fa-home fa-4x link-icon"></i>
        </Link>
      )}
      {props.tasks && <h3>{props.tasks.length} produits différents</h3>}
    </header>
  );
}

export default Header;
