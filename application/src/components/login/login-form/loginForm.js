import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';

export default LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    props.onLogin();
  }

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input type="text" className="form-control" id="inputEmail" placeholder="test@test.com" value={this.state.email} onChange={e => setEmail(e.target.value)}></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={e => setPassword(e.target.value)}></input>
      </div>
      <div className="d-flex justify-content-center">
          <button onClick={e => handleLoginSubmit(e)} type="submit" className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}
