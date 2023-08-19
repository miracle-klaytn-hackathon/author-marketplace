import { styled } from "styled-components";
import Button from "components/button/button";

export const Styled = {
  Container: styled.div`
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

  HeaderSignUp: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
  `,

  WrapLogo: styled.div``,
  ImageLogo: styled.img``,
  ButtonSignIn: styled(Button)`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};

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

  Footer: styled.div`
    margin-top: 108px;
  `,
  MessageFooter: styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.text4};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
};
