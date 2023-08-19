import { IGetListScope } from "api/scope-1/scope.interface";
import { CategoryTypes } from "constants/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { TStore, actions } from "store";
import LayoutScope from "../LayoutScope";
import Electricity from "./scope-types/Electricity";

const tabs = [{ value: CategoryTypes.ELECTRICITY, label: "Electricity" }];

const PageScope2 = () => {
  const [tab, setTab] = useState<CategoryTypes>(CategoryTypes.ELECTRICITY);
  const navigate = useNavigate();
  const { listScopeOne, savedParams } = useSelector(
    (state: TStore) => state.scope
  );
  const dispatch = useDispatch();

  const handleGetList = useCallback(
    (newParams: IGetListScope) => {
      if (tab) {
        // searchText
        dispatch(
          actions.scope.getListScopeOne({
            ...savedParams,
            ...newParams,
            category:
              tab !== CategoryTypes.ALL ? (tab as CategoryTypes) : undefined,
          })
        );
      }
    },
    [dispatch, savedParams, tab]
  );

  const renderContentTab = useMemo(() => {
    switch (tab) {
      case CategoryTypes.ELECTRICITY:
        return <Electricity />;
      default:
        return <Electricity />;
    }
  }, [tab]);

  const handleAddRecord = useCallback(() => {
    navigate(`${ROUTES.inputScope2}/${ROUTES.create}`);
  }, [navigate]);

  useEffect(() => {
    dispatch(actions.company.getListCompanyFacility({ getAll: true }));
  }, [dispatch]);

  useEffect(() => {
    handleGetList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, tab]);

  return (
    <LayoutScope
      title="Scope 2"
      total={listScopeOne?.[0]?.totalRecord || 0}
      tabs={tabs}
      onChangeTab={(tab: string) => setTab(tab as CategoryTypes)}
      tab={tab}
      ContentTab={renderContentTab}
      onClickAdd={handleAddRecord}
      onFilter={handleGetList}
    />
  );
};

export default PageScope2;
