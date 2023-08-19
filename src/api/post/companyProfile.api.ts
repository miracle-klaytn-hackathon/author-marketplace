import { AxiosResponseC, requestWithJwt } from "api/request";

export interface PageSize {
  page: number;
  size: number;
}

interface Facility {
  id?: number | string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
}

interface Payload {
  companyName: string;
  companyCountry: string;
  companyWebsite: string;
  size: string;
  companyFacilityProfileRequests: Facility[];
}

export const updateCompanyProfile = (payLoad: Payload) => {
  return requestWithJwt
    .post("/api/update/company", payLoad)
    .then((res: AxiosResponseC) => res);
};

export const createCompanyProfile = (payLoad: Payload) => {
  return requestWithJwt.post("/api/create/company", payLoad);
};

export const getCompanyInfo = ({ page, size }: PageSize) => {
  return requestWithJwt
    .get(`/api/get/company?page=${page}&size=${size}`)
    .then((res: AxiosResponseC) => res);
};
