import styled from "styled-components";
import Button from "components/button/button";
import { IconButton, TableCell, TableHead, TableRow } from "@mui/material";

export const CompanyProfileStyle = {
  Container: styled.div`
    color: ${({ theme }) => theme.colors.text1};
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    /* padding: 20px 70px; */
  `,

  HeaderProfile: styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    &.marginTop {
      margin-top: 35px;
    }

    @media (max-width: 767.98px) {
      display: block;
    }
  `,

  HeaderProfileTextLeft: styled.div`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  `,

  HeaderProfileTextRight: styled.div`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    cursor: pointer;

    @media (max-width: 767.98px) {
      margin-top: 16px;
    }
  `,

  TextSpan: styled.span`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: ${({ theme }) => theme.colors.primary};

    @media (max-width: 575.98px) {
      margin-top: 8px;
    }
  `,

  HeaderTextSpan: styled.span`
    color: ${({ theme }) => theme.colors.blacks60};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
  `,

  Button: styled(Button)`
    width: 100% !important;
  `,

  ProfileDetail: styled.div`
    padding: 20px 24px;
    border: 0.5px solid ${({ theme }) => theme.colors.blacks20};
  `,

  WrapBox: styled.div`
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 16px 0;

    @media (max-width: 575.98px) {
      display: block;
    }
  `,
  WrapTile: styled.div`
    display: flex;
    align-items: center;
    width: 240px;
  `,
  WrapMessage: styled.div`
    flex: 1;
    overflow: hidden;
  `,
  Message: styled.p`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
    color: ${({ theme }) => theme.colors.text1};

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  IconSpan: styled.span`
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
    line-height: 10px;
  `,

  TableHead: styled(TableHead)`
    background: ${({ theme }) => theme.colors.blacks10};
  `,

  TableCell: styled(TableCell)`
    color: ${({ theme }) => theme.colors.primary} !important;
    white-space: nowrap;
  `,

  RecordText: styled.span`
    color: ${({ theme }) => theme.colors.text4};
    font-size: 14px;
  `,

  ExpandRow: styled.div`
    display: flex;
    align-items: center;
  `,

  ScopeNo: styled.div`
    color: ${({ theme }) => theme.colors.primary} !important;
    margin-bottom: 25px;
  `,

  LastSubmit: styled.span`
    color: ${({ theme }) => theme.colors.blacks60};
    font-size: 12px;
  `,

  ContainerExpand: styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    justify-content: space-around;
    gap: 56px;
    padding: 0 20px;
  `,
  WrapScope: styled.div``,
  ContentExpand: styled.div`
    margin-right: 36px;
  `,

  IconSignIn: styled.div`
    line-height: 10px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text4};

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,

  Status: styled.p<{ $isStatus: boolean }>`
    color: ${({ theme, $isStatus }) =>
      $isStatus ? theme.colors.primary : theme.colors.text4};
  `,

  WrapIcon: styled(IconButton)<{ $open: boolean }>`
    transform: rotateZ(
      ${({ $open }) => ($open ? "180deg" : "0deg")}
    ) !important;
    transition: all 0.3s ease-in-out !important;
    color: ${({ theme }) => theme.colors.text4} !important;
  `,

  FacilityName: styled.p`
    overflow-wrap: anywhere;
  `,

  TableRowC: styled(TableRow)`
    cursor: pointer;
  `,
};
