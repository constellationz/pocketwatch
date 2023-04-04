import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function EditTask({task}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            <input className="form-control" id="task-name" value={task.name} placeholder={"Task Name"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input className="form-control" id="start-time" value={task.startTime} placeholder={"Start Time"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input className="form-control" id="end-time" value={task.endTime} placeholder={"End Time"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="time-elapsed">Time Elapsed</label>
            <input className="form-control" id="time-elapsed" value={task.timeElapsed} placeholder={"Time Elapsed"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input className="form-control" id="location" value={task.location} placeholder={"Location"}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <ModalButtons successText="Save" dangerText="Discard Changes" />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTask;