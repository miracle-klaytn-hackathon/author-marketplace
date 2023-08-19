import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styled from "styled-components";

export const ScopeTableStyle = {
  TableHead: styled(TableHead)`
    background: ${({ theme }) => theme.colors.blacks10};
  `,

  TableContainer: styled(TableContainer)`
    margin-top: 32px;
    .table-wrap {
      border: solid 1px #e5e5e5;
    }
  `,

  TableCell: styled(TableCell)`
    color: ${({ theme }) => theme.colors.primary} !important;
  `,

  ExpandRow: styled(TableRow)<any>`
    td {
      border-bottom: ${({ isExpanded }) =>
        isExpanded ? "none" : "initial"} !important;
    }
  `,

  InputType: styled.div`
    color: ${({ theme }) => theme.colors.primary} !important;
  `,

  RecordText: styled.div`
    color: ${({ theme }) => theme.colors.text4};
  `,

  IconEdit: styled.span<any>`
    cursor: pointer;
    fill {
      color: red;
    }
  `,
  IconDelete: styled.span<any>`
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
    }
  `,

  FileUpload: styled.a`
    color: ${({ theme }) => theme.colors.primary} !important;
    a {
      color: ${({ theme }) => theme.colors.primary} !important;
    }
    cursor: pointer;
    &:hover {
      text-decoration-line: underline;
    }
  `,
  CollaspedTable: styled(Table)`
    th,
    td {
      border: none;
    }
  `,
};
