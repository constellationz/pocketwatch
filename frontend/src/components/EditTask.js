import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { TaskContext } from '../contexts/TaskContext';
import { useContext, useState } from 'react';

function EditTask({ task }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = task.id;

  const [name, setName] = useState(task.name);
  const [startTime, setStartTime] = useState(task.startTime);
  const [endTime, setEndTime] = useState(task.endTime);

  const { updateTask } = useContext(TaskContext);

  const updatedTask = { id, name, startTime, endTime }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, updatedTask);
    handleClose();
  }

  return (
    <>
      <Button className="edit-task-button" variant="dark" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="task-name">Task Name</label>
            <input
              className="form-control"
              id="task-name"
              value={name}
              placeholder={"Task Name"}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input
              className="form-control"
              id="start-time"
              value={startTime}
              placeholder={"Start Time"}
              onChange={(e) => setStartTime(e.target.value)}
              required />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input
              className="form-control"
              id="end-time"
              value={endTime}
              placeholder={"End Time"}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <Button onClick={handleSubmit} className="form-button mb-3" id="pocketwatch">Save</Button>
          <Button onClick={handleClose} variant="danger" id="pocketwatch">Discard Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;