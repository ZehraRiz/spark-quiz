import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions'

const Register = () => {
  //STATE 
  const [name, setName] = useState('testuser')
  const [email, setEmail] = useState('testuser@test.com')
  const [password, setPassword] = useState('12345678')
  const [password2, setPassword2] = useState('12345678')
  const dispatch = useDispatch()

  //HANDLERS
  const handleRegister = () => {
    const registerDetails = {
      name,
      email,
      password,
      password2
    }
    dispatch(authActions.register(registerDetails))
  };

  return (
    <div>
      <h2>Register</h2>
        <input required type="text" placeholder="name" value={name} onChange={e => setName(e.target.value)}/>
        <input required type="email" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input required type="password" placeholder="Password" minLength="8" value = {password} onChange={e => setPassword(e.target.value)}/>
        <input required type="password" placeholder="retype password" minLength="8" value={password2} onChange={e => setPassword2(e.target.value)}/>;

        <button onClick={handleRegister}>Register</button>
      <div>
        <p>Have an account?</p>
        <Link to="/login"><button>Log in</button></Link>
      </div>
    </div>
  );
};

export default Register;
