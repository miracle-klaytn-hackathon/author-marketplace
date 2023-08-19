import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as IconSortAlfa } from "assets/images/Sort_alfa.svg";
import { ReactComponent as IconPhone } from "assets/images/Phone.svg";
import { ReactComponent as IconUser } from "assets/images/User.svg";
import { ReactComponent as IconLock } from "assets/images/Lock.svg";
import Button from "components/button/button";
import TextField from "components/text-field/text-field";
import { Formik } from "formik";
import { signUp } from "api/post/signUp.api";
import { schemaAuthCredentials } from "utils/yupSchema";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { toast } from "react-toastify";
import { FormAuthValue, FormValueCompany } from "./SignUp";
import { Styled } from "./sign-up.style";
import { ReactComponent as RefundBack } from "assets/images/Refund_back.svg";

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

interface Props {
  valuesCompanyInfo: FormValueCompany;
  valuesAuth: FormAuthValue;
  changeValuesAuth: (values: FormAuthValue) => void;
  backToCompanyInfo: () => void;
}

const FormAuthCredentials = ({
  valuesCompanyInfo,
  valuesAuth,
  backToCompanyInfo,
  changeValuesAuth,
}: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = ({ confirmPassword, ...values }: FormAuthValue) => {
    setIsLoading(true);
    signUp({
      ...values,
      ...valuesCompanyInfo,
      phone: `+61${values.phone}`,
      roles: ["User"],
      size: valuesCompanyInfo.size ? valuesCompanyInfo.size : "EMPTY",
    })
      .then((res) => {
        if (res?.statusCode === 200) {
          toast.success(res?.message || "Sign Up Successfully");
          navigate(ROUTES.successfully);
          return;
        }

        toast.error(res?.message || "Something Went Wrong!");
      })
      .catch((err) => {
        toast.error(err?.message || "Something Went Wrong!");
      })
      .finally(() => setIsLoading(false));
    return;
  };

  const handleBackToCompanyInfo = (values: FormAuthValue) => {
    changeValuesAuth(values);
    backToCompanyInfo();
  };

  return (
    <div>
      <Formik
        key="authentication"
        initialValues={valuesAuth}
        validationSchema={schemaAuthCredentials}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, errors, touched, handleChange }) => (
          <>
            <Styled.WrapTitleStep>
              <Styled.titleStep>Authentication Credentials</Styled.titleStep>
              <Styled.WrapBackStep
                onClick={() => handleBackToCompanyInfo(values)}
              >
                <RefundBack />
                <Styled.BackStep>Back to Company Info</Styled.BackStep>
              </Styled.WrapBackStep>
            </Styled.WrapTitleStep>

            <StyledForm.Body>
              <StyledForm.Form onSubmit={handleSubmit}>
                <TextField
                  placeholder="Enter your account name"
                  value={values.accountName}
                  label="Account Name"
                  onChange={handleChange}
                  name="accountName"
                  prefix={<IconSortAlfa />}
                  requited={true}
                  isError={!!(errors.accountName && touched.accountName)}
                />

                <TextField
                  placeholder="Enter your email"
                  value={values.email}
                  label="Account Email"
                  onChange={handleChange}
                  name="email"
                  prefix={<IconUser />}
                  requited={true}
                  isError={!!(errors.email && touched.email)}
                />
                <TextField
                  placeholder="Enter your phone number"
                  value={values.phone}
                  label="Account Phone Number"
                  onChange={handleChange}
                  name="phone"
                  type="number"
                  prefix={<IconPhone />}
                  requited={true}
                  isError={!!(errors.phone && touched.phone)}
                />
                <TextField
                  placeholder="Enter your password"
                  value={values.password}
                  label="Password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  prefix={<IconLock />}
                  requited={true}
                  isCheckList={true}
                  isError={!!(errors.password && touched.password)}
                  rules={["minLength", "capital", "number", "specialChar"]}
                  minLength={8}
                  messages={{
                    minLength: "At least 8 characters",
                    capital: "Must contain at least an uppercase letter",
                    number: "Must contain at least a number",
                    specialChar:
                      "Inclusion of at least one special character, e.g., ! @ # ? ]",
                  }}
                />

                <TextField
                  placeholder="Re- enter your password"
                  value={values.confirmPassword}
                  valueAgain={values.password}
                  label="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                  type="password"
                  prefix={<IconLock />}
                  requited={true}
                  isCheckList={true}
                  isError={
                    !!(errors.confirmPassword && touched.confirmPassword)
                  }
                  rules={["match"]}
                  messages={{
                    match: "Passwords need to match",
                  }}
                />
                <div>
                  <StyledForm.ButtonNext
                    text="Submit"
                    type="submit"
                    disabled={
                      !(
                        values.accountName &&
                        values.email &&
                        values.phone &&
                        values.password &&
                        values.confirmPassword
                      )
                    }
                    isLoading={isLoading}
                  />
                </div>
              </StyledForm.Form>
            </StyledForm.Body>
          </>
        )}
      </Formik>
    </div>
  );
};

export default FormAuthCredentials;
