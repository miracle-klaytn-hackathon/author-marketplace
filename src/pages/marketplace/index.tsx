import { Grid } from "@mui/material";
import { ReactComponent as IconSearch } from "assets/images/Search_alt.svg";
import NftCard from "components/nft-card/NftCard";
import TextField from "components/text-field/text-field";
import { debounce } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";

const Style = {
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
  WrapSearch: styled.div`
    margin-bottom: 20px;
  `,
};

const Dashboard = () => {
  const [modalOnBoardVisible, setModalOnBoardVisible] = useState(true);
  const [valueSearch, setValueSearch] = useState("");

  const searchText = useCallback((value?: string) => {
    console.log("value", value);
  }, []);

  const debouncedSearchText = useMemo(() => {
    return debounce(searchText, 500);
  }, [searchText]);

  return (
    <div>
      <Style.WrapSearch>
        Search
        <Style.InputSearch
          value={valueSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValueSearch(e.target.value);
            debouncedSearchText(e.target.value);
          }}
          type="text"
          placeholder="Search by name"
          suffix={<IconSearch />}
        />
      </Style.WrapSearch>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <NftCard />
        </Grid>
        <Grid item xs={3}>
          <NftCard />
        </Grid>
        <Grid item xs={3}>
          <NftCard />
        </Grid>
        <Grid item xs={3}>
          <NftCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
