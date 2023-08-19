import React, { ReactNode } from "react";
import styled from "styled-components";
import Button from "./button/button";
import Logo from "assets/images/Logo_200x100.png";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import BackgroundSuccessfully from "assets/images/Success_Background.png";
import useMediaQuery, { QUERY } from "hooks/useMediaQuery";

const Styled = {
  Container: styled.div`
    background: url(${BackgroundSuccessfully}) no-repeat center center fixed;
    background-size: cover;
    padding: 60px 120px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 1440px;
    margin: auto;

    @media (max-width: 1199.98px) {
      padding: 42px 60px;
    }
    @media (max-width: 575.98px) {
      padding: 32px;
    }
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    margin-bottom: 16px;
  `,
  ButtonSignIn: styled(Button)`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,

  AlreadyWrap: styled.div``,

  Already: styled.span`
    color: ${({ theme }) => theme.colors.text4};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-right: 16px;
  `,
  WrapLogo: styled.div``,
  Logo: styled.img`
    @media (max-width: 767.98px) {
      width: 170px;
    }
    @media (max-width: 575.98px) {
      width: 150px;
    }
  `,

  Content: styled.div`
    margin-top: 28px;
    text-align: center;

    @media (max-width: 767.98px) {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,

  WrapContent: styled.div``,
  Title: styled.h2`
    font-size: 32px;
    font-style: normal;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 48px;
    color: ${({ theme }) => theme.colors.primary};
  `,
  Image: styled.img`
    max-width: 794px;
    width: 100%;
  `,
  WrapButton: styled.div`
    display: flex;
    justify-content: center;
  `,
};

interface Props {
  title: string;
  image: string;
  className?: string;
  button: ReactNode;
}

const SuccessFully = ({ title, image, button, className }: Props) => {
  const isMobile = useMediaQuery(QUERY.MOBILE);
  const navigate = useNavigate();
  const navigateSignIn = () => navigate(ROUTES.login);

  return (
    <Styled.Container className={className}>
      {!isMobile && (
        <Styled.Header>
          <Styled.AlreadyWrap>
            <Styled.Already>Already have an account?</Styled.Already>
            <Styled.ButtonSignIn
              onClick={navigateSignIn}
              white={true}
              text="Sign In"
            />
          </Styled.AlreadyWrap>
        </Styled.Header>
      )}

      <Styled.WrapLogo>
        {/* <Styled.Logo src={Logo} alt="" /> */}
      </Styled.WrapLogo>

      <Styled.Content>
        <Styled.WrapContent>
          <Styled.Title>{title}</Styled.Title>
          <Styled.Image src={image} alt="" className="image" />
          <Styled.WrapButton>{button}</Styled.WrapButton>
        </Styled.WrapContent>
      </Styled.Content>
    </Styled.Container>
  );
};

export default SuccessFully;
