import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function UpdateEmail() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-block form-button" id="pocketwatch" variant="dark" onClick={handleShow}>
        Update Email
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="current-email">Current email</label>
            <input className="form-control" id="current-email" type="email" placeholder={"Current email"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-email">New email</label>
            <input className="form-control" id="new-email" type="email" placeholder={"New email"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" placeholder={"Password"}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <ModalButtons successText="Save" dangerText="Discard Changes" />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEmail;