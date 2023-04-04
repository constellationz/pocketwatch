import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

const Task = ({ task }) => {
  return (
    <div className="task-container d-flex flex-column rounded">
      <div className="text-start">
        <h1 className="task-name">{task.name}</h1>
      </div>

      <div className="d-flex justify-content-between">
        <time className="task-elapsed-time fs-3">{task.timeElapsed}</time>
        <div>
          <EditTask task={task} />
          <DeleteTask task={task} />
        </div>
      </div>
    </div>
  );
}

export default Task;