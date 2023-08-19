import styled from "styled-components";
import TextField from "components/text-field/text-field";
import Button from "components/button/button";
import { Chip, Tabs } from "@mui/material";

export const Styled = {
  Container: styled.div``,
  Header: styled.div`
    margin-bottom: 24px;
    display: flex;
    align-items: center;
  `,
  Title: styled.span`
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 32px; /* 160% */
    color: ${({ theme }) => theme.colors.primary};
    margin-right: 6px;
    text-transform: uppercase;
  `,
  subTitle: styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: ${({ theme }) => theme.colors.blacks60};
  `,

  ContentScope: styled.div``,
  TopContent: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid ${({ theme }) => theme.colors.text4};
  `,

  ListTab: styled(Tabs)`
    color: ${({ theme }) => theme.colors.primary};

    button {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      color: ${({ theme }) => theme.colors.blacks60};
      text-transform: capitalize;
      &.Mui-selected {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    .MuiTabs-indicator {
      height: 1px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  `,

  WrapTab: styled.div``,
  Total: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.blacks60};

    @media (max-width: 1023.99px) {
      text-align: right;
    }
  `,
  Count: styled.span`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px; /* 155.556% */
    color: ${({ theme }) => theme.colors.primary};

    margin: 0 8px;
  `,

  TabContent: styled.div`
    padding: 24px 0;
  `,
  TabContentTop: styled.div``,
  Message: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 5px;
  `,

  WrapFiler: styled.div`
    display: grid;
    /* gap: 20px; */
    column-gap: 20px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 1509.99px) {
      grid-template-columns: 0.7fr 1fr;
    }

    @media (max-width: 1309.99px) {
      grid-template-columns: 0.5fr 1fr;
    }
    @media (max-width: 1169.99px) {
      display: block;
    }
  `,

  WrapInput: styled.div``,
  InputSearch: styled(TextField)`
    & > div:first-child {
      padding: 8px 16px;
      border: 1px solid ${({ theme }) => theme.colors.text4};
      border-radius: 10px;
    }

    input::placeholder {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      color: 1px solid ${({ theme }) => theme.colors.text4};
    }
  `,

  GroupButton: styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > button {
      flex: 1;
    }

    & > button:not(:last-child) {
      margin-right: 8px;
    }

    /* .react-datepicker__tab-loop {
          display: none;
        } */

    @media (max-width: 1169.99px) {
      margin-top: 16px;
    }
  `,

  ButtonFilter: styled(Button)`
    border: none;
    color: ${({ theme }) => theme.colors.s07};
    transition: all 0.3s ease-in-out;

    &.active {
      border: none;
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }

    &.filter-value {
      color: ${({ theme }) => theme.colors.primary};
    }

    &:hover {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
    }
  `,

  ListFilter: styled.div`
    margin: 32px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > * {
      margin-bottom: 8px !important;
    }

    & > *:not(:last-child) {
      margin-right: 16px;
    }
  `,

  ClearFilters: styled.span`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    text-decoration-line: underline;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  `,

  ChipC: styled(Chip)`
    padding: 8px 16px !important;
    border-radius: 8px !important;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px; /* 142.857% */
    color: #010101;

    svg {
      color: ${({ theme }) => theme.colors.primary} !important;
      cursor: pointer;
    }
  `,

  Content: styled.div`
    box-shadow: none;
  `,
};
