import { FC, useCallback, useMemo } from "react";
import { Grid } from "@mui/material";
import SelectField, {
  ISelectOption,
} from "components/select-field/select-field";
import { ICategory, IScopeData, SCOPE_KEYS } from "constants/scope";
import { REQUIRE_MESSAGE } from "constants/common";
import { ReactComponent as WarningSymbol } from "assets/images/WarningSymbol.svg";
import { ReactComponent as TrashIcon } from "assets/images/Trash.svg";

import Styled from "../form.style";
import { useSelector } from "react-redux";
import { TStore } from "store";
import { formatDateNoTime } from "helpers/date.helper";

interface Props {
  isCreate?: boolean;
  category: ICategory;
  hanldeGetListInputType: (categoryId: any) => void;
  handleChangeValue: ({
    keyName,
    updateValue,
    recordId,
    inputTypeId,
    categoryId,
  }: any) => void;
  isSubmited: boolean;
  formData: IScopeData;
  setFormData: (value: React.SetStateAction<IScopeData>) => void;
}
const Category: FC<Props> = ({
  isCreate,
  category,
  hanldeGetListInputType,
  handleChangeValue,
  isSubmited,
  formData,
  setFormData,
}) => {
  const { listCategory } = useSelector((state: TStore) => state.category);

  const categoryOptions = useMemo((): ISelectOption[] => {
    const listCategoryFiltered: ISelectOption[] = listCategory
      ?.filter((item) => {
        // category used in this
        if (item.id === category.category) {
          return true;
        }
        // category filter category used in other
        if (formData?.categories?.some((i) => i.category === item.id)) {
          return false;
        }
        return true;
      })
      ?.map((item) => ({
        label: item.name,
        value: item.id,
      }));

    return listCategoryFiltered;
  }, [category.category, formData?.categories, listCategory]);

  const renderGeneralInfo = useMemo(() => {
    if (isCreate) {
      return;
    }
    return (
      <Styled.WrapGeneralInfo>
        <div className="line-info">
          <div className="label">Created Date:</div>
          <div className="value">
            {
              formData?.categories?.[0]?.inputTypes?.[0]?.records?.[0]
                ?.createdDate
            }
          </div>
        </div>
        <div className="separate">-</div>
        <div className="line-info">
          <div className="label">Status: </div>
          <div className="value">
            {formData?.categories?.[0]?.inputTypes?.[0]?.records?.[0]?.status}
          </div>
        </div>
      </Styled.WrapGeneralInfo>
    );
  }, [formData?.categories, isCreate]);

  const removeCategory = useCallback(
    (categoryId) => {
      const newCategoryData = formData?.categories?.filter(
        (category: ICategory) => category.id !== categoryId
      );

      const newData = {
        ...formData,
        categories: newCategoryData,
      };

      setFormData(newData);
    },
    [formData, setFormData]
  );

  return (
    <Grid container>
      <Grid item xs={6}>
        <Styled.WrapSelectMain>
          <SelectField
            label="Category"
            requited
            placeholder="Select a category"
            name="category"
            disabled={!isCreate}
            value={category?.category}
            options={categoryOptions}
            onChange={(e) => {
              hanldeGetListInputType(e);
              handleChangeValue({
                keyName: SCOPE_KEYS.category,
                updateValue: e,
                categoryId: category?.id,
              });
            }}
            isError={
              (isSubmited ||
                ((category as any)?.[
                  `${SCOPE_KEYS.category}Touched`
                ] as any)) &&
              !category?.category
            }
            error={REQUIRE_MESSAGE}
          />
        </Styled.WrapSelectMain>
      </Grid>
      <Grid item xs={6}>
        <Styled.WrapHeader>
          {!isCreate && renderGeneralInfo}
          {isCreate && (
            <Styled.WarningBadge>
              <WarningSymbol className="icon" />
              Changing this will clear all records within this{" "}
            </Styled.WarningBadge>
          )}
          {formData?.categories?.length !== 1 && (
            <Styled.WrapTrash onClick={() => removeCategory(category?.id)}>
              <TrashIcon className="icon-trash" />
            </Styled.WrapTrash>
          )}
        </Styled.WrapHeader>
      </Grid>
    </Grid>
  );
};

export default Category;
