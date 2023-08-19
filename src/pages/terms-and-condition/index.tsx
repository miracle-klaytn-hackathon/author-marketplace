/* eslint-disable react/no-unescaped-entities */
import Button from "components/button/button";
import React from "react";
import LoginLogo from "assets/images/LoginLogo.png";
import { Link } from "react-router-dom";
import ROUTES from "routes/constant";
import styled from "styled-components";
import ScrollToTopButton from "components/button/ButtonScrollToTop";
import Background from "assets/images/LoginBackground.png";

const Styled = {
  Container: styled.div`
    font-size: 20px;
    margin-bottom: 20px;
    .title {
      color: ${({ theme }) => theme.colors.primary};
      text-align: center;
    }
  `,
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 60px 120px 40px 120px;
  `,
  LogoImage: styled.img`
    width: 160px;
  `,
  WrapBg: styled.div`
    background-image: url(${Background});
    background-repeat: repeat-y;
    background-size: 100% auto;
    background-position-y: 85px;
  `,
  Wrap: styled.div`
    max-width: 1036px;
    padding: 0px 20px;
    margin: 0 auto;
    .title {
      font-size: 32px;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 700;
      margin-bottom: 40px;
    }
    .update-date {
      color: ${({ theme }) => theme.colors.primary};
    }
    h1 {
      font-size: 24px;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
      margin-bottom: 8px;
    }
    h2 {
      font-size: 20px;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
      margin-bottom: 8px;
    }
    .label {
      color: ${({ theme }) => theme.colors.primary};
    }
    p {
      font-weight: 400;
      font-size: 16px;
      color: #1b1b1b;
      line-height: 24px;
      margin-bottom: 8px;
    }
    .separate {
      margin-bottom: 52px;
    }
    ul {
      padding-left: 20px;
      li {
        font-weight: 400;
        font-size: 14px;
        color: #1b1b1b;
        margin-bottom: 8px;
      }
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 14px;
      font-weight: 400;
      text-decoration: underline;
    }
    .footer {
      text-align: center;
      margin: 40px auto;
      font-weight: 400;
      font-size: 14px;
      color: #b3b3b3;
    }
  `,
};

const TermsAndCondition = () => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.LogoImage src={LoginLogo} />
        <Link to={ROUTES.login}>
          <Button text="Back to Login" white />
        </Link>
      </Styled.Header>
      <ScrollToTopButton />
      <Styled.WrapBg>
        <Styled.Wrap>
          <div className="title">TERMS AND CONDITIONS</div>
          <p>
            Last updated: <span className="update-date">July 19th, 2023</span>
          </p>
          <p>
            Please read these terms and conditions carefully before using Our
            Service.
          </p>

          <div className="footer">
            Copyright © 2023 Enviro Capture Group Pty Ltd. All rights reserved.{" "}
          </div>
        </Styled.Wrap>
      </Styled.WrapBg>
    </Styled.Container>
  );
};

export default TermsAndCondition;
