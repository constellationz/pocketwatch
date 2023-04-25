import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function DeleteTask({ task, deleteTask }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleDeleteSubmit = () =>{
    deleteTask(task.id);
    handleClose(); 
  }

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
          {/* <Button onClick={(event) => handleDeleteSubmit(event)} className="form-button mb-3"></Button> */}
          <ModalButtons successText="Yes, I'm sure!" dangerText="Don't delete" successButtonPressed={handleDeleteSubmit} dangerButtonPressed={handleClose}/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteTask;