import { styled } from "styled-components";
import Button from "components/button/button";

export const Styled = {
  Container: styled.div``,
  WrapCompanyProfile: styled.div`
    margin-bottom: 60px;
  `,
  WrapTitle: styled.div`
    display: flex;
    align-items: center;
  `,
  Title: styled.span`
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 160% */
    color: ${({ theme }) => theme.colors.primary};
  `,
  Space: styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.blacks60};
    margin: 0 6px;
  `,
  SubTitle: styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.blacks60};
  `,

  WrapForm: styled.div`
    border: 0.5px solid ${({ theme }) => theme.colors.blacks20};
    padding: 32px;
    margin-top: 20px;
  `,
  BodyFormik: styled.div``,
  Form: styled.form`
    & > div:not(:last-child) {
      margin-bottom: 40px;
    }
  `,

  CompanyFacility: styled.div``,

  WrapTables: styled.div`
    margin-top: 32px;
  `,

  TotalRecords: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.text1};
    margin-bottom: 8px;
  `,
  TextRecords: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.text4};
  `,

  WrapAction: styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  `,

  TextAction: styled.span`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 16px;
    min-width: 64px;
  `,

  WrapIcon: styled.button`
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;
    line-height: 10px;
    color: ${({ theme }) => theme.colors.text4};

    &:disabled {
      color: ${({ theme }) => theme.colors.blacks10};
      cursor: no-drop;
    }
  `,

  WrapButton: styled.div`
    padding: 24px 30px;
    border: 0.5px solid ${({ theme }) => theme.colors.blacks20};
    border-top: none;
  `,
  AddFacility: styled(Button)`
    & > span:first-child {
      margin-right: 8px;
    }
  `,
  TdAbsolute: styled.td`
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  `,

  GroupButton: styled.div`
    margin-top: 40px;
    display: flex;
    justify-content: end;
  `,
  BtnDiscard: styled.span`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text1};
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-right: 8px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary_light};
    }
  `,
  BtnUpdate: styled(Button)``,
  MessageErr: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.text3};
    text-align: right;
  `,
};
