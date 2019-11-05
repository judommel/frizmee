import React, { useState } from "react";

function DateDisplay(props) {
  const [display, setDisplay] = useState(false);

  return (
    <span className="date" onClick={() => setDisplay(!display)}>
      {display ? props.date : "❄️"}
    </span>
  );
}

export default DateDisplay;
