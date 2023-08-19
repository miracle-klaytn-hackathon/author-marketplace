import styled, { css } from "styled-components";

const ButtonStyled = {
  Button: styled.button<{ $white?: boolean }>`
    ${({ $white }) => {
      if ($white) {
        return css`
          border: 1px solid #59a52c;
          background-color: #fff;
          color: #59a52c;

          &:hover {
            cursor: pointer;
            background-color: #449d44;
            color: #ffffff;
          }
        `;
      }

      return css`
        background-color: #59a52c;
        color: #ffffff;
        border: none;

        &:hover {
          cursor: pointer;
          background-color: #449d44;
          color: #ffffff;
        }
      `;
    }}
    padding: 10px 20px;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease-in-out;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:disabled {
      background-color: #cccccc;
      pointer-events: none;
    }

    &.disabled {
      background-color: #cccccc;
    }

    &.btn-success:hover {
      cursor: pointer;
      background-color: #449d44;
      color: #ffffff;
    }

    &.primary {
      border: #59a52c 1px solid;
      background-color: #fff;
      color: #59a52c;
    }
  `,

  Icon: styled.span`
    margin-right: 5px;
    line-height: 14px;

    svg {
      width: 18px;
      height: 18px;
    }
  `,

  WrapIcon: styled.span`
    line-height: 10px;
    margin-right: 8px;
  `,
};

export default ButtonStyled;
