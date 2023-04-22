import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalButtons from "./ModalButtons";

function UpdateEmail() {
  const [show, setShow] = useState(false);
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let token = localStorage.getItem("token");

  const updateEmail = () => {
    fetch("api/users/updateEmail", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        password,
        newEmail
      })
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res.json();
    })
    .then(data => {
      setErrorMessage("");
      setHasError(false);
      handleClose();
    })
    .catch(err => {
      setErrorMessage(JSON.parse(err.message).message);
      setHasError(true);
    });  
  }

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
            <input className="form-control" id="current-email" type="email" placeholder={"Current email"} onChange={(e) => setCurrentEmail(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="new-email">New email</label>
            <input className="form-control" id="new-email" type="email" placeholder={"New email"} onChange={(e) => setNewEmail(e.target.value)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control" id="password" type="password" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column align-items-stretch">
          {errorMessage && hasError && <div className="form-error text-center mb-2">{errorMessage}</div>}
          <ModalButtons successText="Save" dangerText="Discard Changes" successButtonPressed={updateEmail} dangerButtonPressed={handleClose} />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEmail;
