// Login.jsx
// Login page

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Login() {
  useEffect(() => {
    document.title = "Login - Pocketwatch";
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const [hasLoginError, setHasLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/users/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if(!res.ok) {
          return res.text().then(text => {throw new Error(text)});
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        window.location.replace("/");
      })
      .catch((err) => {
        setErrorMessage(JSON.parse(err.message).message);
        setHasLoginError(true);
      });
  };

  return (
    <>
      <h1>
        Login
      </h1>

      <section className="form">
        <form onSubmit={onSubmit}>
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
          {errorMessage && hasLoginError && <div className="form-error mb-2">{errorMessage}</div>}
          <div className="form-group">
            <Button type="submit" className="btn btn-block form-button" id="pocketwatch">
              Login
            </Button>
          </div>
          <div className="form-group">
            <Link to="/register">Create new account</Link>
          </div>
          <div className="form-group">
            <Link to="/forgotpassword">Forgot password</Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
