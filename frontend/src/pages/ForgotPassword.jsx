// ForgotPassword.jsx
// Forgot password page

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const sendPasswordResetEmail = () => {
    fetch("/api/users/requestPasswordReset", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })
    .then(res => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res;
    })
    .then(() => {
      setMessage("Password reset email sent");
      setErrorMessage("");
    })
    .catch(error => {
      setMessage("");
      setErrorMessage(JSON.parse(error.message).message);
    });
  };

  return (
    <>
      <h1>
        Forgot Password
      </h1>

      <p>Enter your email and we'll send you a password reset link.</p>

      <section className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          {message && <div className="text-success mb-2">{message}</div>}
          {errorMessage && <div className="form-error mb-2">{errorMessage}</div>}
          <Button variant="dark" onClick={sendPasswordResetEmail} className="btn btn-block form-button" id="pocketwatch">
            Send reset link
          </Button>
        </div>
        <div className="form-group">
          <Link to="/login">Back to login</Link>
        </div>
      </section>
    </>
  );
}

export default ForgotPassword;
