import React, { useState } from "react";
import Illustration from "assets/images/Illustration.png";
import FormCompanyInfo from "./FormCompanyInfo";
import { Styled } from "./sign-up.style";
import FormAuthCredentials from "./FormAuthCredentials";
import LayoutSignUp from "layout/LayoutSignUp";
import useMediaQuery, { QUERY } from "hooks/useMediaQuery";
import { Link } from "react-router-dom";
import ROUTES from "routes/constant";

export interface FormAuthValue {
  accountName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export const initValue: FormAuthValue = {
  accountName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

export interface FormValueCompany {
  companyName: string;
  origin: string;
  website: string;
  size: string;
}

export const initValueCompany: FormValueCompany = {
  companyName: "",
  origin: "Australia",
  website: "",
  size: "",
};

const SignUp = () => {
  const isTables = useMediaQuery(QUERY.TABLETS);
  const [isAuthCredentials, setIsAuthCredentials] = useState(false);
  const handleBackToCompanyInfo = () => setIsAuthCredentials(false);
  const [valuesCompanyInfo, setValuesCompanyInfo] =
    useState<FormValueCompany>(initValueCompany);
  const [valuesAuthCredential, setValuesAuthCredential] =
    useState<FormAuthValue>(initValue);

  return (
    <LayoutSignUp>
      <Styled.SignUpContainer>
        {!isTables && (
          <Styled.WrapImage>
            <Styled.Image src={Illustration} alt="" />
          </Styled.WrapImage>
        )}

        <Styled.WrapInfo>
          <Styled.Title>Welcome to Enviro Capture!</Styled.Title>
          <Styled.subTitle>Register your account</Styled.subTitle>

          {isAuthCredentials ? (
            <FormAuthCredentials
              valuesCompanyInfo={valuesCompanyInfo}
              backToCompanyInfo={handleBackToCompanyInfo}
              valuesAuth={valuesAuthCredential}
              changeValuesAuth={(values: FormAuthValue) =>
                setValuesAuthCredential(values)
              }
            />
          ) : (
            <FormCompanyInfo
              onNext={() => setIsAuthCredentials(true)}
              valuesCompanyInfo={valuesCompanyInfo}
              changeValuesCompanyInfo={(values: FormValueCompany) =>
                setValuesCompanyInfo(values)
              }
            />
          )}

          <Styled.Message>
            By signing up, you have agreed to our{" "}
            <Styled.TermsSpan>
              <Link to={ROUTES.termsAndCondition}>Terms and Conditions</Link>
            </Styled.TermsSpan>
          </Styled.Message>
        </Styled.WrapInfo>
      </Styled.SignUpContainer>
    </LayoutSignUp>
  );
};

export default SignUp;
