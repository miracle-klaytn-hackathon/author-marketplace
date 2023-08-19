import { Popover } from "@mui/material";
import { ReactComponent as CalendarIcon } from "assets/images/CalendarIcon.svg";
import { formatDateNoTime } from "helpers/date.helper";
import React, { FC } from "react";
import { DayPicker } from "react-day-picker";
import { styled } from "styled-components";

const Styled = {
  WrapDate: styled.div<{ isError?: boolean }>`
    position: relative;
    .date-input {
      background: #fff !important;
      color: #1b1b1b;
      border-bottom: ${(props) =>
        props.isError ? "solid 1px #b41c1c" : "solid 1px #b3b3b3"};
      height: 44px;
      width: 100%;
      display: flex;
      align-items: center;
      .date {
        padding-left: 30px;
      }
      .placeholder {
        color: #b3b3b3;
      }
    }
    .icon-date {
      position: absolute;
      bottom: 11px;
    }
    .label {
      color: #59a52c;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      .dot {
        color: #b41c1c;
      }
    }
  `,
  ErrorMessage: styled.div`
    display: block;
    text-align: right;
    color: #b41c1c;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    position: absolute;
    right: 0px;
  `,

  DatePicker: styled(DayPicker)`
    .rdp-caption_label {
      font-size: 16px;
      color: #59a52c;
      font-weight: normal;
    }
    .rdp-caption {
      justify-content: center;
      position: relative;

      .rdp-nav {
        .rdp-nav_button_previous {
          position: absolute;
          left: 0;
          top: -10px;
          svg {
            height: 12px;
            path {
              fill: #cccccc;
            }
          }
        }
        .rdp-nav_button_next {
          position: absolute;
          right: 0;
          top: -10px;
          svg {
            height: 12px;
            path {
              fill: #cccccc;
            }
          }
        }
      }
    }
    .rdp-head_cell {
      color: #59a52c;
    }
    .rdp-day_selected {
      background-color: #59a52c;
    }
  `,
};

interface Props {
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  error?: string;
  label?: string;
  placeholderText?: string;
  requited?: boolean;
}

const CustomDayPicker: FC<Props> = ({
  selectedDay,
  setSelectedDay,
  error,
  label,
  placeholderText,
  requited,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;

  return (
    <Styled.WrapDate isError={!!error}>
      <div className="label">
        {label}
        {requited && <span className="dot">*</span>}
      </div>
      <div
        className="date-input"
        aria-describedby={id}
        onClick={(e) => handleClick(e)}
      >
        <CalendarIcon className="icon-date" />
        <div className="date">
          {formatDateNoTime(selectedDay) || (
            <span className="placeholder">
              {placeholderText || "Choose a date"}
            </span>
          )}
        </div>
      </div>
      {error && <Styled.ErrorMessage>{error}</Styled.ErrorMessage>}
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
        <Styled.DatePicker
          mode="single"
          className="custom-day-date"
          selected={selectedDay}
          modifiers={{ selected: selectedDay }}
          onSelect={(date) => {
            setSelectedDay(date as Date);
            setAnchorEl(null);
          }}
          footer={null}
        />
      </Popover>
    </Styled.WrapDate>
  );
};

export default CustomDayPicker;
