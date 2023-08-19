import { FC, useCallback, useMemo } from "react";
import { Grid } from "@mui/material";
import SelectField, {
  ISelectOption,
} from "components/select-field/select-field";
import { ICategory, IInputType, IScopeData, SCOPE_KEYS } from "constants/scope";
import { REQUIRE_MESSAGE } from "constants/common";
import { ReactComponent as TrashIcon } from "assets/images/Trash.svg";

import Styled from "../form.style";
import { TStore, useSelector } from "store";

interface Props {
  isCreate?: boolean;
  inputTypes: IInputType[];
  inputType: IInputType;
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
  category: ICategory;
  setFormData: (value: React.SetStateAction<IScopeData>) => void;
}
const InputType: FC<Props> = ({
  isCreate,
  inputTypes,
  inputType,
  categoryId,
  isSubmited,
  handleChangeValue,
  formData,
  setFormData,
  category,
}) => {
  const { listInputType } = useSelector((state: TStore) => state.category);

  const inputTypeOptions = useMemo((): ISelectOption[] => {
    const listInputTypeFiltered: ISelectOption[] = listInputType
      ?.filter((item) => {
        // inputType used in this
        if (item.id === inputType.inputType) {
          return true;
        }
        // category filter inputType used in other
        if (category.inputTypes?.some((i) => i.inputType === item.id)) {
          return false;
        }
        return true;
      })
      ?.map((item) => ({
        label: item.name,
        value: item.id,
      }));

    return listInputTypeFiltered;
  }, [category.inputTypes, inputType.inputType, listInputType]);

  const removeInputType = useCallback(
    (categoryId: number, inputTypeId: number) => {
      const newCategoryData = formData?.categories?.map(
        (category: ICategory) => {
          if (category?.id === categoryId) {
            const newInputTypes = category?.inputTypes?.filter(
              (inputType) => inputType.id !== inputTypeId
            );
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
    <Grid container>
      <Grid item xs={8} xl={6}>
        <Styled.WrapSelectMain>
          <SelectField
            label="Input Type"
            requited
            placeholder="Select a input type"
            name="inputType"
            disabled={!isCreate}
            value={inputType?.inputType}
            options={inputTypeOptions}
            onChange={(e) =>
              handleChangeValue({
                keyName: SCOPE_KEYS.inputType,
                updateValue: e,
                categoryId: categoryId,
                inputTypeId: inputType.id,
              })
            }
            isError={
              (isSubmited ||
                (inputType as any)?.[`${SCOPE_KEYS.inputType}Touched`]) &&
              !inputType?.inputType
            }
            error={REQUIRE_MESSAGE}
          />
        </Styled.WrapSelectMain>
      </Grid>
      <Grid item xs={4} xl={6}>
        <Styled.WrapHeader>
          {inputTypes?.length !== 1 && (
            <Styled.WrapTrash
              onClick={() => removeInputType(categoryId, inputType?.id)}
            >
              <TrashIcon className="icon-trash" />
            </Styled.WrapTrash>
          )}
        </Styled.WrapHeader>
      </Grid>
    </Grid>
  );
};

export default InputType;
