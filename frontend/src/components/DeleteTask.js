import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TaskContext } from '../contexts/TaskContext';

function DeleteTask({ task }) {

  const { deleteTask } = useContext(TaskContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="delete-task-button" variant="outline-dark" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Are you sure you want to delete this task?</p>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <Button onClick={() => deleteTask(task.id)} className="form-button mb-3" id="pocketwatch">Yes, I'm sure!</Button>
          <Button onClick={handleClose} variant="danger" id="pocketwatch">Don't delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteTask;