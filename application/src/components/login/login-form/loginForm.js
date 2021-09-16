import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../authSlice";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password)).then(() => {
      history.push("/view-orders");
    });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="test@test.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={handleLoginSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
