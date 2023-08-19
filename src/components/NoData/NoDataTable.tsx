import React, { FC } from "react";
import { styled } from "styled-components";
import { ReactComponent as NoDataIcon } from "assets/images/93134-not-found1.svg";
import { ReactComponent as SearchIcon } from "assets/images/Search.svg";
import Button from "components/button/button";

const Style = {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 70px;
    min-height: 53vh;
  `,
  NoInputText: styled.div`
    color: ${({ theme }) => theme.colors.text1} !important;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 28px;
  `,

  AdjustFilterText: styled.div`
    color: ${({ theme }) => theme.colors.text4} !important;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  `,

  ButtonSignIn: styled(Button)`
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};

    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
  `,
};

interface Props {
  isSearch?: boolean;
  onOk?: () => void;
}

const NoDataTable: FC<Props> = ({ isSearch, onOk }) => {
  return (
    <>
      <Style.Container>
        <div>
          {isSearch ? <SearchIcon /> : <NoDataIcon />}
          <Style.NoInputText>
            {isSearch
              ? "Hmm, that didn’t match anything."
              : "Looks like you don’t have any input type yet."}
          </Style.NoInputText>
          <Style.AdjustFilterText>
            Try adjusting your search or filter to find what you’re looking for.
          </Style.AdjustFilterText>
          {isSearch ? (
            ""
          ) : (
            <Style.ButtonSignIn
              white={true}
              text="Add a new input now"
              onClick={onOk}
            />
          )}
        </div>
      </Style.Container>
    </>
  );
};

export default NoDataTable;
