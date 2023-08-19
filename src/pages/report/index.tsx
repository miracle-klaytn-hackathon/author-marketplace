import React from "react";

const Report = () => {
  return (
    <div>
      <p>Report page</p>
      <p>App name: {process.env.REACT_APP_NAME}</p>
    </div>
  );
};

export default Report;
