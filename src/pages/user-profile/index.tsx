import React from "react";

const UserProfile = () => {
  return (
    <div>
      <p>User Profile page</p>
      <p>App name: {process.env.REACT_APP_NAME}</p>
    </div>
  );
};

export default UserProfile;
