import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableFooter,
  TablePagination,
  Pagination,
} from "@mui/material";
import TextField from "components/text-field/text-field";
import { Styled } from "./edit.company-profile.style";
import { ReactComponent as IconDelete } from "assets/images/Delete.svg";
import { Switch } from "components/switch";
import FacilityEmpty from "../FacilityEmpty";
import Button from "components/button/button";
import { CompanyFacility, Pagination as PaginationType } from ".";
import { useMemo, useState } from "react";
import { ReactComponent as IconPlus } from "assets/images/bx-plus.svg";
import { guidGenerator } from "utils/functions";

interface PropsTable {
  data: CompanyFacility[];
  onChangeDataTable: (params: CompanyFacility[]) => void;
  pagination: PaginationType;
  onPagination: React.Dispatch<React.SetStateAction<PaginationType>>;
}

interface RowProps {
  row: CompanyFacility;
  index: number;
  onDelete: (value: CompanyFacility) => void;
  onChangeStatus: (value: CompanyFacility) => void;
  onChangeName: (value: CompanyFacility) => void;
}

const Row = ({
  row,
  index,
  onDelete,
  onChangeStatus,
  onChangeName,
}: RowProps) => {
  const [name, setName] = useState(row.name || "");

  const handleBlur = () => {
    if (name !== row.name) {
      onChangeName({ ...row, name: name });
    }
  };

  return (
    <>
      {!row?.delete ? (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell scope="row" align="center">
            {index + 1}
          </TableCell>

          <TableCell>
            <div>
              <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={handleBlur}
                placeholder="Enter the facility name"
                isError={!!row?.isValid && !name}
              />
              {!!row?.isValid && !name && (
                <Styled.MessageErr id="message-error">
                  Inline Error Message
                </Styled.MessageErr>
              )}
            </div>
          </TableCell>
          <TableCell>
            <div>
              <Styled.TotalRecords>
                {row?.totalRecords || 0}
              </Styled.TotalRecords>
              <Styled.TextRecords>Records</Styled.TextRecords>
            </div>
          </TableCell>

          <TableCell>
            <Styled.WrapAction>
              <Switch
                checked={row.status === "ACTIVE"}
                onChange={() => onChangeStatus(row)}
              />
              <Styled.TextAction>
                {row.status === "ACTIVE" ? "Active" : "Inactive"}
              </Styled.TextAction>
            </Styled.WrapAction>
          </TableCell>
          <TableCell align="center">
            <Styled.WrapIcon
              disabled={!!row?.totalRecords}
              onClick={() => onDelete(row)}
            >
              <IconDelete />
            </Styled.WrapIcon>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
};

const TableEdit = ({
  data,
  onChangeDataTable,
  onPagination,
  pagination,
}: PropsTable) => {
  const [countAddFacility, setCountAddFacility] = useState(0);
  const dataFilter = useMemo(
    () => data.filter((item) => !item?.delete),
    [data]
  );

  const handleDeleteFacility = (row: CompanyFacility) => {
    if (Object.prototype.hasOwnProperty.call(row, "delete")) {
      const newData = [...data].map((item) => {
        if (item.id === row.id) {
          return {
            ...item,
            delete: true,
          };
        }

        return item;
      });
      onChangeDataTable(newData);
    } else {
      const newData = [...data].filter((item) => item.id !== row.id);
      onChangeDataTable(newData);
      setCountAddFacility((value) => value - 1);
    }
  };

  const handleChangeStatus = (row: CompanyFacility) => {
    const newData: CompanyFacility[] = [...data].map((item) => {
      if (item.id === row.id) {
        return {
          ...item,
          status: item.status === "INACTIVE" ? "ACTIVE" : "INACTIVE",
        };
      }

      return item;
    });
    onChangeDataTable(newData);
  };

  const handleChangeFacilityName = (row: CompanyFacility) => {
    const newData = [...data].map((item) => {
      if (item.id === row.id) {
        return row;
      }

      return item;
    });

    onChangeDataTable(newData);
  };

  const handleAddFacility = () => {
    setCountAddFacility((value) => value + 1);
    onChangeDataTable([
      ...data,
      {
        id: guidGenerator(),
        name: "",
        status: "ACTIVE",
        new: true,
        totalRecords: 0,
      },
    ]);
  };

  const handleChangeSize = (size: number) => {
    onPagination((values) => ({ ...values, size }));
  };

  const onChangePage = (event: any, page: number) => {
    onPagination((values) => ({ ...values, page }));
  };

  return (
    <>
      <TableContainer component={Paper} className="table-enviro">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center" width={100}>
                No.
              </TableCell>
              <TableCell component="th" width={"40%"}>
                FACILITY NAME
              </TableCell>
              <TableCell component="th">TOTAL RECORDS</TableCell>
              <TableCell component="th">STATUS</TableCell>
              <TableCell component="th" align="center" width={160}>
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>

          {!!dataFilter.length && (
            <>
              <TableBody>
                {dataFilter.map((row, index) => (
                  <Row
                    row={row}
                    index={index}
                    key={row.id}
                    onDelete={handleDeleteFacility}
                    onChangeStatus={handleChangeStatus}
                    onChangeName={handleChangeFacilityName}
                  />
                ))}
              </TableBody>

              <TableFooter>
                <tr>
                  <TablePagination
                    labelRowsPerPage="Display"
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    count={pagination.totalSize}
                    rowsPerPage={pagination.size}
                    page={
                      !pagination.totalSize || pagination.totalSize <= 0
                        ? 0
                        : pagination.page - 1
                    }
                    onPageChange={() => {
                      return;
                    }}
                    onRowsPerPageChange={(event) =>
                      handleChangeSize(+event.target.value)
                    }
                    // labelDisplayedRows={() => "results per page"}
                    sx={{
                      "& .MuiTablePagination-actions": {
                        marginLeft: "0px",
                        marginRight: "30px",
                      },
                      "& .css-16c50h-MuiInputBase-root-MuiTablePagination-select":
                        {
                          margin: "0px 8px",
                          minWidth: "64px",

                          ".MuiTablePagination-select": {
                            textAlignLast: "center",
                          },
                        },
                      "& .MuiSelect-select": { border: "1px solid #CCC" },
                    }}
                    // component="section"
                    ActionsComponent={(subProps: any) => {
                      return (
                        <>
                          {pagination.totalPage > 1 ? (
                            <Pagination
                              count={pagination.totalPage}
                              page={pagination.page}
                              shape="circular"
                              boundaryCount={0}
                              showFirstButton
                              showLastButton
                              onChange={onChangePage}
                            />
                          ) : null}
                        </>
                      );
                    }}
                  />
                  <Styled.TdAbsolute>
                    <Styled.AddFacility
                      onClick={handleAddFacility}
                      white
                      icon={<IconPlus />}
                      text="Add Facility"
                      disabled={countAddFacility === 10}
                    />
                  </Styled.TdAbsolute>
                </tr>
              </TableFooter>
            </>
          )}
        </Table>
      </TableContainer>

      {!dataFilter.length && (
        <FacilityEmpty
          button={
            <Button
              text="Add a new facility now"
              onClick={handleAddFacility}
              white={true}
            />
          }
        />
      )}
    </>
  );
};

export default TableEdit;
