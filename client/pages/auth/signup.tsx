import { useState, useEffect } from "react";
import axios from "axios";
import useRequest from "../../hooks/use-request";
import Router from "next/router";


export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRequest, errors] = useRequest({
    url: "http://localhost:3004/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/")
  });

  const onSubmit = async (event: any) => {
    event.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group"></div>
      <label>Email Address</label>
      <input
        type="text"
        className="form-control"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
