import React, { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as IconSortAlfa } from "assets/images/Sort_alfa.svg";
import { ReactComponent as IconLink } from "assets/images/link.svg";
import { ReactComponent as IconWorldLight } from "assets/images/world_2_light.svg";
import { ReactComponent as IconChart } from "assets/images/Chart_alt.svg";
import SelectField from "components/select-field/select-field";
import Button from "components/button/button";
import TextField from "components/text-field/text-field";
import { Formik } from "formik";
import { schemaCompanyInfo } from "utils/yupSchema";
import { FormValueCompany } from "./SignUp";
import { Styled } from "./sign-up.style";
import { useDispatch, useSelector } from "react-redux";
import { TStore, actions } from "store";
import { toast } from "react-toastify";

const StyledForm = {
  Body: styled.div`
    margin-top: 40px;
  `,

  ButtonNext: styled(Button)`
    width: 100% !important;
  `,

  Form: styled.form`
    & > div:not(:last-child) {
      margin-bottom: 40px;
    }
  `,
};

export const optionsSize = [
  {
    value: "LESS_THAN_OR_EQUAL_50",
    label: "0 - 50",
  },
  {
    value: "GREATER_THAN_50_AND_LESS_THAN_OR_EQUAL_100",
    label: "50 - 100",
  },
  {
    value: "GREATER_THAN_100_AND_LESS_THAN_OR_EQUAL_500",
    label: "100 - 500",
  },
  {
    value: "GREATER_THAN_500_AND_LESS_THAN_OR_EQUAL_1000",
    label: "500 - 1000",
  },
  {
    value: "GREATER_THAN_1000",
    label: "Over 1000",
  },
];

interface Props {
  onNext: () => void;
  valuesCompanyInfo: FormValueCompany;
  changeValuesCompanyInfo: (params: FormValueCompany) => void;
}

const FormCompanyInfo = ({
  onNext,
  valuesCompanyInfo,
  changeValuesCompanyInfo,
}: Props) => {
  const dispatch = useDispatch();
  const { listCountry, error } = useSelector((state: TStore) => state.country);
  useEffect(() => {
    dispatch(actions.country.getCountryName());
  }, [dispatch]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const onSubmit = (values: FormValueCompany) => {
    changeValuesCompanyInfo(values);
    onNext();
    return;
  };

  return (
    <>
      <Formik
        key="Company Information"
        initialValues={valuesCompanyInfo}
        validationSchema={schemaCompanyInfo}
        onSubmit={onSubmit}
        // innerRef={formikRef}
      >
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
        }) => (
          <>
            <Styled.WrapTitleStep>
              <Styled.titleStep>Company Information</Styled.titleStep>
            </Styled.WrapTitleStep>
            <StyledForm.Body>
              <StyledForm.Form onSubmit={handleSubmit}>
                <TextField
                  placeholder="Enter your company name"
                  value={values.companyName}
                  label="Company Name"
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  name="companyName"
                  prefix={<IconSortAlfa />}
                  requited={true}
                  isError={!!(errors.companyName && touched.companyName)}
                />
                {/* <SelectField
                  placeholder="Enter your company name"
                  label="Company Name"
                  name="companyName"
                  prefix={<IconWorldLight />}
                  value={values.companyName}
                  allowCreate
                  handleCreateNew={(e) => console.log("e", e)}
                  options={listCountry?.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(value: string) => {
                    setFieldValue("companyName", value);
                  }}
                  requited={true}
                  isError={!!(errors.companyName && touched.companyName)}
                /> */}
                <SelectField
                  placeholder="Select Country"
                  label="Company Country"
                  name="origin"
                  prefix={<IconWorldLight />}
                  value={values.origin}
                  options={listCountry?.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  onChange={(value: string) => {
                    setFieldValue("origin", value);
                  }}
                  requited={true}
                  isError={!!(errors.origin && touched.origin)}
                ></SelectField>

                <TextField
                  placeholder="Enter your company website"
                  value={values.website}
                  label="Company Website"
                  onChange={handleChange}
                  name="website"
                  prefix={<IconLink />}
                  requited={true}
                  isError={!!(errors.website && touched.website)}
                />
                <SelectField
                  placeholder="Choose your company size"
                  value={values.size}
                  label="Company Size"
                  onChange={(value: string) => {
                    setFieldValue("size", value);
                  }}
                  options={optionsSize}
                  name="size"
                  prefix={<IconChart />}
                />
                <div>
                  <StyledForm.ButtonNext
                    text="Next"
                    type="submit"
                    disabled={
                      !(values.origin && values.companyName && values.website)
                    }
                  ></StyledForm.ButtonNext>
                </div>
              </StyledForm.Form>
            </StyledForm.Body>
          </>
        )}
      </Formik>
    </>
  );
};

export default FormCompanyInfo;
