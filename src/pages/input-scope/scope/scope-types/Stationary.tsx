import React from "react";
import { useSelector } from "react-redux";
import { TStore } from "store";
import ScopeTable from "../ScopeTable";

interface Props {
  filter?: {
    fromDate?: any;
    toDate?: any;
    inputType?: any;
    inputTypeScopeStatuses?: any;
  };
}

const Stationary = ({ filter }: Props) => {
  const listScopeOne = useSelector((state: TStore) => state.scope.listScopeOne);

  return (
    <>
      <ScopeTable scopeData={listScopeOne} />
    </>
  );
};
export default Stationary;
