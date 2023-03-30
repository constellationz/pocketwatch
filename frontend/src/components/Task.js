import Button from 'react-bootstrap/Button';

const Task = ({ task }) => {
  return (
    <div className="task-container d-flex flex-column rounded">
      <div className="text-start">
        <h1 className="task-name">{task.name}</h1>
      </div>

      <div className="d-flex justify-content-between">
        <time className="task-elapsed-time fs-3">{task.timeElapsed}</time>
        <div>
          <Button className="edit-task-button" variant="dark">Edit</Button>
          <Button className="delete-task-button" variant="outline-dark">Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default Task;