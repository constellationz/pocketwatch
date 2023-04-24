import Button from "react-bootstrap/Button";

const CurrentTask = ({ props }) => {
  return (
    <div className="row mb-3">
      <div className="d-flex justify-content-start col-md-10 col-12 current-task-name">
        <input className="form-control" placeholder={props.name} />
      </div>
      <div className="d-flex col-md-2 col-12 current-task-buttons">
          <Button variant="dark" id="media-control">Play</Button>
          <Button variant="dark" id="add-task">+</Button>
      </div>
    </div>
  );
};

export default CurrentTask;
