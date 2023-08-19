import { IBaseErrorResponse } from "api/interfaces";
import { AxiosResponseC, requestWithJwt } from "api/request";
import queryString from "query-string";
import { IGetCompany } from "./company.interface";

export const getListCompanyFacility = (dataParams: IGetCompany) => {
  const params = queryString.stringify(dataParams || {});
  return requestWithJwt
    .get(`/api/list/company-facility?${params}`)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
