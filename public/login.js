import React from 'react';
import { useState } from 'react';

function Login() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} />
        )
      }
    />
  );
}

function LoginMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Authenticate again
      </button>
    </>
  );
}

async function fetchUser(email) {
  const response = await fetch(`/account/findOne/${email}`);
  const data = await response.json();
  return data;
}

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handle() {
    try {
      const user = await fetchUser(email);

      if (!user) {
        // User not found
        console.log('User not found');
        props.setStatus('User not found');
        return;
      }

      if (user.password === password) {
        // Password matches
        console.log('Login successful');
        props.setStatus('');
        props.setShow(false);
      } else {
        // Incorrect password
        console.log('Incorrect password');
        props.setStatus('Incorrect password');
      }
    } catch (err) {
      console.log(err);
      props.setStatus('Error occurred');
    }
  }

  return (
    <>
      Email<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />

      Password<br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Login
      </button>
    </>
  );
}

export default Login;
