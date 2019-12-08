import React, { useState } from "react";

function DateDisplay(props) {
  const [display, setDisplay] = useState(false);

  return (
    <span className="date click-icon" onClick={() => setDisplay(!display)}>
      {display ? props.date : "❄️"}
    </span>
  );
}

export default DateDisplay;
