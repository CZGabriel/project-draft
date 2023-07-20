import React from 'react';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserName() {
  const { user } = useContext(UserContext);

  return (
    <div className="user-name">
      Welcome, {user.name}!
    </div>
  );
}

export default UserName;