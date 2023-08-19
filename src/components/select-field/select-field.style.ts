import styled from "styled-components";

const StyledS = {
  SelectContainer: styled.div<{
    $isError?: boolean;
    $isOpen?: boolean;
    disabled?: boolean;
  }>`
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    display: flex;
    align-items: center;
    padding: 10px 14px;
    /* border-bottom: 1px solid
      ${({ $isError, theme }) =>
      $isError ? theme.colors.text3 : theme.colors.text4}; */

    border-bottom: 1px solid
      ${({ $isError, theme }) =>
        $isError ? theme.colors.text3 : theme.colors.text4};
    /* border-radius: 8px; */

    /* border-radius: 8px; */
    position: relative;
    background: ${({ theme }) => theme.colors.white};

    .mr-14 {
      margin-right: 14px;
    }
    .ml-14 {
      margin-left: 14px;
    }

    svg {
      color: ${({ theme, $isOpen }) =>
        $isOpen ? theme.colors.primary : theme.colors.text4};
    }
  `,
  Select: styled.div`
    flex: 1;
    overflow: hidden;
    position: relative;
    p {
      margin: 0;
    }
    .custom-input {
      width: 100%;
      border: none;
      outline: none;
    }
  `,
  Placeholder: styled.p`
    color: ${({ theme }) => theme.colors.text4};
  `,

  Value: styled.p<{
    disabled?: boolean;
  }>`
    color: ${({ theme, disabled }) => theme.colors.text1};
  `,

  Popup: styled.div`
    position: absolute;
    z-index: 2;
    top: 100%;
    border: 1px solid ${({ theme }) => theme.colors.text4};
    border-radius: 0 0 4px 4px;
    background: ${({ theme }) => theme.colors.white};
    width: 100%;
    left: 0;
    overflow: hidden;
    box-shadow: 0px 1px 2px 0px ${({ theme }) => theme.colors.text4};
  `,

  List: styled.ul`
    list-style: none;
    padding-left: 0;
    margin: 0;
    padding: 0;
    max-height: 250px;
    overflow: hidden;
    overflow-y: auto;
    .no-data {
      text-align: center;
    }
  `,
  Option: styled.li`
    padding: 8px 16px;
    transition: all 0.3s ease-in-out;
    color: ${({ theme }) => theme.colors.text1};
    margin-bottom: 3px;

    &:hover {
      background: ${({ theme }) => theme.colors.primary_light};
    }

    &.active {
      background-color: ${({ theme }) => theme.colors.primary_active};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
};

export default StyledS;
