import { Box, Tab, tabsClasses } from "@mui/material";
import { ReactComponent as IconCalendar } from "assets/images/Calendar.svg";
import { ReactComponent as IconClose } from "assets/images/Close_round.svg";
import { ReactComponent as IconFilter } from "assets/images/Filter_alt.svg";
import { ReactComponent as IconSearch } from "assets/images/Search_alt.svg";
import { ReactComponent as IconBlus } from "assets/images/bx-plus.svg";
import Button from "components/button/button";
import PickerWithButtonField, { FilterDate } from "components/dateRangePicker";
import PopupCheckboxMultiple, {
  Option,
} from "components/popup/PopupCheckboxMultiple";
import useMediaQuery, { QUERY } from "hooks/useMediaQuery";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Styled } from "./layout-scope.styled";

import { IGetListScope } from "api/scope-1/scope.interface";
import { debounce } from "lodash";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { TStore, actions, useDispatch, useSelector } from "store";
import { MenuItemsStatusOptions } from "../../constants/scope";

interface TabProps {
  value: string | number;
  label: string;
}

export interface ParamsFilter {
  search: string;
  facility: Option[];
  status: Option[];
  date: FilterDate | undefined;
}

interface LayoutScope {
  title: string;
  total: number;
  tabs: TabProps[];
  tab: number | string;
  ContentTab: ReactNode;
  children?: ReactNode;
  onChangeTab: (tab: string) => void;
  onClickAdd?: () => void;
  onFilter: (data: IGetListScope) => void; // update type later
}

