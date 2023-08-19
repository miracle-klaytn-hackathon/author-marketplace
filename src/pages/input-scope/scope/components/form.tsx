import React, { FC, useCallback, useEffect, useMemo, useState } from "react";

import { Grid } from "@mui/material";
import { ReactComponent as BoxIcon } from "assets/images/3dBox.svg";
import { ReactComponent as FormIcon } from "assets/images/Form.svg";
import { ReactComponent as LayersIcon } from "assets/images/Layers.svg";
import { ReactComponent as WarningSymbol } from "assets/images/WarningSymbol.svg";
import Button from "components/button/button";
import SelectField, {
  ISelectOption,
} from "components/select-field/select-field";
import Styled from "./form.style";

import { createScopeApi, updateScopeApi } from "api/scope-1/ScopeOne";
import CustomCollapse from "components/custom-collaspe/CustomCollapse";
import ModalConfirm from "components/modal/ModalConfirm";
import {
  CRESTE_SUCCESS_MESSAGE,
  REQUIRE_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
} from "constants/common";
import {
  DefaultScopeCategory,
  DefaultScopeInputType,
  ICategory,
  IInputType,
  IScopeData,
  SCOPE_KEYS,
  ScopeStatues,
} from "constants/scope";
import {
  checkValidate,
  handleAddRecords,
  onChangeScopeValue,
  populateData,
  populateDetailData,
} from "helpers/scope.helper";
import cloneDeep from "lodash/cloneDeep";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ROUTES from "routes/constant";
import { TStore, actions } from "store";
import Category from "./category/Category";
import InputType from "./input-type/InputType";
import Record from "./record/Record";

const initialValue: IScopeData = {
  facility: "",
  categories: [DefaultScopeCategory],
};

interface Props {
  isCreate?: boolean;
}

