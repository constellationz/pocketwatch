// Register.jsx
// Registration page

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const [hasRegisterError, setHasRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: formData.name, 
      emai: formData.email, 
      password: formData.password, 
    }
    console.log(newUser);

    fetch("/api/users", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
    .then((res) => {
      if(!res.ok) {
        return res.text().then(text => {throw new Error(text)});
      }
      return res.json();
    })
    .then((data) => {
      setErrorMessage("");
      setHasRegisterError(false);
      console.log(data);
    })
    .catch((err) => {
      setErrorMessage(JSON.parse(err.message).message);
      setHasRegisterError(true);
    });
  }

  return (
    <>
      <h1>
        Register
      </h1>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Repeat Password</label>
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Repeat password"
              onChange={onChange}
            />
          </div>
          {errorMessage && hasRegisterError && <div className="form-error mb-2">{errorMessage}</div>}
          <div className="form-group">
            <Button type="submit" className="btn btn-block form-button" id="pocketwatch">
              Register
            </Button>
          </div>
          <div className="form-group">
            <Link to="/login">Back to login</Link>
          </div>
          <div className="form-group">
            <Link to="/forgotpassword">Forgot password</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
