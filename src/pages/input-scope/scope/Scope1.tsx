import { useCallback, useEffect, useMemo, useState } from "react";
import LayoutScope from "../LayoutScope";
import InputScopeOne from "./InputScopeOne";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { useDispatch, useSelector } from "react-redux";
import { TStore, actions } from "store";
import MobileTransfort from "./scope-types/MobileTransfort";
import Stationary from "./scope-types/Stationary";
import { CategoryTypes } from "constants/common";
import Other from "./scope-types/Other";
import { IGetListScope } from "api/scope-1/scope.interface";

const tabs = [
  { value: CategoryTypes.ALL, label: "All" },
  {
    value: CategoryTypes.MOBILE_TRANSPORTS_FUELS,
    label: "Mobile Transport Fuels",
  },
  {
    value: CategoryTypes.STATIONARY_TRANSPORT_FUELS,
    label: "Stationary Fuels",
  },
  { value: CategoryTypes.OTHERS, label: "Others" },
];

const PageScopeOne = () => {
  const [tab, setTab] = useState<CategoryTypes>(CategoryTypes.ALL);
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
      case CategoryTypes.ALL:
        return <InputScopeOne tab={tab} />;
      case CategoryTypes.MOBILE_TRANSPORTS_FUELS:
        return <MobileTransfort />;
      case CategoryTypes.STATIONARY_TRANSPORT_FUELS:
        return <Stationary />;
      case CategoryTypes.OTHERS:
        return <Other />;
      default:
        return <InputScopeOne tab={tab} />;
    }
  }, [tab]);

  const handleAddRecord = useCallback(() => {
    navigate(`${ROUTES.scope1}/${ROUTES.create}`);
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
      title="Scope 1"
      total={listScopeOne?.totalSubmitted || 0}
      tabs={tabs}
      onChangeTab={(tab: string) => setTab(tab as CategoryTypes)}
      tab={tab}
      ContentTab={renderContentTab}
      onClickAdd={handleAddRecord}
      onFilter={handleGetList}
    />
  );
};

export default PageScopeOne;
