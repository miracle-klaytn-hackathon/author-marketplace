import React, { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { ReactComponent as IconLock } from "assets/images/Lock.svg";
import TextField from "components/text-field/text-field";
import { StyledForm, Styled } from "./forgot-password.style";
import { schemaUpdatePassword } from "utils/yupSchema";
import { useNavigate, useSearchParams } from "react-router-dom";
import ROUTES from "routes/constant";
import { updatePassword } from "api/post/forgotPassword";
import { toast } from "react-toastify";

interface InitValues {
  newPassword: string;
  confirmPassword: string;
}

const initValue: InitValues = {
  newPassword: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token"), [searchParams]);

  const onSubmit = ({ newPassword }: InitValues) => {
    if (token) {
      setIsLoading(true);
      updatePassword({ newPassword, token })
        .then(() => {
          navigate(`${ROUTES.forgotPassword}/${ROUTES.successfully}`);
          toast.success("Update Password Successfully");
        })
        .catch((err) => {
          toast.error(err?.message || "Something Went Wrong");
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    if (!token) {
      navigate(`${ROUTES.forgotPassword}/${ROUTES.tokenExpired}`);
      return;
    }
  }, [navigate, token]);

  return (
    <Styled.WrapInfo>
      <Styled.Title>Update your password</Styled.Title>
      <Styled.subTitle>
        Don’t use a password from another site, or something too obvious like
        your birthday.
      </Styled.subTitle>

      <Formik
        key="verify email"
        initialValues={initValue}
        validationSchema={schemaUpdatePassword}
        onSubmit={onSubmit}
        isInitialValid={true}
        // innerRef={formikRef}
      >
        {({ handleSubmit, values, errors, touched, handleChange }) => (
          <StyledForm.Body>
            <StyledForm.Form onSubmit={handleSubmit}>
              <TextField
                placeholder="Enter your password"
                value={values.newPassword}
                label="Password"
                onChange={handleChange}
                name="newPassword"
                type="password"
                prefix={<IconLock />}
                requited={true}
                isCheckList={true}
                isError={!!(errors.newPassword && touched.newPassword)}
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
                valueAgain={values.newPassword}
                label="Confirm Password"
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                prefix={<IconLock />}
                requited={true}
                isCheckList={true}
                isError={!!(errors.confirmPassword && touched.confirmPassword)}
                rules={["match"]}
                messages={{
                  match: "Passwords need to match",
                }}
              />

              <div>
                <StyledForm.ButtonNext
                  text="Apply"
                  type="submit"
                  disabled={!(values.newPassword && values.confirmPassword)}
                  isLoading={isLoading}
                />
              </div>
            </StyledForm.Form>
          </StyledForm.Body>
        )}
      </Formik>
    </Styled.WrapInfo>
  );
};

export default UpdatePassword;
