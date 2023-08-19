import { ICreateScope, IScopeDetail } from "api/scope-1/scope.interface";
import { DECIMAL_3 } from "constants/common";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import {
  DefaultScopeRecord,
  ICategory,
  IInputType,
  IRecord,
  IScopeData,
  SCOPE_KEYS,
  ScopeStatues,
} from "constants/scope";
import { formatDateToUtc } from "./date.helper";
// import { formatDateToUnixTime } from "./date.helper";

export const onChangeScopeValue = ({
  initialValue,
  keyName,
  updateValue,
  recordId,
  inputTypeId,
  categoryId,
}: {
  initialValue: IScopeData;
  keyName: string;
  updateValue: any;
  recordId: number;
  inputTypeId: number;
  categoryId: number;
}) => {
  if (keyName === SCOPE_KEYS.facility) {
    return {
      ...initialValue,
      facility: updateValue,
      [`${keyName}Touched`]: true,
    };
  }
  if (keyName === SCOPE_KEYS.category) {
    const newCategories = initialValue?.categories?.map(
      (category: ICategory) => {
        if (category.id === categoryId) {
          // reset data after change
          return {
            ...category,
            category: updateValue,
            inputTypes: category?.inputTypes?.map((inputType: IInputType) => ({
              ...inputType,
              inputType: undefined,
              records: inputType?.records?.map((record: IRecord) => ({
                ...record,
                consumption: "",
                consumptionDate: "",
                customer: "",
                uploadDocument: "",
              })),
            })),
            [`${keyName}Touched`]: true,
          };
        }
        return category;
      }
    );
    return { ...initialValue, categories: newCategories };
  }

  if (keyName === SCOPE_KEYS.inputType) {
    const newCategoryData = initialValue?.categories?.map(
      (category: ICategory) => {
        if (category?.id === categoryId) {
          const newInputTypes = category?.inputTypes?.map(
            (inputType: IInputType) => {
              if (inputType.id === inputTypeId) {
                return {
                  ...inputType,
                  [keyName]: updateValue,
                  [`${keyName}Touched`]: true,
                };
              }
              return inputType;
            }
          );

          return { ...category, inputTypes: newInputTypes };
        }
        return category;
      }
    );
    return { ...initialValue, categories: newCategoryData };
  }

  if (
    keyName === SCOPE_KEYS.consumption ||
    SCOPE_KEYS.customer ||
    SCOPE_KEYS.consumptionDate ||
    SCOPE_KEYS.uploadDocument
  ) {
    const newCategoryData = initialValue?.categories?.map(
      (category: ICategory) => {
        if (category?.id === categoryId) {
          const inputTypes = category?.inputTypes?.map((inputType) => {
            if (inputType.id === inputTypeId) {
              const records = inputType?.records?.map((record) => {
                if (record.id === recordId) {
                  return {
                    ...record,
                    [keyName]: updateValue,
                    [`${keyName}Touched`]: true,
                  };
                }
                return record;
              });
              return {
                ...inputType,
                records,
              };
            }
            return inputType;
          });
          return { ...category, inputTypes };
        }
        return category;
      }
    );
    return { ...initialValue, categories: newCategoryData };
  }

  return initialValue;
};

export const checkValidate = ({ formData }: { formData: IScopeData }) => {
  let existError = false;
  if (!formData?.facility) {
    return true;
  }
  formData?.categories?.forEach((category: ICategory) => {
    if (!category?.category) {
      existError = true;
      return;
    }
    category?.inputTypes?.forEach((inputType) => {
      if (!inputType?.inputType) {
        existError = true;
        return;
      }
      inputType?.records?.forEach((record: IRecord) => {
        if (
          !record?.consumption ||
          !record?.consumptionDate ||
          !record?.customer ||
          !record?.uploadDocument ||
          (record?.consumption && !DECIMAL_3?.test(record?.consumption))
        ) {
          existError = true;
          return;
        }
      });
    });
  });

  return existError;
};

export const populateData = ({
  formData,
  status,
  isCreate,
}: {
  formData: IScopeData;
  status?: ScopeStatues;
  isCreate?: boolean;
}): ICreateScope => {
  const datePopulated: ICreateScope = {
    facilityId: formData.facility || undefined,
    typeScope: 1, // update later
    categoryRequestList: formData?.categories?.map((category) => ({
      categoryId: Number(category.category),
      inputTypeRequests: category?.inputTypes?.map((inputType) => ({
        inputTypeId: Number(inputType.inputType),
        inputTypeScopeRequests: inputType?.records?.map((record, index) => ({
          consumptionDate: formatDateToUtc(record.consumptionDate),
          consumptionValue: Number(record.consumption),
          customerId: Number(record.customer),
          documentUpload: record?.uploadDocument,
          //  String(record.uploadDocument), // update later
          inputTypeUnitId: record?.inputTypeUnitId || 0,
          inputTypeScopeId: isCreate ? undefined : record?.id,
          status: status || ScopeStatues.IN_DRAFT, // update later
        })),
      })),
    })),
  };
  return datePopulated;
};

export const handleAddRecords = ({
  formData,
  categoryId,
  inputTypeId,
}: {
  formData: IScopeData;
  categoryId: number;
  inputTypeId: number;
}) => {
  const newCategoryData = formData?.categories?.map((category: ICategory) => {
    if (category?.id === categoryId) {
      // check mapp category
      const newInputTypes = category?.inputTypes?.map((inputType) => {
        if (inputType?.id === inputTypeId) {
          // check mapp inputType
          const newRecords = cloneDeep(inputType?.records || []);
          newRecords?.push({
            ...DefaultScopeRecord,
            id: inputType?.records?.[inputType?.records?.length - 1]?.id + 1,
          });
          return { ...inputType, records: newRecords };
        }
        return inputType;
      });
      return { ...category, inputTypes: newInputTypes };
    }
    return category;
  });
  return { ...formData, categories: newCategoryData };
};

export const populateDetailData = ({
  data,
}: {
  data: IScopeDetail;
}): IScopeData => {
  const newCategories = data?.categoryRequestList?.map((category) => {
    return {
      category: category.categoryId,
      id: Number(category.categoryId),
      inputTypes: category?.inputTypeRequests?.map((inputType) => ({
        id: Number(inputType.inputTypeId),
        inputType: inputType?.inputTypeId,
        records: inputType?.inputTypeScopeRequests?.map((record, index) => ({
          id: record?.inputTypeScopeId || Number(index + 1),
          // inputTypeUnitId: record?.inputTypeUnitId,
          inputTypeUnitId: 0, // default = 0
          consumption: record.consumptionValue,
          consumptionDate: record.consumptionDate
            ? moment(record.consumptionDate).toDate()
            : null,
          customer: record.customerId,
          uploadDocument: record?.documentUpload,
          createdDate: record?.createdDate,
          status: record?.status,
        })),
      })),
    };
  });
  return {
    facility: data.facilityId,
    typeScope: 1,
    categories: newCategories,
  };
};
