import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function UpdatePassword() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="btn btn-block form-button" id="pocketwatch" variant="dark" onClick={handleShow}>
        Update Password
      </Button>
      
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="current-password">Current password</label>
            <input className="form-control" id="current-password" type="password" placeholder={"Current password"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New password</label>
            <input className="form-control" id="new-password" type="password" placeholder={"New password"}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-password-repeat">Repeat new password</label>
            <input className="form-control" id="new-password-repeat" type="password" placeholder={"Repeat new password"}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          <ModalButtons successText="Save" dangerText="Discard Changes" />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdatePassword;