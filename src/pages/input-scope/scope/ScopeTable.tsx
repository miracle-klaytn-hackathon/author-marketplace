import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Facility, InputTypeScope } from "api/scope-1/scope.interface";
import { ReactComponent as Edit_alt } from "assets/images/Edit_altScope1.svg";
import { ReactComponent as EditAltDisabled } from "assets/images/Edit_alt_disabled.svg";
import { ReactComponent as Loading } from "assets/images/Loading-blue.svg";
import { ReactComponent as ExpandDown } from "assets/images/Expand_down.svg";
import { ReactComponent as ExpandUp } from "assets/images/Expand_up.svg";
import { ReactComponent as DeleteIcon } from "assets/images/Trash.svg";
import { ReactComponent as DeleteDisabledIcon } from "assets/images/Trash_disabled.svg";
import NoDataTable from "components/NoData/NoDataTable";
import CustomTablePagination from "components/table/TablePagination";
import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { TStore, actions } from "store";
import { ScopeTableStyle as Style } from "./ScopeTableStyle";
import { getNo } from "helpers/table.helper";
import { CategoryTypes } from "constants/common";
import { ScopeStatues, ScopeStatuesColor } from "constants/scope";
import { capitalizeText } from "helpers/utils.helper";
import { deleteScopeApi } from "api/scope-1/ScopeOne";
import { toast } from "react-toastify";

interface PropsExpandableTableRow {
  children: ReactNode;
  expandComponent: InputTypeScope[];
  handleGetList: any;
  id: number;
}

interface Props {
  scopeData: { scopeManagementResList: Facility[] };
  tab?: string;
  isLoading?: boolean;
}

