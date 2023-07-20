import React from 'react';
import { useContext } from 'react';
import UserContext from './UserContext';

function MyComponent() {
  const userName = useContext(UserContext);

  return <h1>Welcome, {userName}!</h1>;
}

export default MyComponent;
