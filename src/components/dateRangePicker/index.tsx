import React, { useEffect, useState } from "react";
import { Popover } from "@mui/material";

import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import styled from "styled-components";
import Button from "components/button/button";
import moment from "moment";
import SelectField from "components/select-field/select-field";
import { dateRangesOptions } from "constants/date";

const Styled = {
  RangePiker: styled(DayPicker)`
    .rdp-caption_label {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      color: ${({ theme }) => theme.colors.primary};
    }

    .rdp-head_cell {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px; /* 142.857% */
    }

    .rdp-nav_button {
      color: ${({ theme }) => theme.colors.blacks20};
    }

    .rdp-day_range_middle.rdp-day_selected,
    .rdp-day_range_start.rdp-day_selected,
    .rdp-day_range_end.rdp-day_selected {
      background-color: ${({ theme }) => theme.colors.primary};
    }

    .rdp-day_today {
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }
  `,
  Title: styled.div`
    padding: 10px;
  `,
  WrapSelect: styled.div`
    padding: 24px 24px 0px 24px;
  `,
  Footer: styled.div`
    padding: 24px 16px 16px 16px;
    border-top: 1px solid #e5e5e5;
    text-align: right;
  `,

  Cancel: styled.span`
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.s07};
    padding: 10px 20px;
    margin-right: 8px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  `,
};

export interface FilterDate {
  from: string;
  to: string;
}

interface Props {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  onChangeDate: (values: FilterDate) => void;
  values: FilterDate | undefined;
}

// eslint-disable-next-line react/prop-types
export default function BasicDateRangePicker({
  values,
  anchorEl,
  onClose,
  onChangeDate,
}: Props) {
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [dateRangeSelected, setDateRangeQuick] = useState<any>(undefined);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (values?.from && values?.to && open) {
      setSelectedRange({
        from: new Date(
          moment(values?.from, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        ),
        to: new Date(
          moment(values?.to, "DD/MM/YYYY").format("YYYY-MM-DDTHH:mm:ss.SSSZ")
        ),
      });
      return;
    }
    setSelectedRange(undefined);
  }, [values, open]);

  const id = open ? "simple-popover" : undefined;

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    if (selectedRange?.from && selectedRange?.to) {
      setSelectedRange(undefined);
      setDateRangeQuick(undefined);
      return;
    }
    setSelectedRange(range);
    setDateRangeQuick(undefined);
  };

  const handleClose = () => {
    if (anchorEl instanceof HTMLButtonElement) {
      anchorEl.className = anchorEl?.className
        .split(" ")
        .filter((item) => item !== "active")
        .join(" ");
    }
    !values && setSelectedRange(undefined);
    onClose();
  };

  const handleApply = () => {
    onChangeDate({
      from: moment(selectedRange?.from).format("DD/MM/YYYY"),
      to: moment(selectedRange?.to).format("DD/MM/YYYY"),
    });
    onClose();
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
      {/* <Styled.Title></Styled.Title> */}
      <Styled.WrapSelect>
        <SelectField
          placeholder="Quick select"
          label="Select Date Range"
          name="origin"
          value={dateRangeSelected}
          options={dateRangesOptions}
          onChange={(e: any) => {
            setDateRangeQuick(e);
            setSelectedRange({
              from: e?.from,
              to: e?.to,
            });
          }}
        />
      </Styled.WrapSelect>
      <Styled.RangePiker
        mode="range"
        selected={selectedRange}
        onSelect={handleRangeSelect}
        numberOfMonths={2}
        disabled={(day: Date) => day > new Date()}
      />
      <Styled.Footer>
        <Styled.Cancel onClick={handleClose}>Cancel</Styled.Cancel>
        <Button
          text="Apply"
          disabled={!(selectedRange?.from && selectedRange?.to)}
          onClick={handleApply}
        />
      </Styled.Footer>
    </Popover>
  );
}
