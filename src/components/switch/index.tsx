/* eslint-disable quotes */
import { Switch as LibSwitch, SwitchProps } from "@mui/material";
import styled from "styled-components";

const SwitchC = styled(LibSwitch)`
  width: 46px !important;
  border-radius: 20px !important;
  height: 24px !important;
  padding: 0 !important;

  & > span {
    padding: 0 !important;
    height: 100% !important;
  }
  & > span:first-child {
    transform: translateX(1px);
  }

  .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.text4} !important;
    opacity: 1 !important;
  }

  .Mui-checked {
    transform: translateX(24px) !important;
    color: #fff !important;
  }

  .Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.primary} !important;
  }
`;

export const Switch = ({ ...props }: SwitchProps) => {
  return <SwitchC disableRipple {...props} />;
};