const ScopeTable: FC<Props> = ({ scopeData, isLoading, tab }) => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { savedParams } = useSelector((state: TStore) => state.scope);
  const handleGetList = useCallback(
    (params: any) => {
      dispatch(
        actions.scope.getListScopeOne({
          ...savedParams,
          ...params,
          // page,
          // size: rowsPerPage,
        })
      );
    },
    [dispatch, savedParams]
  );

  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
      handleGetList({
        page: newPage,
      });
    },
    [handleGetList]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newRows = Number(event.target.value);
      handleGetList({
        page: 1,
        size: newRows,
      });
      setRowsPerPage(newRows);
      setPage(1);
    },
    [handleGetList]
  );

  return (
    <>
      <Paper style={{ boxShadow: "none" }}>
        <Style.TableContainer>
          <Table className="table-wrap">
            <Style.TableHead>
              <TableRow>
                <Style.TableCell align="center" width={"8%"}>
                  NO
                </Style.TableCell>
                <Style.TableCell align="left" width={"35%"}>
                  INPUT TYPE
                </Style.TableCell>
                <Style.TableCell align="left" width={"35%"}>
                  FACILITY
                </Style.TableCell>
                <Style.TableCell align="left" width={"15%"}>
                  TOTAL RECORDS
                </Style.TableCell>
                <Style.TableCell align="right" width={"7%"} />
              </TableRow>
            </Style.TableHead>
            {scopeData?.scopeManagementResList?.length > 0 && (
              <>
                <TableBody>
                  {scopeData?.scopeManagementResList?.map((row, index) => (
                    <ExpandableTableRow
                      key={row.id}
                      id={row.id}
                      handleGetList={handleGetList}
                      expandComponent={row.inputTypeScopeList}
                    >
                      <TableCell align="center">
                        {getNo({
                          pageNumber: page,
                          pageSize: rowsPerPage,
                          index,
                        })}
                      </TableCell>
                      <TableCell align="left">
                        {row?.inputTypeName}
                        {tab === CategoryTypes.ALL && (
                          <Style.InputType>{row.categoryName}</Style.InputType>
                        )}
                      </TableCell>
                      <TableCell align="left">{row.facilityName}</TableCell>
                      <TableCell align="left">
                        {row.totalRecord}
                        <Style.RecordText>Records</Style.RecordText>
                      </TableCell>
                    </ExpandableTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <CustomTablePagination
                      total={
                        scopeData?.scopeManagementResList?.[0]?.totalRows || 0
                      }
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </>
            )}
          </Table>
        </Style.TableContainer>
      </Paper>
      <>
        {scopeData?.scopeManagementResList?.length == 0 && !isLoading && (
          <NoDataTable
            isSearch={
              savedParams?.inputTypeScopeStatuses?.length ||
              savedParams?.facilities?.length ||
              savedParams?.category?.length ||
              savedParams?.inputType ||
              savedParams?.fromDate
                ? true
                : false
            }
            onOk={() => navigate(`${ROUTES.scope1}/${ROUTES.create}`)}
          />
        )}
      </>
    </>
  );
};
export default ScopeTable;

const ExpandableTableRow = ({
  children,
  expandComponent,
  handleGetList,
  id,
}: PropsExpandableTableRow) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [internalLoading, setInternalLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const isDisabledEditRecord = useCallback(
    (status) =>
      status !== ScopeStatues.IN_DRAFT && status !== ScopeStatues.SUBMITTED,
    []
  );
  const isDisableDeleteRecord = useCallback(
    (status) =>
      status !== ScopeStatues.IN_DRAFT &&
      status !== ScopeStatues.SUBMITTED &&
      status !== ScopeStatues.INVALID,
    []
  );

  const handleDelete = useCallback(
    (id: number) => {
      setInternalLoading(true);
      deleteScopeApi(id)
        .then(() => {
          handleGetList({});
          toast.success("Deleted successful");
        })
        .catch((err) => toast.error(err.message))
        .finally(() => {
          setInternalLoading(false);
        });
    },
    [handleGetList]
  );
  return (
    <>
      <Style.ExpandRow isExpanded={isExpanded} key={id}>
        {children}
        <TableCell padding="checkbox">
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandUp /> : <ExpandDown />}
          </IconButton>
        </TableCell>
      </Style.ExpandRow>
      {expandComponent.length > 0 && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box>
                <Style.CollaspedTable size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell width={"7%"} />
                      <Style.TableCell width={"15%"}>
                        CONSUMPTION <br /> DATE
                      </Style.TableCell>
                      <Style.TableCell width={"15%"}>INPUT</Style.TableCell>
                      <Style.TableCell width={"15%"}>OUTPUT</Style.TableCell>
                      <Style.TableCell width={"15%"}>STATUS</Style.TableCell>
                      <Style.TableCell width={"15%"}>
                        UPLOADED FILE
                      </Style.TableCell>
                      <Style.TableCell width={"15%"}>CUSTOMER</Style.TableCell>
                      <Style.TableCell width={"8%"}>ACTION</Style.TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {expandComponent.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell />
                        <TableCell>{row.consumptionDate}</TableCell>
                        <TableCell>{`${row?.consumptionValue || 0} ${
                          row.inputTypeUnitName
                        }`}</TableCell>
                        <TableCell>{`${row?.outputConsumptionValue || 0} ${
                          row.outputTypeUnitName
                        }`}</TableCell>
                        <TableCell
                          style={{
                            color: (ScopeStatuesColor as any)?.[row.status],
                          }}
                        >
                          {capitalizeText(
                            String(row.status)?.replace("_", " ")
                          )}
                        </TableCell>
                        <TableCell>
                          <Style.FileUpload>
                            {row.imageLink && (
                              <a
                                href={row.imageLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {row?.imageName}{" "}
                              </a>
                            )}
                          </Style.FileUpload>
                        </TableCell>
                        <TableCell>{row.customerName}</TableCell>
                        <TableCell>
                          <Style.IconEdit
                            disabled={isDisabledEditRecord(row.status)}
                            onClick={() => {
                              if (isDisabledEditRecord(row.status)) {
                                return;
                              }
                              navigate(`${ROUTES.scope1}/${row.id}`);
                            }}
                          >
                            {isDisabledEditRecord(row.status) ? (
                              <EditAltDisabled />
                            ) : (
                              <Edit_alt />
                            )}
                          </Style.IconEdit>

                          <Style.IconDelete
                            disabled={isDisableDeleteRecord(row.status)}
                            onClick={() => {
                              if (isDisableDeleteRecord(row.status)) {
                                return;
                              }
                              handleDelete(row.id);
                            }}
                          >
                            {internalLoading ? (
                              <Loading />
                            ) : isDisabledEditRecord(row.status) ? (
                              <DeleteDisabledIcon />
                            ) : (
                              <DeleteIcon />
                            )}
                          </Style.IconDelete>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Style.CollaspedTable>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
