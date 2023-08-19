/* TEXT-FIELD COMPONENT STYLES
   ========================================================================== */

import styled from "styled-components";
import { ErrorMessage } from "formik";

const Styled = {
  Container: styled.div``,

  Label: styled.label<{ $isFocus?: boolean }>`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,

  Required: styled.span`
    color: ${({ theme }) => theme.colors.text3};
  `,

  InputContainer: styled.div<{ $isError?: boolean; $isFocus?: boolean }>`
    display: flex;
    align-items: center;
    padding: 10px 14px;
    border-bottom: 1px solid
      ${({ $isError, $isFocus, theme }) => {
        if ($isError) return theme.colors.text3;
        if ($isFocus) return theme.colors.primary;
        return theme.colors.text4;
      }};
    cursor: pointer;
    background: ${({ theme }) => theme.colors.white};
    position: relative;

    .mr-14 {
      margin-right: 14px;
    }
    .ml-14 {
      margin-left: 14px;
    }

    svg {
      color: ${({ theme, $isFocus }) =>
        $isFocus ? theme.colors.primary : theme.colors.text4};
    }

    @media (max-width: 575.98px) {
      overflow: hidden;
    }
  `,

  WrapIcon: styled.span<{ $isOpen?: boolean }>`
    width: 24px;
    height: 17px;
    bottom: ${({ $isOpen }) => ($isOpen ? "-2px" : "4px")};
    position: relative;
    transition: all 0.3s ease-in-out;
    transform: rotateZ(${({ $isOpen }) => ($isOpen ? "180deg" : "0")});
    .loading-icon {
      position: absolute;
      fill: red;
      right: 30px;
      top: -8px;
      width: 20px;
    }
  `,

  CountryCode: styled.span<{ $isValue?: boolean }>`
    color: ${({ $isValue, theme }) =>
      $isValue ? theme.colors.text1 : theme.colors.text4};
    margin-right: 4px;
  `,

  Input: styled.input`
    flex: 1;
    border: none;
    outline: none;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text1};

    &::placeholder {
      color: ${({ theme }) => theme.colors.text4};
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type="number"] {
      -moz-appearance: textfield;
    }
  `,

  ErrorMessage: styled(ErrorMessage)`
    display: block;
    text-align: right;
    color: ${({ theme }) => theme.colors.text3};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,
  MessageError: styled.span`
    display: block;
    text-align: right;
    color: ${({ theme }) => theme.colors.text3};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  `,

  Popup: styled.div`
    position: absolute;
    background: #535252;
    color: ${({ theme }) => theme.colors.white};
    border-radius: 12px;
    top: 100%;
    transform: translateY(4px);
    right: 0;
    padding: 20px;
    z-index: 2;
    max-width: 50%;

    & > p {
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 16px;
    }
  `,

  // Field-Select
  Select: styled.select`
    flex: 1;
    border: none;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text4};
    }
  `,
  Option: styled.option``,
};

export default Styled;
