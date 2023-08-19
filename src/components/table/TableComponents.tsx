import {
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
} from "@mui/material";
import styled from "styled-components";

export const Style = {
  TableHead: styled(TableHead)`
    background: ${({ theme }) => theme.colors.blacks10};
  `,

  TableContainer: styled(TableContainer)`
    margin-top: 50px;
  `,

  TableCell: styled(TableCell)`
    color: ${({ theme }) => theme.colors.text5} !important;
  `,

  InputType: styled.div`
    color: ${({ theme }) => theme.colors.primary} !important;
  `,

  RecordText: styled.div`
    color: ${({ theme }) => theme.colors.text4};
  `,

  IconEdit: styled.span`
    cursor: pointer;
  `,
  IconDelete: styled.span``,

  FileUpload: styled.a`
    color: ${({ theme }) => theme.colors.primary} !important;
    cursor: pointer;
    &:hover {
      text-decoration-line: underline;
    }
  `,
};

export const TableCellStyled = ({ children }: TableCellProps): JSX.Element => (
  <Style.TableCell>{children}</Style.TableCell>
);

export const TableHeadStyled = ({ children }: TableCellProps): JSX.Element => (
  <Style.TableHead>{children}</Style.TableHead>
);

export const TableContainerStyled = ({ children }: any): JSX.Element => (
  <Style.TableContainer>{children}</Style.TableContainer>
);