const Score1Form: FC<Props> = ({ isCreate }) => {
  const [formData, setFormData] = useState(initialValue);
  const [isSubmited, setIsSubmitted] = useState(false);
  const [internalLoading, setInternalLoading] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const navigate = useNavigate();
  const { scopeId } = useParams();
  const { pathname } = useLocation();

  const listCompany = useSelector((state: TStore) => state.company.listCompany);
  const { isLoading } = useSelector((state: TStore) => state.category);
  const { scopeDetail } = useSelector((state: TStore) => state.scope);
  const navigateToList = useCallback((): void => {
    if (pathname?.includes(ROUTES.scope1)) {
      navigate(ROUTES.scope1);
      return;
    }
    if (pathname?.includes(ROUTES.inputScope2)) {
      navigate(ROUTES.inputScope2);
      return;
    }
    if (pathname?.includes(ROUTES.inputScope3)) {
      navigate(ROUTES.inputScope3);
    }
  }, [navigate, pathname]);

  const handleSave = useCallback(
    ({ status }: { status?: ScopeStatues }) => {
      setIsSubmitted(true);
      const isError = checkValidate({ formData });
      if (isError) {
        return;
      }
      const datePopulated = populateData({ formData, status, isCreate });
      setInternalLoading(true);
      if (isCreate) {
        createScopeApi(datePopulated)
          .then(() => {
            toast.success(CRESTE_SUCCESS_MESSAGE);
            navigateToList();
          })
          .catch((err) => toast.error(err?.message))
          .finally(() => {
            setInternalLoading(false);
          });
        return;
      }

      updateScopeApi(datePopulated)
        .then(() => {
          toast.success(UPDATE_SUCCESS_MESSAGE);
          navigateToList();
        })
        .catch((err) => toast.error(err?.message))
        .finally(() => {
          setInternalLoading(false);
        });
    },
    [formData, isCreate, navigateToList]
  );

  const dispatch = useDispatch();

  const hanldeGetListInputType = useCallback(
    (categoryId) => {
      dispatch(actions.category.getListInputType(categoryId));
    },
    [dispatch]
  );
  useEffect(() => {
    if (scopeDetail && scopeId) {
      const dataDetail = populateDetailData({
        data: scopeDetail,
      });
      setFormData(dataDetail);
    }
  }, [scopeDetail, scopeId]);
  useEffect(() => {
    if (scopeId) {
      dispatch(actions.scope.getScopeDetail(scopeId));
    }
  }, [dispatch, scopeId]);

  useEffect(() => {
    if (scopeDetail?.categoryRequestList?.[0]?.categoryId) {
      hanldeGetListInputType(scopeDetail?.categoryRequestList?.[0]?.categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, scopeDetail?.categoryRequestList?.[0]?.categoryId]);

  useEffect(() => {
    dispatch(actions.company.getListCompanyFacility({ getAll: true }));
    dispatch(actions.category.getListCategory(1));
    dispatch(actions.customer.getListCustomer());
  }, [dispatch]);

  const companyFacilityOptions = useMemo(
    (): ISelectOption[] =>
      listCompany?.companyFacilityResponseListObjResponse?.data?.map(
        (item) => ({
          label: item.facilityName,
          value: item.facilityId,
        })
      ) || [],
    [listCompany?.companyFacilityResponseListObjResponse?.data]
  );

  const handleAddCategory = useCallback(() => {
    const newCategoryData = cloneDeep(formData?.categories || []);
    newCategoryData?.push({
      ...DefaultScopeCategory,
      id: (formData?.categories?.length || 0) + 1,
    });

    const newData = {
      ...formData,
      categories: newCategoryData,
    };

    setFormData(newData);
  }, [formData]);

  const handleAddInputType = useCallback(
    (categoryId: number) => {
      const newCategoryData = formData?.categories?.map(
        (category: ICategory) => {
          if (category?.id === categoryId) {
            const newInputTypes = cloneDeep(category?.inputTypes || []);
            newInputTypes?.push({
              ...DefaultScopeInputType,
              id:
                category?.inputTypes?.[category?.inputTypes?.length - 1]?.id +
                1,
            });
            return { ...category, inputTypes: newInputTypes };
          }
          return category;
        }
      );

      setFormData({ ...formData, categories: newCategoryData });
    },
    [formData]
  );
  const onAddRecords = useCallback(
    (categoryId: number, inputTypeId: number) => {
      const updatedData = handleAddRecords({
        formData,
        categoryId,
        inputTypeId,
      });

      setFormData(updatedData);
    },
    [formData]
  );

  const handleChangeValue = useCallback(
    ({ keyName, updateValue, recordId, inputTypeId, categoryId }) => {
      const newValues = onChangeScopeValue({
        initialValue: formData,
        keyName,
        updateValue,
        recordId,
        inputTypeId,
        categoryId,
      });
      setFormData(newValues);
    },
    [formData]
  );

  const renderRecords = useCallback(
    (records, categoryId, inputTypeId) => {
      const listRecords =
        records?.map((record: any, index: number) => (
          <Record
            key={`category ${String(index)}`}
            isCreate={isCreate}
            categoryId={categoryId}
            isSubmited={isSubmited}
            handleChangeValue={handleChangeValue}
            formData={formData}
            setFormData={setFormData}
            index={index}
            record={record}
            inputTypeId={inputTypeId}
            records={records}
          />
        )) || null;
      return listRecords;
    },
    [formData, handleChangeValue, isCreate, isSubmited]
  );

  const renderInputTypes = useCallback(
    (inputTypes, category) => {
      const listInputTypes =
        inputTypes?.map((inputType: IInputType, index: number) => (
          <div key={`category ${String(index)}`}>
            <Styled.WrapInputType>
              <CustomCollapse
                header={
                  <InputType
                    isCreate={isCreate}
                    inputTypes={inputTypes}
                    inputType={inputType}
                    categoryId={category?.id}
                    isSubmited={isSubmited}
                    category={category}
                    formData={formData}
                    handleChangeValue={handleChangeValue}
                    setFormData={setFormData}
                  />
                }
              >
                <>
                  {renderRecords(
                    inputType?.records || [],
                    category?.id,
                    inputType?.id
                  )}

                  {(inputType?.records?.length || 0) < 5 && isCreate && (
                    <Styled.AddCategory
                      onClick={() => onAddRecords(category?.id, inputType?.id)}
                    >
                      <FormIcon className="icon" />
                      <span>Add a new record</span>
                    </Styled.AddCategory>
                  )}
                </>
              </CustomCollapse>
            </Styled.WrapInputType>
          </div>
        )) || null;
      return listInputTypes;
    },
    [
      isCreate,
      isSubmited,
      formData,
      handleChangeValue,
      renderRecords,
      onAddRecords,
    ]
  );

  const renderCategories = useMemo(() => {
    const listcategories =
      formData?.categories?.map((category: ICategory, index: number) => (
        <div key={`category ${String(index)}`}>
          <Styled.WrapCategory>
            <CustomCollapse
              header={
                <Category
                  isCreate={isCreate}
                  category={category}
                  hanldeGetListInputType={hanldeGetListInputType}
                  handleChangeValue={handleChangeValue}
                  isSubmited={isSubmited}
                  formData={formData}
                  setFormData={setFormData}
                />
              }
            >
              <>
                {renderInputTypes(category?.inputTypes || [], category)}

                {(category?.inputTypes?.length || 0) < 5 && isCreate && (
                  <Styled.AddCategory
                    onClick={() => handleAddInputType(category?.id)}
                  >
                    <BoxIcon className="icon" />
                    <span>Add a new input type</span>
                  </Styled.AddCategory>
                )}
              </>
            </CustomCollapse>
          </Styled.WrapCategory>
        </div>
      )) || null;
    return listcategories;
  }, [
    formData,
    handleAddInputType,
    handleChangeValue,
    hanldeGetListInputType,
    isCreate,
    isSubmited,
    renderInputTypes,
  ]);

  return (
    <div>
      {isCreate && (
        <Styled.WarningBadgeHeader>
          <WarningSymbol className="icon" />
          The maximum 5 categories can be added in a moment
        </Styled.WarningBadgeHeader>
      )}
      <Grid container>
        <Grid item xs={6}>
          <Styled.WrapSelectMain>
            <SelectField
              placeholder="Select Facility"
              label="Facility"
              requited
              disabled={!isCreate}
              name="origin"
              value={formData?.facility}
              options={companyFacilityOptions}
              onChange={(e) =>
                handleChangeValue({
                  keyName: SCOPE_KEYS.facility,
                  updateValue: e,
                })
              }
              isError={
                (isSubmited ||
                  (formData as any)?.[`${formData?.facility}Touched`]) &&
                !formData?.facility
              }
              error={REQUIRE_MESSAGE}
            />
          </Styled.WrapSelectMain>
        </Grid>
        {/* <Grid item xs={6}>
          {isCreate && (
            <Styled.WarningBadgeHeader>
              <WarningSymbol className="icon" />
              The maximum 5 categories can be added in a moment
            </Styled.WarningBadgeHeader>
          )}
        </Grid> */}
      </Grid>
      {renderCategories}
      {(formData?.categories?.length || 0) < 5 && isCreate && (
        <Styled.AddCategory onClick={handleAddCategory}>
          <LayersIcon className="icon" />
          <span>Add a new category</span>
        </Styled.AddCategory>
      )}
      <Styled.WrapButtons>
        <Button
          text="Discard"
          white
          className="discard"
          onClick={() => setModalConfirmVisible(true)}
        />
        {isCreate && (
          <>
            <Button
              text="Save as draft"
              white
              className="saveBtn"
              isLoading={isLoading || internalLoading}
              onClick={() => handleSave({})}
            />
            <Button
              text="Submit"
              onClick={() => handleSave({ status: ScopeStatues.SUBMITTED })}
              isLoading={isLoading || internalLoading}
            />
          </>
        )}
        {!isCreate && (
          <Button
            text="Update"
            className="btnUpdate"
            onClick={() => handleSave({})}
            isLoading={isLoading || internalLoading}
          />
        )}
      </Styled.WrapButtons>
      <ModalConfirm
        open={modalConfirmVisible}
        onClose={() => setModalConfirmVisible(false)}
        onConfirmation={navigateToList}
      />
    </div>
  );
};

export default Score1Form;
