import { styled } from "styled-components";
import Button from "components/button/button";

export const Styled = {
  SignUpContainer: styled.div`
    display: grid;
    column-gap: 60px;
    grid-template-columns: 1fr 1fr;

    align-items: center;
    flex: 1;

    @media (max-width: 991.98px) {
      display: block;
    }
  `,

  WrapImage: styled.div``,
  Image: styled.img`
    width: 100%;
    max-width: 490px;
    min-width: 380px;
  `,
  WrapInfo: styled.div``,
  Title: styled.h1`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 32px;
    font-weight: 700;
    line-height: 60px;
    margin: 0;
  `,
  subTitle: styled.span`
    color: ${({ theme }) => theme.colors.text4};
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  `,

  WrapTitleStep: styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  titleStep: styled.p`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px;
  `,
  WrapBackStep: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
      color: ${({ theme }) => theme.colors.text4};
    }
  `,
  BackStep: styled.p`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    text-decoration-line: underline;
    margin-left: 8px;
  `,

  Message: styled.p`
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    color: ${({ theme }) => theme.colors.text4};
    text-align: center;
    margin-top: 20px;
  `,

  TermsSpan: styled.span`
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      text-decoration-line: underline;
    }
    a {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
};

export const StyledForm = {
  Body: styled.div`
    margin-top: 40px;
  `,

  ButtonNext: styled(Button)`
    width: 100% !important;
  `,

  Form: styled.form`
    & > div:not(:last-child) {
      margin-bottom: 40px;
    }
  `,
};
