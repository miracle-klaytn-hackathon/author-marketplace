import React from "react";
import LayoutSignUp from "layout/LayoutSignUp";
import Illustration from "assets/images/Illustration2.png";
import { Styled } from "./forgot-password.style";
import { Outlet } from "react-router-dom";
import useMediaQuery, { QUERY } from "hooks/useMediaQuery";

const ForgotPassword = () => {
  const isTables = useMediaQuery(QUERY.TABLETS);

  return (
    <LayoutSignUp>
      <Styled.Container>
        {!isTables && (
          <Styled.WrapImage>
            <Styled.Image src={Illustration} alt="" />
          </Styled.WrapImage>
        )}

        <Outlet />
      </Styled.Container>
    </LayoutSignUp>
  );
};

export default ForgotPassword;
