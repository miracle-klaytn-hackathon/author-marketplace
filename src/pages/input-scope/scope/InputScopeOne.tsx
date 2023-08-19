import React from "react";
import { useSelector } from "react-redux";
import { TStore } from "store";
import ScopeTable from "./ScopeTable";

interface PropsInputScopeOne {
  tab?: any;
}

const InputScopeOne = ({ tab }: PropsInputScopeOne) => {
  const { listScopeOne, isLoading } = useSelector(
    (state: TStore) => state.scope
  );

  return (
    <>
      <ScopeTable scopeData={listScopeOne} tab={tab} isLoading={isLoading} />
    </>
  );
};
export default InputScopeOne;
