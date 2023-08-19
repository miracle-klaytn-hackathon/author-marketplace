import React, { useState } from "react";
import { Formik } from "formik";
import { ReactComponent as IconUser } from "assets/images/User.svg";
import TextField from "components/text-field/text-field";
import { useNavigate } from "react-router-dom";
import ROUTES from "routes/constant";
import { StyledForm, Styled } from "./forgot-password.style";
import { schemaSendEmail } from "utils/yupSchema";
import { sendEmail } from "api/post/forgotPassword";
import { toast } from "react-toastify";

const InitValue = {
  email: "",
};

const SenEmail = () => {
  const navigate = useNavigate();
  const [isSended, setIsSended] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const onSubmit = (values: any) => {
    if (isSend) return;
    setIsSended(true);
    sendEmail({ email: values.email })
      .then((res) => {
        if (res?.statusCode === 200) {
          toast.success("Please check your email to complete");
          setIsSend(true);
          return;
        }

        toast.error(res?.message || "Something Went Wrong");
      })
      .catch((err) => {
        toast.error(err?.message || "Something Went Wrong");
      })
      .finally(() => setIsSended(false));
  };

  const handleBackToLogin = () => navigate(ROUTES.login);

  return (
    <Styled.WrapInfo>
      <Styled.Title>Forgot password?</Styled.Title>
      <Styled.subTitle>
        We will send you an email containing a link to create a new password for
        your account
      </Styled.subTitle>

      <Formik
        key="verify email"
        initialValues={InitValue}
        validationSchema={schemaSendEmail}
        onSubmit={onSubmit}
        isInitialValid={true}
        // innerRef={formikRef}
      >
        {({ handleSubmit, values, errors, touched, handleChange }) => (
          <StyledForm.Body>
            <StyledForm.Form onSubmit={handleSubmit}>
              <TextField
                placeholder="Enter your email"
                value={values.email}
                label="Email"
                onChange={handleChange}
                name="email"
                prefix={<IconUser />}
                requited={true}
                isError={!!(errors.email && touched.email)}
              />

              <div>
                <StyledForm.ButtonNext
                  text="Send"
                  type="submit"
                  disabled={!values.email || isSend}
                  isLoading={isSended}
                />
                <StyledForm.BackTo>
                  <StyledForm.BackToMessage onClick={handleBackToLogin}>
                    Back to Login
                  </StyledForm.BackToMessage>
                </StyledForm.BackTo>
              </div>
            </StyledForm.Form>
          </StyledForm.Body>
        )}
      </Formik>
    </Styled.WrapInfo>
  );
};

export default SenEmail;
