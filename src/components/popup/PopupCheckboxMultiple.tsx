import { Checkbox, MenuItem, Popover } from "@mui/material";
import Button from "components/button/button";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "components/text-field/text-field";
import { ReactComponent as IconSearch } from "assets/images/Search_alt.svg";
import { camelCase } from "lodash";

export interface Option {
  value: string | number;
  label: string;
}

interface PropsPopup {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  options: Option[];
  title: string;
  onChange: (payload: Option[]) => void;
  values: Option[];
}

const StyleP = {
  PopoverC: styled(Popover)``,
  Container: styled.div`
    padding: 24px;
    min-width: 290px;
  `,

  Title: styled.p`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 12px;
  `,
  InputSearch: styled(TextField)`
    margin-bottom: 10px;
    & > div:first-child {
      padding: 8px 16px;
      border: 1px solid ${({ theme }) => theme.colors.text4};
      border-radius: 10px;
    }

    input::placeholder {
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px; /* 142.857% */
      color: 1px solid ${({ theme }) => theme.colors.text4};
    }
  `,
  ListCheck: styled.div`
    max-height: 300px;
    overflow: auto;
    li {
      overflow: hidden;
    }
    .Mui-selected {
      svg {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  `,

  GroupButotn: styled.div`
    border-top: 1px solid #e5e5e5;
    padding-top: 16px;
    margin-top: 16px;
    text-align: right;
  `,

  Cancel: styled.span`
    padding: 10px 20px;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 142.857% */
    color: ${({ theme }) => theme.colors.s07};
    margin-right: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
  Apply: styled(Button)``,
};

const PopupCheckboxMultiple = ({
  anchorEl,
  title,
  onClose,
  options,
  onChange,
  values,
}: PropsPopup) => {
  const [listCheck, setListCheck] = useState<Option[]>([]);
  const [valueSearch, setValueSearch] = useState("");
  useEffect(() => {
    setListCheck(values);
  }, [values]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChecked = (option: Option) => {
    if (listCheck.some((item) => item.value === option.value)) {
      setListCheck((list) =>
        list.filter((item) => item.value !== option.value)
      );
      return;
    }

    setListCheck((list) => [...list, option]);
  };

  const handleClose = () => {
    if (anchorEl instanceof HTMLButtonElement) {
      anchorEl.className = anchorEl?.className
        .split(" ")
        .filter((item) => item !== "active")
        .join(" ");
    }

    !values.length && setListCheck([]);
    onClose();
    setTimeout(() => setValueSearch(""), 300);
  };

  const handleApply = () => {
    onChange(listCheck);
    handleClose();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <StyleP.Container>
        <StyleP.Title>{title}</StyleP.Title>
        <StyleP.InputSearch
          value={valueSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValueSearch(e.target.value);
          }}
          type="text"
          placeholder="Enter search"
          suffix={<IconSearch />}
        />
        <StyleP.ListCheck>
          {options
            ?.filter((option) =>
              camelCase(option?.label)
                ?.trim()
                ?.includes(camelCase(valueSearch)?.trim())
            )
            ?.map((item: Option, index: number) => {
              const isChecked = listCheck.some(
                (itemCheck) => itemCheck.value === item.value
              );

              return (
                <MenuItem
                  onClick={() => handleChecked(item)}
                  value={item.value}
                  selected={isChecked}
                  key={index}
                >
                  <Checkbox key={index} checked={isChecked} />
                  <label>{item.label}</label>
                </MenuItem>
              );
            })}
        </StyleP.ListCheck>

        <StyleP.GroupButotn>
          <StyleP.Cancel onClick={handleClose}>Cancel</StyleP.Cancel>
          <StyleP.Apply
            text="Apply"
            disabled={!listCheck?.length && !values?.length}
            onClick={handleApply}
          />
        </StyleP.GroupButotn>
      </StyleP.Container>
    </Popover>
  );
};

export default PopupCheckboxMultiple;
