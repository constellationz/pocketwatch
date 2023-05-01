import React from "react";

const Timer = ({ timerHours, timerMinutes, timerSeconds }) => {

  const paddedHours = String(timerHours).padStart(2, '0');
  const paddedMinutes = String(timerMinutes).padStart(2, '0');
  const paddedSeconds = String(timerSeconds).padStart(2, '0');

  return (
    <div id="timer" >
      <div>{paddedHours}:{paddedMinutes}:{paddedSeconds}</div>
    </div>
  );
};

export default Timer; 
