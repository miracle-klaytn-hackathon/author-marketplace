import { AxiosResponseC, requestWithoutJwt } from "api/request";

interface PayloadSingUp {
  accountName: string;
  companyName: string;
  email: string;
  origin: string;
  password: string;
  phone: string;
  roles: string[];
  size: string;
  website: string;
}

export const signUp = (params: PayloadSingUp) => {
  return requestWithoutJwt
    .post("/api/sign-up", params)
    .then((res: AxiosResponseC) => res);
};
