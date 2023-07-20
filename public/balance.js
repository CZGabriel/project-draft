
function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <div>
    <h5><i>Balance is listed below</i></h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Go back
    </button>
    </div>
  </>);
}


function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

  function handle() {
    fetch(`/account/findOne/${email}`)
      .then(response => response.json())
      .then(data => {
        try {
          if (data.balance !== undefined) {
            setBalance(data.balance);
            props.setStatus(data.balance);
            props.setShow(false);
          } else {
            props.setStatus('Balance not found');
          }
        } catch (err) {
          props.setStatus('Error');
          console.log('err:', err);
        }
      })
      .catch(err => {
        props.setStatus('Error');
        console.log('err:', err);
      });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}