import Button from "react-bootstrap/Button";

const CurrentTask = ({ props }) => {
  return (
    <div className="d-flex justify-content-center">
      <input className="form-control" placeholder={props.name} />
      <Button id="media-control">Play/Pause</Button>
      <Button id="add-task">Add Task</Button>
    </div>
  );
};

export default CurrentTask;
