/* Select-FIELD COMPONENT
   ========================================================================== */

import Styled from "components/text-field/text-field.style";
import { ReactNode, useState, useRef, useMemo, useCallback } from "react";
import StyledS from "./select-field.style";
import useOnClickOutside from "hooks/useOnClickOutside";
import { ReactComponent as Loading } from "assets/images/Loading-blue.svg";
import { ReactComponent as ExpandDown } from "assets/images/Expand_down.svg";

export interface ISelectOption {
  value: any;
  label: ReactNode | string;
}

interface selectFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "prefix" | "onChange"
  > {
  options?: ISelectOption[];
  label?: ReactNode | string;
  onChange: (value: string) => void;
  name: string;
  placeholder?: string;
  value: string | number | undefined;
  className?: string;
  size?: "small" | "medium" | "large";
  prefix?: ReactNode | null;
  suffix?: ReactNode | null;
  requited?: boolean;
  isError?: boolean;
  error?: string;
  classWrap?: string;
  allowCreate?: boolean;
  handleCreateNew?: (name?: string) => void; // call api to save data and re getlist options
  loading?: boolean;
}

const SelectField = ({
  name,
  placeholder,
  value,
  onChange,
  label,
  size = "medium",
  prefix,
  suffix,
  requited,
  className,
  isError = false,
  options,
  error,
  classWrap,
  disabled,
  allowCreate = false,
  handleCreateNew,
  loading,
}: selectFieldProps) => {
  // const isPassword = type === "password";
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const refSelect = useRef(null);
  const inputRef = useRef(null);
  console.log("isOpen", isOpen);
  const closePopup = useCallback(() => {
    setInputValue("");
    setIsOpen(false);
  }, []);

  useOnClickOutside(refSelect, closePopup);

  const handleSelected = useCallback(
    (selected: string | number) => {
      onChange(selected as string);
      setInputValue("");
    },
    [onChange]
  );

  const filteredOptions = useMemo(
    () =>
      options?.filter((option) => String(option?.label)?.includes(inputValue)),
    [inputValue, options]
  );

  const handleInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);

  const handleCreate = useCallback(
    (e = null) => {
      e?.stopPropagation?.();
      handleCreateNew?.(inputValue);
      closePopup?.();
    },
    [closePopup, handleCreateNew, inputValue]
  );

  const handleEnterPress = useCallback(
    (e) => {
      if (e.key === "Enter" && inputValue.trim() && !filteredOptions?.length) {
        handleCreate?.();
      }
    },
    [filteredOptions?.length, handleCreate, inputValue]
  );
  const selectValueRender = useMemo(() => {
    if (isOpen && allowCreate) {
      return (
        <StyledS.Select>
          <input
            type="text"
            className="custom-input"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleEnterPress}
            placeholder={placeholder}
          />
        </StyledS.Select>
      );
    }

    return (
      <StyledS.Select>
        {!value && placeholder && (
          <StyledS.Placeholder>{placeholder}</StyledS.Placeholder>
        )}
        {value && (
          <StyledS.Value disabled={disabled}>
            {options
              ? options?.find((item) => item.value === value)?.label
              : value}
          </StyledS.Value>
        )}
      </StyledS.Select>
    );
  }, [
    allowCreate,
    disabled,
    handleEnterPress,
    handleInputChange,
    inputValue,
    isOpen,
    options,
    placeholder,
    value,
  ]);

  const selectOptionRender = useMemo(() => {
    if (!isOpen) {
      return null;
    }
    const isNoData = !filteredOptions?.length;
    return (
      <StyledS.Popup>
        <StyledS.List>
          {!isNoData ? (
            filteredOptions?.map((option: ISelectOption) => (
              <StyledS.Option
                key={option.value}
                className={value === option.value ? "active" : ""}
                onClick={() => {
                  handleSelected(option.value);
                }}
              >
                {option.label}
              </StyledS.Option>
            ))
          ) : (
            <StyledS.Option className="no-data" onClick={handleCreate}>
              {allowCreate ? `+ Create ${inputValue} company` : "No data"}
            </StyledS.Option>
          )}
        </StyledS.List>
      </StyledS.Popup>
    );
  }, [
    isOpen,
    filteredOptions,
    handleCreate,
    allowCreate,
    inputValue,
    value,
    handleSelected,
  ]);

  return (
    <Styled.Container className={classWrap}>
      <Styled.Label className={className}>
        {label} {requited && <Styled.Required>*</Styled.Required>}
        <StyledS.SelectContainer
          $isError={isError}
          onClick={(e) => {
            e.stopPropagation();
            console.log("e", e);
            if (disabled) {
              return;
            }
            setIsOpen((value) => !value);
          }}
          ref={refSelect}
          $isOpen={isOpen}
          disabled={disabled}
        >
          {prefix && (
            <Styled.WrapIcon className="mr-14">{prefix}</Styled.WrapIcon>
          )}
          {selectValueRender}
          {!disabled && (
            <Styled.WrapIcon className="ml-14" $isOpen={isOpen}>
              {loading && <Loading className="loading-icon" />}
              {suffix ? suffix : <ExpandDown />}
            </Styled.WrapIcon>
          )}

          {selectOptionRender}
        </StyledS.SelectContainer>
        {!error && isError && (
          <Styled.ErrorMessage name={name} component="span" />
        )}
        {error && isError && <Styled.MessageError>{error}</Styled.MessageError>}
      </Styled.Label>
    </Styled.Container>
  );
};

export default SelectField;
