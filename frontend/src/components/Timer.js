const Timer = ({ time }) => {
  return (
    <div className="timer-container">
      <p className="timer-elapsed-time">{time}</p>
    </div>
  );
};

export default Timer;
