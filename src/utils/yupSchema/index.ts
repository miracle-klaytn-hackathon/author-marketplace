import * as yup from "yup";

export const yupSchema = {
  required: yup.string().required("This is required field!"),
  validateBase: yup
    .string()
    .max(255, "maximum characters is 255")
    .required("This is required field!"),
  phone: yup
    .number()
    .required("This is required field!")
    .test(
      "phone",
      "Your phone number format is invalid!",
      (value: number) => String(value).length >= 8 && String(value).length <= 12
    ),
  email: yup
    .string()
    .email("Your email format is invalid!")
    .required("This is required field!"),
  password: yup
    .string()
    .required("This is required field!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Your password format is invalid!"
    ),
  confirmPassword: yup
    .string()
    .required("This is required field!")
    .oneOf(
      [yup.ref("newPassword")],
      "The password confirmation does not match"
    ),
};

export const schemaCompanyInfo = yup.object().shape({
  companyName: yupSchema.validateBase,
  origin: yupSchema.required,
  website: yupSchema.validateBase,
});

export const schemaAuthCredentials = yup.object().shape({
  accountName: yupSchema.validateBase,
  phone: yupSchema.phone,
  email: yupSchema.email,
  password: yupSchema.password,
  confirmPassword: yup
    .string()
    .required("This is required field!")
    .oneOf([yup.ref("password")], "The password confirmation does not match"),
});

export const schemaUpdatePassword = yup.object().shape({
  newPassword: yupSchema.password,
  confirmPassword: yupSchema.confirmPassword,
});

export const schemaSendEmail = yup.object().shape({
  email: yupSchema.email,
});
