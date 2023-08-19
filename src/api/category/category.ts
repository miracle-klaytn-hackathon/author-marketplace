import { IBaseErrorResponse } from "api/interfaces";
import { AxiosResponseC, requestWithJwt } from "api/request";

export const getListCategory = (typeScope: number) => {
  return requestWithJwt
    .get(`/api/selection/category?typeScope=${typeScope}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};

export const getListInputType = (categoryId: string) => {
  return requestWithJwt
    .get(`/api/selection/input-type?categoryId=${categoryId}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
