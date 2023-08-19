import { AxiosResponseC } from "api/request";
import { requestWithoutJwt } from "api/request";

export const getCountryList = () => {
  return requestWithoutJwt
    .get("/api/list/country-name")
    .then((res: AxiosResponseC) => res);
};
