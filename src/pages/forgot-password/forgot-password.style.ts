import Button from "components/button/button";
import { styled } from "styled-components";

export const Styled = {
  Container: styled.div`
    display: grid;
    column-gap: 60px;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    flex: 1;

    @media (max-width: 991.98px) {
      display: flex;
    }
  `,

  WrapImage: styled.div``,
  Image: styled.img`
    width: 100%;
    max-width: 400px;
    min-width: 350px;
  `,
  WrapInfo: styled.div`
    flex: 1;
  `,
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

  BackTo: styled.div`
    display: flex;
    justify-content: center;
  `,

  BackToMessage: styled.span`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;

    cursor: pointer;
    margin-top: 18px;
    transition: all 0.3s ease-in-out;

    &:hover {
      text-decoration: underline;
    }
  `,
};
