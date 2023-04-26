import Button from "react-bootstrap/Button";

const CurrentTask = ({ onInputChange, handleSubmit, startTimer, timerOn }) => {
  return (
    <div >
      <div className="d-flex mt-4 justify-content-start current-task-name">
        <input placeholder="Add Task Name" onChange={(event) => onInputChange(event)} className="form-control" />
      </div>
      <div className="d-flex mt-5 mb-5 justify-content-center current-task-buttons">
        {timerOn ? <Button onClick={(event) => handleSubmit(event)}variant="dark" id="add-task">+</Button>
        :<Button onClick={startTimer}variant="dark" id="media-control">Play</Button>}
      </div>
    </div>
  );
};

export default CurrentTask;
