const UserContext = require('./public/UserContext');
import logout from './logout';
import LogoutButton from './logoutbutton';

function Home() {
  return (
    <UserContext.Consumer>
      {({ users }) => {
        // Access the user name from the context
        const userName = users.length > 0 ? users[0].name : '';

        return (
          <div className="d-flex justify-content-between align-items-top">
            <Card
              txtcolor="black"
              header={`Welcome to Carolina's Bad Bank`}
              title="Carolina's Bad Bank"
              text="You can move around using the navigation bar."
              body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
            />
            <div className="text-end">
              <span className="jumbotron bg-white">Hello {userName}</span>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>

  );
}
