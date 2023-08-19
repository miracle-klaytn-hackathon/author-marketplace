import { IBaseErrorResponse } from "api/interfaces";
import { requestWithoutJwt } from "../request";

interface PayloadSignIn {
  email: "string";
  password: "string";
}

export const signIn = (params: PayloadSignIn) => {
  return requestWithoutJwt
    .post("/api/sign-in", params)
    .then((res) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
