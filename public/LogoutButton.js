import React from 'react';


const LogoutButton = () => {
    const handleLogout = () => {
      // Clear the JWT from local storage or cookies
      localStorage.removeItem('accessToken');
      
      // Redirect or update the UI to reflect the logged-out state
      // ...
      window.location.href = '/login';
    };
  
    return (
      <button onClick={handleLogout}>Logout</button>
    );
  };
  
  export default LogoutButton;
