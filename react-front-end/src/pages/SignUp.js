import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  
  // States
  const [values, setValues] = useState({
    username: "",
    Email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  
  // Input Handles
  const handleUserNameInput = (event) => {
    setValues({ ...values, Username: event.target.value });
  };
  const handleEmailInput = (event) => {
    setValues({ ...values, Email: event.target.value });
  };
  const handlePasswordInput = (event) => {
    setValues({ ...values, Password: event.target.value });
  };

  // Submit Handles
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let username = values.Username;
    let email = values.Email;
    let password = values.Password;

    return axios
      .post("http://127.0.0.1:8000/api/v1/Users/SignUp", {
        username,
        email,
        password
      })
      .then((response) => {
        if (response.status === 200) {
            console.log(response.data.user.name)
            let user = [];
            user.push(response.data.user.name, response.data.user.id);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "/Surveys"
        }
        return response.data;
      });
  };

  return (
    <div className="form-container">
      <form className="register-form">
        <h2>Sign Up</h2>
        <p>Your Opinion Matters</p>
        {submitted && valid ? (
          <div className="success-message">
            Success! Thank you for registering
          </div>
        ) : null}
        <input
          onChange={handleUserNameInput}
          value={values.Username}
          className="form-field"
          placeholder="Username"
          name="Username"
        />
        {submitted && !values.Username ? <span>Please enter an Username</span> : null}
        <input
          onChange={handleEmailInput}
          value={values.Email}
          className="form-field"
          placeholder="Email"
          name="Email"
        />
        {submitted && !values.Email ? <span>Please enter an Email</span> : null}
        <input
          type={"password"}
          onChange={handlePasswordInput}
          value={values.Password}
          className="form-field"
          placeholder="Password"
          name="Password"
        />
        {submitted && !values.Password ? (
          <span>Please enter an Password</span>
        ) : null}
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
