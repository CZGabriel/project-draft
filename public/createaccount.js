

function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [createdUser, setCreatedUser] = React.useState(null);

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <CreateForm
            setShow={setShow}
            setCreatedUser={setCreatedUser}
          />
        ) : (
          <CreateMsg
            setShow={setShow}
            createdUser={createdUser}
          />
        )
      }
    />
  );
}

function CreateMsg(props) {
  return (
    <>
      <h5>Success {props.createdUser && props.createdUser.name}, your account was created.</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Add another account
      </button>
    </>
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  function handle() {
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    console.log(name, email, password);
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
      try {
        var res = await fetch(url);
        var data = await res.json();
        console.log(data);
        props.setCreatedUser(data); // Set the created user data
      } catch (error) {
        console.error('Error creating user account:', error);
      }
    })();
    props.setShow(false);
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}

      Name<br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <br />

      Email address<br />
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
        Create Account
      </button>
    </>
  );
}
