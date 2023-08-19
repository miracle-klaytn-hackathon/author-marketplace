export interface IRecord {
  id: number;
  consumption: any;
  consumptionDate: any;
  customer: any;
  uploadDocument: any;
  inputTypeUnitId?: number;
  status?: string;
  createdDate?: string;
}
export interface IInputType {
  id: number;
  inputType: number | undefined;
  inputTypeTouched?: boolean;
  records: IRecord[];
}
export interface ICategory {
  id: number;
  category: number | undefined;
  categoryTouched?: boolean;
  inputTypes: IInputType[];
}

export interface IScopeData {
  facility: any;
  typeScope?: number;
  categories?: ICategory[];
}

export const SCOPE_KEYS = {
  facility: "facility",
  category: "category",
  inputType: "inputType",
  consumption: "consumption",
  consumptionDate: "consumptionDate",
  customer: "customer",
  uploadDocument: "uploadDocument",
};

export const DefaultScopeRecord: IRecord = {
  id: 1,
  consumption: "",
  consumptionDate: "",
  customer: "",
  uploadDocument: "",
};

export const DefaultScopeInputType: IInputType = {
  id: 1,
  inputType: undefined,
  records: [DefaultScopeRecord],
};

export const DefaultScopeCategory: ICategory = {
  id: 1,
  category: undefined,
  inputTypes: [DefaultScopeInputType],
};

// export enum ScopeStatues {
//   IN_DRAFT = "In draft",
//   SUBMITTED = "Submitted",
//   VALIDATING = "Validating",
//   VALID = "Valid",
//   INVALID = "Invalid",
// }
export enum ScopeStatues {
  IN_DRAFT = "IN_DRAFT",
  SUBMITTED = "SUBMITTED",
  VALIDATING = "VALIDATING",
  VALID = "VALID",
  INVALID = "INVALID",
}

export const MenuItemsStatusOptions = [
  { value: ScopeStatues.IN_DRAFT, label: "In Draft" },
  { value: ScopeStatues.SUBMITTED, label: "Submitted" },
  { value: ScopeStatues.VALIDATING, label: "Validating" },
  { value: ScopeStatues.VALID, label: "Valid" },
  { value: ScopeStatues.INVALID, label: "Invalid" },
];

export const ScopeStatuesColor = {
  [ScopeStatues.IN_DRAFT]: "#999999",
  [ScopeStatues.SUBMITTED]: "#3DA2FF",
  [ScopeStatues.VALIDATING]: "#D1A95D",
  [ScopeStatues.VALID]: "#59A52C",
  [ScopeStatues.INVALID]: "#B41C1C",
};
