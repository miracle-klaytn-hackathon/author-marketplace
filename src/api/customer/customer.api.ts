import { IBaseErrorResponse } from "api/interfaces";
import { AxiosResponseC, requestWithJwt } from "api/request";

export const getListCustomer = () => {
  return requestWithJwt
    .get("/api/selection/customer")
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
