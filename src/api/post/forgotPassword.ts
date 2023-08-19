import { AxiosResponseC, requestWithoutJwt } from "api/request";

interface PayloadSendEmail {
  email: string;
}
interface PayloadForgotPassword {
  token: string;
}
interface PayloadUpdatePassword {
  newPassword: string;
  token: string;
}

export const forgotPassword = (payload: PayloadForgotPassword) => {
  return requestWithoutJwt.post(`/api/forget/password?token=${payload.token}`);
};

export const sendEmail = (payload: PayloadSendEmail) => {
  return requestWithoutJwt
    .post(`/api/send-mail/forget/password?email=${payload.email}`)
    .then((res: AxiosResponseC) => res);
};

export const updatePassword = (payload: PayloadUpdatePassword) => {
  return requestWithoutJwt.post(
    `/api/change/password?newPassword=${payload.newPassword}&token=${payload.token}`
  );
};
