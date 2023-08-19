/* PAGE: LOGIN
   ========================================================================== */

import { useState } from "react";
import useSessionStorage from "hooks/useSessionStorage";
import LoginStyled from "./login.style";
import LoginLogo from "assets/images/LoginLogo.png";
import TextField from "components/text-field/text-field";
import { ReactComponent as UserIcon } from "assets/images/User.svg";
import { ReactComponent as Lock } from "assets/images/Lock.svg";
import { Formik } from "formik";
import ROUTES from "routes/constant";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { signIn } from "api/login/login.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, setRefreshToken] = useSessionStorage<string | null>(
    "refresh-token",
    null
  );
  const navigate = useNavigate();
  const [, setUserInfo] = useSessionStorage("user", null);

  const onSubmit = (values: any) => {
    setIsLoading(true);
    signIn(values)
      .then((res: any) => {
        if (res?.statusCode == 200) {
          const { token, ...userInfo } = res.data;
          setRefreshToken(token);
          setUserInfo(userInfo);
        } else {
          toast.error(res?.message);
        }
      })
      .catch(() => {
        toast.error("There is something wrong. Please try again!");
      })
      .finally(() => setIsLoading(false));
  };

  const InitValue: any = {
    email: "",
    password: "",
  };

  const forgotPasswordClick = () => {
    navigate(ROUTES.forgotPassword);
  };

  const ValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Your email format is invalid.")
      .required("This is required field!"),
    password: yup.string().required("This is required field!"),
  });

  return (
    <LoginStyled.Container>
      <LoginStyled.Row>
        <LoginStyled.LogoImageDiv>
          {/* <LoginStyled.LogoImage src={LoginLogo} /> */}
        </LoginStyled.LogoImageDiv>
        <Formik
          key="Login Page"
          initialValues={InitValue}
          validationSchema={ValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors, touched, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <LoginStyled.FieldInput>
                <TextField
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  label="Email"
                  requited={true}
                  prefix={<UserIcon />}
                  isError={!!(errors.email && touched.email)}
                />
              </LoginStyled.FieldInput>
              <LoginStyled.FieldInput>
                <TextField
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  label="Password"
                  requited={true}
                  prefix={<Lock />}
                  isError={!!(errors.password && touched.password)}
                />
              </LoginStyled.FieldInput>

              <LoginStyled.ForgotPassword>
                <LoginStyled.Link onClick={forgotPasswordClick}>
                  Forgot Password?
                </LoginStyled.Link>
              </LoginStyled.ForgotPassword>
              <LoginStyled.Button
                type="submit"
                text="Log In"
                className="btn-success"
                isLoading={isLoading}
              />
              <LoginStyled.SignUp>
                <LoginStyled.Link href="https://www.envirocapture.au/contact">
                  Don’t have an account? Contact Us
                </LoginStyled.Link>
              </LoginStyled.SignUp>
              <LoginStyled.SignUp>
                <LoginStyled.TextTerms>
                  By logging in, you have agreed to our&nbsp;
                </LoginStyled.TextTerms>
                <LoginStyled.Link>
                  <Link to={ROUTES.termsAndCondition}>
                    Terms and Conditions
                  </Link>
                </LoginStyled.Link>
              </LoginStyled.SignUp>
              <LoginStyled.CoppyRight>
                <LoginStyled.TextTerms>
                  Copyright © 2023 Enviro Capture Group Pty Ltd. All rights
                  reserved.
                </LoginStyled.TextTerms>
              </LoginStyled.CoppyRight>
            </form>
          )}
        </Formik>
      </LoginStyled.Row>
      {/* <button onClick={handleLogin}>Login</button> */}
    </LoginStyled.Container>
  );
};

export default Login;
