import React from "react";
import DateDisplay from "./Date";

class Task extends React.Component {
  render() {
    return (
      <li style={{ display: "flex", textAlign: "left", alignItems: "center" }}>
        <div style={{ flex: 4, display: "flex" }}>
          <i
            className="fas fa-times click-icon"
            onClick={e => {
              this.props.delete(e);
            }}
          />
          <span
            onClick={i => {
              this.props.check(i);
            }}
            className={this.props.theme}
          >
            {this.props.text}
          </span>
        </div>
        <div style={{ display: "flex", flex: 2 }}>
          <span className="quantity tasks-icon">{this.props.quantity}</span>
          <span className="tasks-icon">
            <span
              role="img"
              aria-label="eat"
              aria-labelledby="eat"
              className="click-icon"
              onClick={i => {
                this.props.eat(i);
              }}
            >
              🍽️
            </span>
          </span>
          <DateDisplay date={this.props.date} />
        </div>
      </li>
    );
  }
}

export default Task;
