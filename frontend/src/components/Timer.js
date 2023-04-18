import React from "react";

const Timer = ({ timerHours, timerMinutes, timerSeconds }) => {
  return (
    <div id="timer">
      <span> {timerHours} </span>
      <span>:</span>
      <span> {timerMinutes} </span>
      <span>:</span>
      <span> {timerSeconds} </span>
    </div>
  );
};

export default Timer; 
