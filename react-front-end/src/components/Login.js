import React, { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";

export default function Login() {
      const [values, setValues] = useState({
        Email: "",
        password: ""
      });

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);


      const handleEmailInput = (event) => {
        setValues({ ...values, Email: event.target.value });
      };
      const handlePasswordInput = (event) => {
        setValues({ ...values, Password: event.target.value });
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        let email = values.Email
        let password = values.Password
          return axios
            .post('http://127.0.0.1:8000/api/v1/Users/Login', {
              email,
              password,
            })
            .then((response) => {
              if (response.status === 200) {
                let user = [];
                user.push(response.data.username, response.data.user_id)
                localStorage.setItem("user", JSON.stringify(user));
                console.log("Logged In")
                setValues({Password: "", Email: "" })
                setValid(true);
                window.location.href = "/Surveys"
              }
            });
        };
      
return (
  <div className="form-container">
    <form className="register-form">
      <h2>Sign In</h2>
      <p>Welcome Back</p>
      {valid ? (
        <div className="success-message">
          Success! Thank you for registering
        </div>
      ) : null}
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

