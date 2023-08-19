export interface CategoryRes {
  id: number;
  name: string;
}

export interface ICreateScope {
  categoryRequestList?: {
    categoryId: number;
    inputTypeRequests?: {
      inputTypeId: number;
      inputTypeScopeRequests: {
        consumptionDate: any;
        consumptionValue: number;
        customerId: number;
        documentUpload: string;
        inputTypeUnitId?: number;
        status: string;
        inputTypeScopeId?: number;
      }[];
    }[];
  }[];
  facilityId: number;
  typeScope: number;
}

export interface IScopeDetail {
  facilityId: number;
  typeScope: number;
  categoryRequestList: CategoryRequestList[];
}

export interface CategoryRequestList {
  categoryId: number;
  inputTypeRequests: InputTypeRequest[];
}

export interface InputTypeRequest {
  inputTypeId: number | undefined;
  inputTypeScopeRequests: InputTypeScopeRequest[];
}

export interface InputTypeScopeRequest {
  consumptionValue: number;
  inputTypeUnitId: number;
  consumptionDate: number;
  customerId: number;
  documentUpload: string;
  status: string;
  inputTypeScopeId?: number;
  createdDate?: string;
}

export interface InputTypeScope {
  id: number;
  scopeManagementId: number;
  inputTypeId: number;
  consumptionValue: number;
  inputTypeUnitId: number;
  consumptionDate: string;
  customerId: number;
  documentUpload: string;
  fileLink: string;
  status: string;
  imageName?: string;
  imageLink?: string;
  inputTypeName: null;
  inputTypeUnitName: string;
  outputConsumptionValue: null;
  inputTypeUnitValue: number;
  outputTypeUnitValue: number;
  outputTypeUnitName: string;
  customerName: string;
}

export interface Facility {
  id: number;
  facilityId: number;
  companyId: number;
  categoryId: number;
  inputTypeName?: string;
  status: string;
  typeScope: string;
  facilityName: string;
  categoryName: string;
  totalRecord: number;
  inputType: string;
  inputTypeScopeList: InputTypeScope[];
  totalRows?: number;
  pageNum: number;
}

export interface IGetListScope {
  category?: string;
  facilities?: number[];
  fromDate?: string | undefined;
  inputType?: string;
  toDate?: string | undefined;
  typeScope?: number;
  inputTypeScopeStatuses?: string[];
  page?: number;
  size?: number;
}
