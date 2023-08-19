import React, { useState } from "react";
import ModalOnBoard from "./ModalOnboard";

const Dashboard = () => {
  const [modalOnBoardVisible, setModalOnBoardVisible] = useState(true);
  return (
    <div>
      <p>Dashboard page</p>
      <p>App name: {process.env.REACT_APP_NAME}</p>
    </div>
  );
};

export default Dashboard;
