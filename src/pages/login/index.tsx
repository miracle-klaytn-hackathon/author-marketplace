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
import { BrowserProvider } from "ethers";
import { SiweMessage } from "siwe";

import { ReactComponent as EtherIcon } from "assets/images/EtheriumIcon.svg";
import { BASE_API } from "constants/common";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

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

  const createSiweMessage = (
    address: string | undefined,
    statement: string | undefined
  ) => {
    const siweMessage = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 1,
    });
    return siweMessage.prepareMessage();
  };

  let message: string = "";
  let signature: string = "";

  const signInWithEthereum = async () => {
    const signer = await provider.getSigner();
    message = createSiweMessage(
      signer.address,
      "Sign in with Ethereum to the app."
    );
    signature = await signer.signMessage(message);
  };

  const sendForVerification = async () => {
    const res = await fetch(`${BASE_API}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature }),
    });
    console.log(await res.text());
  };

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
              {/* Ether login */}
              <LoginStyled.Button
                type="submit"
                text="Log In With Etherium"
                className="btn-success bases__margin--top16"
                isLoading={isLoading}
                icon={<EtherIcon />}
                onClick={signInWithEthereum}
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
