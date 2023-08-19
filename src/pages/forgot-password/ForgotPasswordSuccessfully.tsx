import SuccessFully from "components/SuccessFully";
import ImageCheckList from "assets/images/Checklist_1.png";
import { styled } from "styled-components";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";

const ButtonC = styled(Button)`
  max-width: 590px;
  flex: 1;
`;

const ForgotPasswordSuccessfully = () => {
  const navigate = useNavigate();

  const navigateSignIn = () => navigate(ROUTES.login);

  return (
    <SuccessFully
      title="Password updated successfully!"
      image={ImageCheckList}
      button={<ButtonC onClick={navigateSignIn} text="Back to Login" />}
    ></SuccessFully>
  );
};

export default ForgotPasswordSuccessfully;
