import Button from "react-bootstrap/Button";

const CurrentTask = ({ props }) => {
  return (
    <div className="row">
      <div className="d-flex justify-content-start col-md-8 col-12">
        <input className="form-control" placeholder={props.name} />
      </div>
      <div className="d-flex col-md-4 col-12 current-task-buttons">
          <Button variant="dark" id="media-control">Play</Button>
          <Button variant="dark" id="add-task">+</Button>
      </div>
    </div>
  );
};

export default CurrentTask;