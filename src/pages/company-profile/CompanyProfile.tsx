import React, { ReactNode, useEffect, useState } from "react";

import { CompanyProfileStyle as Style } from "./company-profile.style";
import { ReactComponent as EditIcon } from "assets/images/Edit_alt.svg";
import { ReactComponent as SortAlfa } from "assets/images/Sort_alfa.svg";
import { ReactComponent as World2Light } from "assets/images/world_2_light.svg";
import { ReactComponent as LinkIcon } from "assets/images/link.svg";
import { ReactComponent as ChartAlt } from "assets/images/Chart_alt.svg";
import { ReactComponent as ExpandUp } from "assets/images/Expand_up.svg";
import { ReactComponent as ExpandDown } from "assets/images/Expand_down.svg";
import { ReactComponent as SignInSqure } from "assets/images/Sign_in_squre_light.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import {
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getListCompanyFacility } from "api/company-profile/companyProfileList";
import { toast } from "react-toastify";
import FacilityEmpty from "./FacilityEmpty";
import { optionsSize } from "pages/sign-up/FormCompanyInfo";

export interface CompanyProfile {
  id: number;
  countryId: number;
  countryName: string;
  name: string;
  size: string;
  website: string;
}

export interface Facilities {
  facilityId: number;
  facilityName: string;
  facilityLastSubmit: string;
  totalRecords: number;
  status: string;
  scopeFirstTotalRecords: number;
  scopeFirstLastSubmit: string;
  scopeSecondTotalRecords: number;
  scopeSecondLastSubmit: string;
  scopeThirdTotalRecords: number;
  scopeThirdLastSubmit: string;
}

interface PaginationType {
  page: number;
  size: number;
  totalItem: number;
  totalPage: number;
}

