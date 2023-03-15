import Button from "react-bootstrap/Button";

const CurrentTask = ({ props }) => {
  return (
    <div className="row">
      <div className="d-flex justify-content-start col-md-8 col-12">
        <input className="form-control" placeholder={props.name} />
      </div>
      <div className="d-flex justify-content-around col-md-4 col-12">
          <Button id="media-control">Play / Pause</Button>
          <Button id="add-task">Add Task</Button>
      </div>
    </div>
  );
};

export default CurrentTask;
