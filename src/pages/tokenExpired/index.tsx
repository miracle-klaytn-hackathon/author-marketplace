import SuccessFully from "components/SuccessFully";
import ErrorPanna from "assets/images/pana.png";
import { styled } from "styled-components";
import Button from "components/button/button";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";

const Styled = {
  ErrTokenExpired: styled(SuccessFully)`
    .image {
      width: auto;
      margin-bottom: 56px;

      @media (max-width: 575.98px) {
        width: 300px !important;
      }
    }
  `,

  ButtonC: styled(Button)`
    max-width: 590px;
    flex: 1;
  `,
};

const ErrTokenExpired = () => {
  const navigate = useNavigate();

  const navigateSignIn = () => navigate(ROUTES.forgotPassword);

  return (
    <Styled.ErrTokenExpired
      title="TOKEN EXPIRED!"
      image={ErrorPanna}
      button={<Styled.ButtonC onClick={navigateSignIn} text="Try Again" />}
    ></Styled.ErrTokenExpired>
  );
};

export default ErrTokenExpired;