const CompanyProfile = () => {
  const navigate = useNavigate();
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [totalItem, setTotalItem] = React.useState(10);
  const [companyData, setCompanyData] = useState<CompanyProfile>();
  const [facilityData, setFacilityData] = useState<Facilities[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    size: 10,
    totalItem: 0,
    totalPage: 1,
  });

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setPagination((values) => ({ ...values, size: +event.target.value }));
  }

  const handleGetListCompanyFacility = (page: number, size: number) => {
    getListCompanyFacility({ page, size })
      .then((res) => {
        if (res?.statusCode == 200) {
          const { companyFacilityResponseListObjResponse, companyProfile } =
            res.data;
          setCompanyData(companyProfile);
          setFacilityData(companyFacilityResponseListObjResponse.data);
          setPagination({
            page: companyFacilityResponseListObjResponse.page,
            size: companyFacilityResponseListObjResponse.page_size,
            totalItem: companyFacilityResponseListObjResponse.total_item,
            totalPage: companyFacilityResponseListObjResponse.total_page,
          });
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("There is something wrong. Please try again!");
      });
  };

  const onChangePage = (event: any, page: number) => {
    setPagination((values) => ({ ...values, page }));
  };

  useEffect(() => {
    handleGetListCompanyFacility(pagination.page, pagination.size);
  }, [pagination.page, pagination.size]);

  return (
    <Style.Container>
      <Style.HeaderProfile>
        <Style.HeaderProfileTextLeft>
          COMPANY PROFILE
          <Style.HeaderTextSpan>&nbsp;- Overview</Style.HeaderTextSpan>
        </Style.HeaderProfileTextLeft>
        <Style.HeaderProfileTextRight>
          <Style.Button
            type="submit"
            text="Edit Company"
            className="btn-success"
            disabled={false}
            icon={<EditIcon />}
            onClick={() => navigate(ROUTES.edit)}
          />
        </Style.HeaderProfileTextRight>
      </Style.HeaderProfile>

      <Style.ProfileDetail>
        <Style.WrapBox>
          <Style.WrapTile>
            <Style.IconSpan>{<SortAlfa />}</Style.IconSpan>
            <Style.TextSpan>Company Name</Style.TextSpan>
          </Style.WrapTile>
          <Style.WrapMessage>
            <Style.Message>{companyData?.name || ""}</Style.Message>
          </Style.WrapMessage>
        </Style.WrapBox>
        <Style.WrapBox>
          <Style.WrapTile>
            <Style.IconSpan>{<World2Light />}</Style.IconSpan>
            <Style.TextSpan>Company Country</Style.TextSpan>
          </Style.WrapTile>
          <Style.WrapMessage>
            <Style.Message>{companyData?.countryName || ""}</Style.Message>
          </Style.WrapMessage>
        </Style.WrapBox>
        <Style.WrapBox>
          <Style.WrapTile>
            <Style.IconSpan>{<LinkIcon />}</Style.IconSpan>
            <Style.TextSpan>Company Website</Style.TextSpan>
          </Style.WrapTile>
          <Style.WrapMessage>
            <Style.Message>{companyData?.website || ""}</Style.Message>
          </Style.WrapMessage>
        </Style.WrapBox>
        <Style.WrapBox>
          <Style.WrapTile>
            <Style.IconSpan>{<ChartAlt />}</Style.IconSpan>
            <Style.TextSpan>Company Size</Style.TextSpan>
          </Style.WrapTile>
          <Style.WrapMessage>
            <Style.Message>
              {optionsSize.find((item) => item.value === companyData?.size)
                ?.label || ""}
            </Style.Message>
          </Style.WrapMessage>
        </Style.WrapBox>
      </Style.ProfileDetail>

      <Style.HeaderProfile className="marginTop">
        <Style.HeaderProfileTextLeft>
          COMPANY FACILITY
          <Style.HeaderTextSpan>&nbsp;- Listing</Style.HeaderTextSpan>
        </Style.HeaderProfileTextLeft>
      </Style.HeaderProfile>

      <TableContainer component={Paper} className="table-enviro">
        <Table aria-label="simple table">
          <Style.TableHead>
            <TableRow>
              <Style.TableCell align="center" width={100}>
                NO.
              </Style.TableCell>
              <Style.TableCell width={"30%"}>FACILITY NAME</Style.TableCell>
              <Style.TableCell width={"25%"}>LAST SUBMIT</Style.TableCell>
              <Style.TableCell width={"25%"}>TOTAL RECORDS</Style.TableCell>
              <Style.TableCell>STATUS</Style.TableCell>
              <Style.TableCell align="center" width={100} />
            </TableRow>
          </Style.TableHead>
          {!!facilityData.length && (
            <>
              {/* // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */}
              <TableBody>
                {facilityData.map((row, index) => (
                  <ExpandableTableRow
                    key={row.facilityId}
                    expandComponent={row}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="left">
                      <div>
                        <Style.FacilityName>
                          {row.facilityName}
                        </Style.FacilityName>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div>{row.facilityLastSubmit}</div>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        <p>{row.totalRecords}</p>
                        <Style.RecordText>Records</Style.RecordText>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      <div>
                        <Style.Status $isStatus={row.status === "ACTIVE"}>
                          {row.status}
                        </Style.Status>
                      </div>
                    </TableCell>
                  </ExpandableTableRow>
                ))}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    labelRowsPerPage="Display"
                    rowsPerPageOptions={[10, 20, 50, 100]}
                    count={pagination.totalItem}
                    rowsPerPage={pagination.size}
                    page={
                      !pagination.totalItem || pagination.totalItem <= 0
                        ? 0
                        : pagination.page - 1
                    }
                    onPageChange={() => {
                      return;
                    }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    // labelDisplayedRows={() => "results per page"}
                    sx={{
                      "& .MuiTablePagination-actions": {
                        marginRight: "30px",
                      },
                      "& .css-16c50h-MuiInputBase-root-MuiTablePagination-select":
                        {
                          margin: "0px 8px",
                        },
                      "& .MuiSelect-select": { border: "1px solid #CCC" },
                    }}
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
                </TableRow>
              </TableFooter>
            </>
          )}
        </Table>
      </TableContainer>
      {!facilityData.length && <FacilityEmpty />}
    </Style.Container>
  );
};

export default CompanyProfile;

interface PropsExpandableTableRow {
  children: ReactNode;
  expandComponent: Facilities;
}

const ExpandableTableRow = ({
  children,
  expandComponent,
}: PropsExpandableTableRow) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleNavigateScope = (name: string, id: string | number) => {
    navigate({
      pathname: `/${name}`,
      search: createSearchParams({
        facilityId: String(id),
      }).toString(),
    });
  };

  return (
    <>
      <Style.TableRowC onClick={() => setIsExpanded(!isExpanded)}>
        {children}
        <TableCell>
          <Style.WrapIcon $open={isExpanded}>
            <ExpandDown />
          </Style.WrapIcon>
        </TableCell>
      </Style.TableRowC>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <Style.ContainerExpand>
              <Style.WrapScope>
                <Style.ScopeNo>SCOPE 1</Style.ScopeNo>
                <Style.ExpandRow>
                  <Style.ContentExpand>
                    <div>
                      <span>{expandComponent.scopeFirstTotalRecords} </span>
                      <Style.RecordText>Submitted record(s)</Style.RecordText>
                    </div>

                    <Style.LastSubmit>
                      Last submit: {expandComponent.scopeFirstLastSubmit}
                    </Style.LastSubmit>
                  </Style.ContentExpand>
                  <Style.IconSignIn
                    onClick={() =>
                      handleNavigateScope("scope1", expandComponent.facilityId)
                    }
                  >
                    <SignInSqure />
                  </Style.IconSignIn>
                </Style.ExpandRow>
              </Style.WrapScope>

              <Style.WrapScope>
                <Style.ScopeNo>SCOPE 2</Style.ScopeNo>
                <Style.ExpandRow>
                  <Style.ContentExpand>
                    <div>
                      <span>{expandComponent.scopeSecondTotalRecords} </span>
                      <Style.RecordText>Submitted record(s)</Style.RecordText>
                    </div>
                    <Style.LastSubmit>
                      Last submit: {expandComponent.scopeSecondLastSubmit}
                    </Style.LastSubmit>
                  </Style.ContentExpand>
                  <Style.IconSignIn
                    onClick={() =>
                      handleNavigateScope("scope2", expandComponent.facilityId)
                    }
                  >
                    <SignInSqure />
                  </Style.IconSignIn>
                </Style.ExpandRow>
              </Style.WrapScope>

              <Style.WrapScope>
                <Style.ScopeNo>SCOPE 3</Style.ScopeNo>
                <Style.ExpandRow>
                  <Style.ContentExpand>
                    <div>
                      <span>{expandComponent.scopeThirdTotalRecords} </span>
                      <Style.RecordText>Submitted record(s)</Style.RecordText>
                    </div>
                    <Style.LastSubmit>
                      Last submit: {expandComponent.scopeThirdLastSubmit}
                    </Style.LastSubmit>
                  </Style.ContentExpand>
                  <Style.IconSignIn
                    onClick={() =>
                      handleNavigateScope("scope3", expandComponent.facilityId)
                    }
                  >
                    <SignInSqure />
                  </Style.IconSignIn>
                </Style.ExpandRow>
              </Style.WrapScope>
            </Style.ContainerExpand>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
