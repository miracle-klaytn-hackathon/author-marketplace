import styled from "styled-components";
import Background from "assets/images/LoginBackground.png";
import Button from "components/button/button";

const LoginStyled = {
  Container: styled.div`
    background-image: url(${Background});
    padding: 70px 0;
    height: 100vh;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Button: styled(Button)`
    width: 100% !important;
  `,

  TextTerms: styled.span`
    color: ${({ theme }) => theme.colors.text4};
    @media (max-width: 500px) {
      font-size: 12px;
    }
  `,

  LogoImage: styled.img`
    width: 320px;
    height: 160px;
    @media (max-width: 1199.98px) {
      width: 223px;
      height: 122px;
    }
  `,

  Link: styled.a`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      text-decoration-line: underline;
    }

    @media (max-width: 575.98px) {
      font-size: 14px;
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  LogoImageDiv: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
    height: 100hv;

    @media (max-width: 1199.98px) {
      margin-bottom: 20px;
    }

    @media (max-width: 575.98px) {
      margin-bottom: 30px;
    }

    @media (max-width: 280px) {
      margin-bottom: 90px;
      margin-top: 165px;
    }
  `,

  Row: styled.div`
    width: 590px;

    @media (max-width: 991.98px) {
      padding: 0px 15px;
    }
  `,

  FieldInput: styled.div`
    margin-bottom: 40px;
  `,

  ForgotPassword: styled.div`
    margin-bottom: 40px;
    display: flex;
    justify-content: right;
  `,

  SignUp: styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 575.98px) {
      flex-direction: column;
    }
  `,

  CoppyRight: styled.div`
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    @media (max-width: 991.98px) {
      margin-top: 30px;
      font-size: 12px;
    }
  `,
};

export default LoginStyled;
