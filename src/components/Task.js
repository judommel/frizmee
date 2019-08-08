import React from "react";
import DateDisplay from "./Date";

class Task extends React.Component {
  render() {
    return (
      <li>
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
        <span className="quantity">{this.props.quantity}</span>
        <span>
          <i
            className="fas fa-cookie-bite click-icon"
            onClick={i => {
              this.props.eat(i);
            }}
          />
        </span>
        <DateDisplay date={this.props.date} />
      </li>
    );
  }
}

export default Task;
