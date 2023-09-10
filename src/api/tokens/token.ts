import { IBaseErrorResponse } from 'api/interfaces'
import { genericRequest } from 'api/request'
import { AxiosResponse } from 'axios'

export interface BookToken {
    id: string,
    name: string,
    address: string,
    symbol: string
    price: number
}

export const getBookTokens = () : Promise<AxiosResponse<BookToken[], any>> => {
    return genericRequest
    .get(`/books/recommendation`)
    .then((res) => {
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
}

export const getBookTokenABI = () : Promise<AxiosResponse<string, any>> => {
  return genericRequest
  .get(`/books/abi`)
  .then((res) => {
    return res;
  })
  .catch((error) => Promise.reject(error as IBaseErrorResponse));
}