import { IBaseErrorResponse } from "api/interfaces";
import { AxiosResponseC, requestWithJwt } from "api/request";
import queryString from "query-string";
import { IUploadParams } from "./common.interface";

export const postImageToAwsApi = (params?: FormData) => {
  return requestWithJwt
    .post("/api/upload-file/input-type", params)
    .then((res: AxiosResponseC) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
};
