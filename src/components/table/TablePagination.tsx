import {
  Pagination,
  TablePagination,
  TablePaginationBaseProps,
} from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

export const Styled = {
  WrapPagination: styled(TablePagination)<any>`
    .MuiPagination-ul {
      flex-wrap: nowrap;

      & > li {
        margin: 0 3px;
        button {
          min-width: 28px;
          height: 28px;
          margin: 0;

          svg {
            color: ${({ theme }) => theme.colors.blacks20};
          }
        }
      }
    }
  `,
};

interface Props {
  total: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (event: any, page: number) => void;
  onRowsPerPageChange?: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
}

const CustomTablePagination: FC<Props & TablePaginationBaseProps> = ({
  total,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Styled.WrapPagination
      labelRowsPerPage="Display"
      rowsPerPageOptions={[10, 20, 50, 100]}
      colSpan={5}
      count={total}
      rowsPerPage={rowsPerPage}
      page={page - 1}
      SelectProps={{
        inputProps: {
          "aria-label": "a per page",
        },
        native: true,
      }}
      onPageChange={() => {
        return;
      }}
      // onPageChange={(e, page) => onPageChange(e, page + 1)}
      onRowsPerPageChange={onRowsPerPageChange}
      ActionsComponent={(subProps: any) =>
        total > 0 ? (
          <Pagination
            count={Math.ceil(total / rowsPerPage)} // total page
            page={page}
            shape="circular"
            boundaryCount={0}
            showFirstButton
            showLastButton
            onChange={(e, page) => onPageChange(e, page)}
          />
        ) : null
      }
      sx={{
        "& .MuiInputBase-root": {
          margin: "0px 8px",
          border: "1px solid #CCC",
        },
        "& .css-m3l1ig-MuiNativeSelect-select-MuiInputBase-input.css-m3l1ig-MuiNativeSelect-select-MuiInputBase-input.css-m3l1ig-MuiNativeSelect-select-MuiInputBase-input":
          {
            height: 24,
            padding: "0px 24px 0px 8px",
          },
      }}
    />
  );
};
export default CustomTablePagination;
