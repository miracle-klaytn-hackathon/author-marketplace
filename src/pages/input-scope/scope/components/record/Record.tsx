import { Grid } from "@mui/material";
import { ReactComponent as CloseSquareIcon } from "assets/images/CloseSquare.svg";
import { ReactComponent as HomeIcon } from "assets/images/Home.svg";
import { ReactComponent as SubtractIcon } from "assets/images/Subtract.svg";
import SelectField, {
  ISelectOption,
} from "components/select-field/select-field";
import TextField from "components/text-field/text-field";
import {
  DECIMAL_3,
  DECIMAL_3_MESSAGE,
  REQUIRE_MESSAGE,
} from "constants/common";
import { ICategory, IRecord, IScopeData, SCOPE_KEYS } from "constants/scope";
import { FC, useCallback, useMemo } from "react";

import UploadButton from "components/button/UploadButton";
import CustomDayPicker from "components/date-picker/DateDayPicker";
import { TStore, useSelector } from "store";
import Styled from "../form.style";

interface Props {
  isCreate?: boolean;
  categoryId: number;
  isSubmited: boolean;
  handleChangeValue: ({
    keyName,
    updateValue,
    recordId,
    inputTypeId,
    categoryId,
  }: any) => void;
  formData: IScopeData;
  setFormData: (value: React.SetStateAction<IScopeData>) => void;
  index: number;
  record: any;
  inputTypeId: number;
  records: IRecord[];
}
const Record: FC<Props> = ({
  isCreate,
  categoryId,
  isSubmited,
  handleChangeValue,
  formData,
  setFormData,
  index,
  record,
  inputTypeId,
  records,
}) => {
  const listCustomer = useSelector(
    (state: TStore) => state.customer.listCustomer
  );

  const customerOptions = useMemo(
    (): ISelectOption[] =>
      listCustomer?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || [],
    [listCustomer]
  );

  const removeRecords = useCallback(
    (categoryId: number, inputTypeId: number, recordId: number) => {
      const newCategoryData = formData?.categories?.map(
        (category: ICategory) => {
          if (category?.id === categoryId) {
            // check mapp category
            const newInputTypes = category?.inputTypes?.map((inputType) => {
              if (inputType?.id === inputTypeId) {
                // check mapp inputType
                const newRecords = inputType?.records?.filter(
                  (i) => i.id !== recordId
                );

                return { ...inputType, records: newRecords };
              }
              return inputType;
            });
            return { ...category, inputTypes: newInputTypes };
          }
          return category;
        }
      );

      setFormData({ ...formData, categories: newCategoryData });
    },
    [formData, setFormData]
  );

  return (
    <Styled.WrapRecords>
      <Grid container spacing={2}>
        <Grid item xs={6} xl={3}>
          <div className="wrap-consumption">
            <div className="no">{index + 1}</div>
            <TextField
              classNameWrap="custom-textfield"
              placeholder="Litres"
              name={SCOPE_KEYS.consumption}
              onChange={(e) => {
                handleChangeValue({
                  keyName: SCOPE_KEYS.consumption,
                  updateValue: e?.target?.value,
                  recordId: record?.id,
                  inputTypeId,
                  categoryId,
                });
              }}
              value={record?.consumption || ""}
              label="Consumption"
              requited
              prefix={<SubtractIcon />}
              isError={
                (isSubmited || record?.[`${SCOPE_KEYS.consumption}Touched`]) &&
                (!record?.[SCOPE_KEYS.consumption] ||
                  (!DECIMAL_3?.test(record?.[SCOPE_KEYS.consumption]) &&
                    record?.[SCOPE_KEYS.consumption]))
              }
              error={
                (!DECIMAL_3?.test(record?.[SCOPE_KEYS.consumption]) &&
                record?.[SCOPE_KEYS.consumption]
                  ? DECIMAL_3_MESSAGE
                  : undefined) || REQUIRE_MESSAGE
              }
            />
          </div>
        </Grid>
        <Grid item xs={6} xl={3}>
          <CustomDayPicker
            label="Consumption Date"
            selectedDay={record?.[SCOPE_KEYS.consumptionDate] || ""}
            placeholderText="Choose a date"
            setSelectedDay={(date) =>
              handleChangeValue({
                keyName: SCOPE_KEYS.consumptionDate,
                updateValue: date,
                recordId: record?.id,
                inputTypeId,
                categoryId,
              })
            }
            requited
            error={
              (isSubmited ||
                record?.[`${SCOPE_KEYS.consumptionDate}Touched`]) &&
              !record?.[SCOPE_KEYS.consumptionDate]
                ? REQUIRE_MESSAGE
                : undefined
            }
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Styled.WrapUpload>
            <SelectField
              classWrap="custom-textfield"
              name={SCOPE_KEYS.customer}
              onChange={(e) =>
                handleChangeValue({
                  keyName: SCOPE_KEYS.customer,
                  updateValue: e,
                  recordId: record?.id,
                  inputTypeId,
                  categoryId,
                })
              }
              value={record?.[SCOPE_KEYS.customer] || ""}
              label="Customer"
              requited
              options={customerOptions}
              placeholder="Enter your customer name"
              prefix={<HomeIcon />}
              isError={
                (isSubmited || record?.[`${SCOPE_KEYS.customer}Touched`]) &&
                !record?.[SCOPE_KEYS.customer]
              }
              error={REQUIRE_MESSAGE}
            />
            <Styled.WrapButtonUpload>
              <UploadButton
                uploadedFile={record?.[SCOPE_KEYS.uploadDocument] || ""}
                onChange={(uploadDocument) =>
                  handleChangeValue({
                    keyName: SCOPE_KEYS.uploadDocument,
                    updateValue: uploadDocument,
                    recordId: record?.id,
                    inputTypeId,
                    categoryId,
                  })
                }
                error={
                  isSubmited && !record?.[SCOPE_KEYS.uploadDocument]
                    ? REQUIRE_MESSAGE
                    : undefined
                }
              />
              {records?.length !== 1 && isCreate && (
                <CloseSquareIcon
                  className="icon"
                  onClick={() =>
                    removeRecords(categoryId, inputTypeId, record?.id)
                  }
                />
              )}
            </Styled.WrapButtonUpload>
          </Styled.WrapUpload>
        </Grid>
      </Grid>
    </Styled.WrapRecords>
  );
};

export default Record;
