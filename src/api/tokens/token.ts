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
    console.log(process.env.BACKEND_API)
    return genericRequest
    .get(`/books/recommendation`)
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((error) => Promise.reject(error as IBaseErrorResponse));
}