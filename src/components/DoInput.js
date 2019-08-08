import React from "react";

function DoInput(props) {
  return (
    <div>
      <input
        type="text"
        value={props.value}
        className={props.theme}
        placeholder={props.placeholder}
        onChange={event => {
          props.onInput(event.target.value);
        }}
      />
      <input
        value={props.quantity}
        type="text"
        className={props.quantityTheme}
        placeholder={props.quantityPH}
        onChange={event => {
          props.onQuantity(event.target.value);
        }}
      />
    </div>
  );
}

export default DoInput;
