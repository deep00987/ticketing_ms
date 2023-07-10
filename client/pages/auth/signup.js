import React from "react";
import { useState } from "react";
import Router from 'next/router'
import useRequest from "../../hooks/user-req";


const signup = () => {
  const defaultForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(defaultForm);
 
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const {performReq, errors} = useRequest({
    url: "/api/users/register", 
    method: "post", 
    body: form,
    onSuccess: () => {
      Router.push('/');
    }
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const res = await performReq();

  };

  return (
    <div style={{ width: "300px" }}>
      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
        <div className="form-group">
          <label htmlFor="form-email-field">Email</label>
          <input
            id="form-email-field"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="form-pass-field">Password</label>
          <input
            id="form-pass-field"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
          ></input>
        </div>
        {errors}
        <button className="btn btn-primary" type="submit">
          signup
        </button>
      </form>
    </div>
  );
};

export default signup;
