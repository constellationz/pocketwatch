const Timer = ({ time }) => {
  return (
    <div className="timer-container">
      <time className="timer-elapsed-time fs-1 fw-bold">{time}</time>
    </div>
  );
};

export default Timer;
