export const REQUIRE_MESSAGE = "This is required field!";
export const DECIMAL_3_MESSAGE =
  "Please enter a decimal number with up to 3 decimal places only";
export const CRESTE_SUCCESS_MESSAGE = "Created successful";
export const UPDATE_SUCCESS_MESSAGE = "Updated successful";

export const DECIMAL_3 = /^\d+(\.\d{1,3})?$/;

export enum CategoryTypes {
  ALL = "ALL",
  STATIONARY_TRANSPORT_FUELS = "STATIONARY_TRANSPORT_FUELS",
  OTHERS = "OTHERS",
  MOBILE_TRANSPORTS_FUELS = "MOBILE_TRANSPORTS_FUELS",
  ELECTRICITY = "ELECTRICITY",
}

export const BASE_API = process.env.REACT_APP_API || "http://localhost:8080/author-contract"

export const PROFILE = {
  SAMPLE_PROFILE_CARD_PROPS: {
    avatarLink: "https://enftx.vercel.app/images/avatar/1.jpg",
    walletAdress: process.env.WALLET_ADRESS || "0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c",
    userName: "khankluan24",
    email: "abc@gmail.com",
  }
}