const LayoutScope = ({
  title,
  total,
  tabs,
  tab,
  ContentTab,
  onChangeTab,
  onClickAdd,
  onFilter,
  children,
}: LayoutScope) => {
  const [filter, setFilter] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [filterFacility, setFiLterFacility] = useState<Option[]>([]);
  const [filterStatus, setFiLterStatus] = useState<Option[]>([]);
  const [filterDate, setFilterDate] = useState<undefined | FilterDate>();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const { search } = useLocation();

  const dispatch = useDispatch();
  const [anchorCalendar, setAnchorElCalendar] =
    React.useState<HTMLButtonElement | null>(null);
  const isDesktop = useMediaQuery(QUERY.DESKTOP);
  const isDesktopSmall = useMediaQuery(QUERY.DESKTOP_SMALL);
  // const isMobileLarge = useMediaQuery(QUERY.MOBILE_LARGE);
  const { savedParams } = useSelector((state: TStore) => state.scope);
  const listCompany = useSelector((state: TStore) => state.company.listCompany);

  const companyFacilityOptions = useMemo(
    (): Option[] =>
      listCompany?.companyFacilityResponseListObjResponse?.data?.map(
        (item) => ({
          label: item.facilityName,
          value: item.facilityId,
        })
      ) || [],
    [listCompany?.companyFacilityResponseListObjResponse?.data]
  );

  const handleClickCalendar = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.className += " active";
    setAnchorElCalendar(event.currentTarget);
  };

  const handleClickFilter = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    setFilter(value);
    event.currentTarget.className += " active";
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    await setAnchorEl(null);
    await setTimeout(() => setFilter(""), 100);
  };

  const handleChange = (event: any, value: string) => {
    onChangeTab(value);
    // handleClearFilter();
    setValueSearch("");
  };

  const handleFilter = (payload: Option[]) => {
    if (filter === "Facility") {
      onFilter({
        ...savedParams,
        facilities: payload?.map((i) => Number(i.value)) || undefined,
      });
      setFiLterFacility(payload);
      return;
    }
    onFilter({
      ...savedParams,
      inputTypeScopeStatuses: payload?.map((i) => String(i.value)) || undefined,
    });
    setFiLterStatus(payload);
  };

  const handleFilterDate = (date: FilterDate) => {
    setFilterDate(date);
    onFilter({
      ...savedParams,
      fromDate: date?.from,
      toDate: date?.to,
    });
  };

  const handleDeleteFacility = (facility: Option) => {
    const listFiltered = filterFacility.filter(
      (item) => item.value !== facility.value
    );
    onFilter({
      ...savedParams,
      facilities: listFiltered?.map((i) => Number(i.value)) || undefined,
    });

    setFiLterFacility(listFiltered);
  };
  const handleDeleteDate = () => {
    onFilter({
      ...savedParams,
      fromDate: undefined,
      toDate: undefined,
    });
    setFilterDate(undefined);
  };

  const handleDeleteStatus = (status: Option) => {
    const statusFiltered = filterStatus.filter(
      (item) => item.value !== status.value
    );
    onFilter({
      ...savedParams,
      inputTypeScopeStatuses:
        statusFiltered?.map((i) => String(i.value)) || undefined,
    });
    setFiLterStatus(statusFiltered);
  };

  const handleClearFilter = () => {
    onFilter({
      ...savedParams,
      facilities: undefined,
      inputType: undefined,
      inputTypeScopeStatuses: undefined,
      toDate: undefined,
      fromDate: undefined,
    });
    setValueSearch("");
    setFiLterFacility([]);
    setFiLterStatus([]);
    setFilterDate(undefined);
  };

  const searchText = useCallback(
    (value?: string) => {
      onFilter({ ...savedParams, inputType: value });
    },
    [savedParams, onFilter]
  );

  const debouncedSearchText = useMemo(() => {
    return debounce(searchText, 500);
  }, [searchText]);

  // now send request is debounced
  const populateFilterFromUrl = useCallback(() => {
    if (search) {
      const params = queryString.parse(search);
      if (!params?.facilityId) {
        return;
      }
      const facilitySelected = companyFacilityOptions?.find(
        (i) => i.value === Number(params?.facilityId)
      );
      if (facilitySelected) {
        onFilter({
          ...savedParams,
          facilities:
            [facilitySelected]?.map((i) => Number(i.value)) || undefined,
        });
        setFiLterFacility([facilitySelected]);
      }
    }
  }, [companyFacilityOptions, onFilter, savedParams, search]);

  useEffect(() => {
    populateFilterFromUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyFacilityOptions]);
  useEffect(() => {
    return () => {
      dispatch(
        actions.scope.getListScopeOne({
          size: 10,
          page: 1,
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Title>{title}</Styled.Title>
        <Styled.subTitle> - Listing</Styled.subTitle>
      </Styled.Header>

      <Styled.ContentScope>
        <Styled.TopContent>
          <Styled.WrapTab>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: {
                  xs: 320,
                  sm: isDesktop && !isDesktopSmall ? 480 : "max-content",
                  lg: 780,
                },
                bgcolor: "background.paper",
              }}
            >
              <Styled.ListTab
                value={tab}
                onChange={handleChange}
                variant="scrollable"
                textColor="inherit"
                // scrollButtons={(isDesktop && !isDesktopSmall) || isMobileLarge || true}
                allowScrollButtonsMobile
                aria-label="visible arrows tabs"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                {tabs.map((tab) => (
                  <Tab label={tab.label} value={tab.value} key={tab.value} />
                ))}
              </Styled.ListTab>
            </Box>
          </Styled.WrapTab>
          {!isDesktopSmall && (
            <Styled.Total>
              Total submitted Carbon emission:
              <Styled.Count>
                {Number(total)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Styled.Count>
              tCO2-e (tonnes)
            </Styled.Total>
          )}
        </Styled.TopContent>

        <Styled.TabContent>
          {isDesktopSmall && (
            <Styled.Total>
              Total submitted Carbon emission:
              <Styled.Count>
                {Number(total)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Styled.Count>
              tCO2-e (tonnes)
            </Styled.Total>
          )}
          <Styled.TabContentTop>
            <Styled.Message>Search</Styled.Message>
            <Styled.WrapFiler>
              <Styled.WrapInput>
                <Styled.InputSearch
                  value={valueSearch}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValueSearch(e.target.value);
                    debouncedSearchText(e.target.value);
                  }}
                  type="text"
                  placeholder="Search by input type"
                  suffix={<IconSearch />}
                />
              </Styled.WrapInput>

              <Styled.GroupButton>
                <Styled.ButtonFilter
                  white
                  icon={<IconFilter />}
                  aria-describedby={"simple-popover"}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClickFilter(e, "Facility")
                  }
                  text="Filter by Facility"
                  className={filterFacility.length ? "filter-value" : ""}
                />

                <Styled.ButtonFilter
                  white
                  aria-describedby={"simple-popover"}
                  onClick={handleClickCalendar}
                  icon={<IconCalendar />}
                  text="Filter by Date"
                  className={filterDate ? "filter-value" : ""}
                />

                <Styled.ButtonFilter
                  icon={<IconFilter />}
                  text="Filter by Status"
                  aria-describedby={"simple-popover"}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleClickFilter(e, "Status")
                  }
                  white
                  className={filterStatus.length ? "filter-value" : ""}
                />
                <Button
                  icon={<IconBlus />}
                  text="Add Record"
                  onClick={onClickAdd}
                />
              </Styled.GroupButton>
            </Styled.WrapFiler>
          </Styled.TabContentTop>
          {!!(filterFacility.length || filterDate || filterStatus.length) && (
            <Styled.ListFilter>
              <Styled.ClearFilters onClick={handleClearFilter}>
                Clear all filters
              </Styled.ClearFilters>

              {filterFacility.map((item) => (
                <Styled.ChipC
                  key={item.value}
                  label={`Facility: ${item.label}`}
                  onDelete={() => handleDeleteFacility(item)}
                  deleteIcon={<IconClose />}
                />
              ))}

              {filterDate && (
                <Styled.ChipC
                  label={`Date: ${filterDate.from} - ${filterDate.to}`}
                  onDelete={handleDeleteDate}
                  deleteIcon={<IconClose />}
                />
              )}

              {filterStatus.map((item) => (
                <Styled.ChipC
                  key={item.value}
                  label={`Status: ${item.label}`}
                  onDelete={() => handleDeleteStatus(item)}
                  deleteIcon={<IconClose />}
                />
              ))}
            </Styled.ListFilter>
          )}
          <Styled.Content>
            {ContentTab}
            {children}
          </Styled.Content>
        </Styled.TabContent>
      </Styled.ContentScope>

      <PickerWithButtonField
        anchorEl={anchorCalendar}
        values={filterDate}
        onChangeDate={handleFilterDate}
        onClose={() => setAnchorElCalendar(null)}
      />
      <PopupCheckboxMultiple
        options={
          filter === "Facility"
            ? companyFacilityOptions
            : MenuItemsStatusOptions
        }
        title={
          filter === "Facility"
            ? "Choose filter Facility"
            : "Choose filter Status"
        }
        anchorEl={anchorEl}
        onClose={handleClose}
        onChange={handleFilter}
        values={filter === "Facility" ? filterFacility : filterStatus}
      />
    </Styled.Container>
  );
};

export default LayoutScope;
