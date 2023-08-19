export interface CompanyRes {
  companyProfile: CompanyProfile;
  companyFacilityResponseListObjResponse: CompanyFacilityResponseListObjResponse;
}

export interface CompanyFacilityResponseListObjResponse {
  data: Datum[];
  page: number;
  total_item: number;
  page_size: number;
  total_page: number;
}

export interface Datum {
  facilityId: number;
  facilityName: string;
  facilityLastSubmit: null | string;
  totalRecords: number;
  scopeFirstTotalRecords: number;
  scopeFirstLastSubmit: null | string;
  scopeSecondTotalRecords: number;
  scopeSecondLastSubmit: null | string;
  scopeThirdTotalRecords: number;
  scopeThirdLastSubmit: null | string;
}

export interface CompanyProfile {
  id: number;
  name: string;
  size: string;
  website: string;
  countryId: number;
  phoneNumber: null;
  countryName: string;
}

export interface IGetCompany {
  page?: number;
  size?: number;
  getAll?: boolean;
}
