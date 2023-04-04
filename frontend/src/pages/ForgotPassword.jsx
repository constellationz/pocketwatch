// ForgotPassword.jsx
// Forgot password page

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1>
        Forgot Password
      </h1>

      <p>Enter your email and we'll send you a password reset link.</p>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <Button variant="dark" type="submit" className="btn btn-block form-button" id="pocketwatch">
              Send reset link
            </Button>
          </div>
          <div className="form-group">
            <Link to="/login">Back to login</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default ForgotPassword;
