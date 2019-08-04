import React, { useState } from "react";

function DateDisplay(props) {
  const [display, setDisplay] = useState(false);

  return (
    <span className="date" onClick={() => setDisplay(!display)}>
      {display ? props.date : <i class="fas fa-calendar-alt" />}
    </span>
  );
}

export default DateDisplay;
