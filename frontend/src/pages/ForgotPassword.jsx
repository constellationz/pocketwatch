// ForgotPassword.jsx
// Forgot password page

import { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";
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
      <section className="heading">
        <h1>
          <FaQuestion /> Forgot password
        </h1>
        <p>We'll email you a reset link</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
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
            <Button variant="dark" type="submit" className="btn btn-block">
              Submit
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
