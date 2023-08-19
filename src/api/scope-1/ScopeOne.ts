import { IBaseErrorResponse } from "api/interfaces";
import { AxiosResponseC, requestWithJwt } from "api/request";
import { ICreateScope, IGetListScope } from "./scope.interface";
import queryString from "query-string";

export const getListScopeOneApi = (dataParams?: IGetListScope) => {
  const params = queryString.stringify(dataParams || {});
  return requestWithJwt
    .get(`/api/scope-management/list?${params}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};

export const createScopeApi = (params: ICreateScope) => {
  return requestWithJwt
    .post("/api/scope-management/create", params)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};

export const getScopeDetail = (id: string) => {
  return requestWithJwt
    .get(`/api/scope-management/${id}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};

export const updateScopeApi = (params: ICreateScope) => {
  return requestWithJwt
    .post("/api/scope-management/update", params)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};

export const deleteScopeApi = (id: number) => {
  return requestWithJwt
    .post(`/api/scope-management/delete/${id}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
