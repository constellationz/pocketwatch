import Button from "react-bootstrap/Button";
import Play from "../assets/play.png";
import Stop from "../assets/stop.png";

const CurrentTask = ({ taskName, onInputChange, handleSubmit, startTimer, timerOn, resetTask }) => {
  return (
    <div >
      <div className="d-flex mt-4 justify-content-start current-task-name">
        <input placeholder="Add Task Name" value={taskName} onChange={(event) => onInputChange(event)} className="form-control" />
      </div>
      <div className="d-flex mt-5 mb-5 justify-content-around current-task-buttons">
        {
          timerOn ?
          <Button onClick={(event) => handleSubmit(event)} className="border border-dark" variant="light" id="add-task">
            <img className="control-button" src={Stop} alt="Stop" />
          </Button>
          :
          <Button onClick={startTimer} className="border border-dark" variant="light" id="media-control">
            <img className="control-button" src={Play} alt="Play" />
          </Button>
        }

        <Button variant="outline-dark" onClick={resetTask}>Reset Task</Button>
      </div>
    </div>
  );
};

export default CurrentTask;
