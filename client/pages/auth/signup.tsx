import { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any[]>([]);

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3004/api/users/signup",
        { email, password }
      );
      console.log("response", response);
    } catch (error: any) {
      console.log(`in onSubmit error ${error.response.data}`);
      setErrors(error.response.data.errors);
    }
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
        type="text"
        className="form-control"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      {errors.map((error) => error.message)}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
