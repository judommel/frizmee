import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function Header(props) {
  return (
    <header>
      <h1>Frizmee !!!</h1>
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
