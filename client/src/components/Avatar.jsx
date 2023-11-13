import React from 'react';
import Avatar from 'react-avatar';
import { useUser } from './UserContext'; 

const UserAvatar = () => {
  const { user } = useUser();

  // Check if the user object and name are valid
  const userName = user && user.email ? user.email : 'Unknown';

  return <Avatar name={userName} size="40" round={true} />;
};

export default UserAvatar;
