import React, { ReactNode } from "react";
import { Styled } from "./layoutSignUp.style";
import Logo from "assets/images/Logo.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import useMediaQuery, { QUERY } from "hooks/useMediaQuery";

interface Props {
  children: ReactNode;
}

const LayoutSignUp = ({ children }: Props) => {
  const isMobile = useMediaQuery(QUERY.MOBILE);
  const navigate = useNavigate();
  const navigateLogin = () => navigate(ROUTES.login);

  return (
    <Styled.Container>
      <Styled.HeaderSignUp>
        <Styled.WrapLogo>
          {/* <Styled.ImageLogo src={Logo} alt="" /> */}
        </Styled.WrapLogo>
        <Styled.AlreadyWrap>
          {!isMobile && (
            <Styled.Already>Already have an account?</Styled.Already>
          )}
          <Styled.ButtonSignIn
            white={true}
            text="Sign In"
            onClick={navigateLogin}
          />
        </Styled.AlreadyWrap>
      </Styled.HeaderSignUp>

      {children}

      <Styled.Footer>
        <Styled.MessageFooter>
          Copyright © 2023 Enviro Capture Group Pty Ltd. All rights reserved.{" "}
        </Styled.MessageFooter>
      </Styled.Footer>
    </Styled.Container>
  );
};

export default LayoutSignUp;
