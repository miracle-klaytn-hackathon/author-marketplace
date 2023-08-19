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

const MobileTransfort = ({ filter }: Props) => {
  const { listScopeOne, isLoading } = useSelector(
    (state: TStore) => state.scope
  );

  return (
    <>
      <ScopeTable scopeData={listScopeOne} isLoading={isLoading} />
    </>
  );
};
export default MobileTransfort;
