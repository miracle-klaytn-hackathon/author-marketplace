import { IBaseErrorResponse } from "api/interfaces";
import { genericRequest, requestWithoutJwt } from "../request";

interface PayloadSignIn {
  email: "string";
  password: "string";
}

interface SiweRequest {
  message: string | undefined
  signatrure: string | undefined
}

export const getNonce = () => {
  return genericRequest
    .get("/auth/siwe/nonce")
    .then(res => res.data.nonce)
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
}

export const verify = (params: SiweRequest | undefined) => {
  return genericRequest
    .post("/auth/siwe/verify", params)
    .then(res => res.data.token)
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
}

export const signIn = (params: PayloadSignIn) => {
  return requestWithoutJwt
    .post("/api/sign-in", params)
    .then((res) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
