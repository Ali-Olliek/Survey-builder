import React, { useState } from "react";

export default function Login() {
      const [values, setValues] = useState({
        Username: "",
        Email: "",
      });

      const [submitted, setSubmitted] = useState(false);
      const [valid, setValid] = useState(false);

      const handleUserNameInput = (event) => {
        setValues({ ...values, Username: event.target.value });
      };

      const handleEmailInput = (event) => {
        setValues({ ...values, Email: event.target.value });
      };


      const handleSubmit = (event) => {
        event.preventDefault();
        if (values.Username && values.Email) {
          setValid(true);
        }
        setSubmitted(true);
      };
      
  return (
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
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
            name="username"
          />
          {submitted && !values.Username ? (
            <span>Please enter a username</span>
          ) : null}
          <input
            onChange={handleEmailInput}
            value={values.Email}
            className="form-field"
            placeholder="Email"
            name="Email"
          />
          {submitted && !values.Email ? (
            <span>Please enter an Email</span>
          ) : null}
          <button type="submit">Login</button>
        </form>
      </div>
  );
}
