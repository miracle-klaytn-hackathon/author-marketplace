/* TEXT-FIELD COMPONENT
   ========================================================================== */

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import Styled from "./text-field.style";
import ReactPasswordChecklist, {
  ReactPasswordChecklistProps,
} from "components/PasswordChecklist/PasswordChecklist";
import { ReactComponent as IconViewHide } from "assets/images/View_hide_fill.svg";
import { ReactComponent as IconView } from "assets/images/View_fill.svg";

interface TextFieldProps
  extends ReactPasswordChecklistProps,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "onBlur"
    > {
  type?: string;
  name?: string;
  placeholder?: string;
  value: string;
  className?: string;
  onChange: (value: React.ChangeEvent<any>) => void;
  onBlur?: (value?: string) => void;
  label?: string;
  size?: "small" | "medium" | "large";
  prefix?: ReactNode | null;
  suffix?: ReactNode | null;
  requited?: boolean;
  isError?: boolean;
  isCheckList?: boolean;
  error?: string;
  classNameWrap?: string;
  regex?: RegExp;
}

const TextField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  label,
  size = "medium",
  prefix,
  suffix,
  requited,
  classNameWrap,
  className,
  isError,
  isCheckList,
  rules,
  minLength,
  messages,
  valueAgain,
  error,
  regex,
  ...props
}: TextFieldProps) => {
  const [showCheckList, setShowCheckList] = useState(false);
  const [isViewPassword, setIsViewPassword] = useState(false);
  const [focusInputPhone, setFocusInputPhone] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [typeField, setTypeField] = useState("");

  const isPhoneNumber = useMemo(() => {
    return name === "phone";
  }, [name]);

  const isFieldPassword = useMemo(() => {
    return type === "password";
  }, [type]);

  useEffect(() => {
    if (value && isPhoneNumber) {
      setFocusInputPhone(true);
    }
  }, [isPhoneNumber, value]);

  const handleFocusInput = () => {
    setIsFocus(true);
    if (isFieldPassword) {
      setShowCheckList(true);
    }

    if (isPhoneNumber) {
      setFocusInputPhone(true);
    }
  };

  const handleBlurInput = () => {
    setIsFocus(false);
    if (isFieldPassword) {
      setShowCheckList(false);
    }

    if (isPhoneNumber && !value) {
      setFocusInputPhone(false);
    }
    onBlur && onBlur();
  };

  const handleSuffix = () => {
    if (isFieldPassword) {
      setIsViewPassword((value) => !value);
    }
  };

  useEffect(() => {
    if (isViewPassword) {
      setTypeField("text");
    } else {
      setTypeField("");
    }
  }, [isViewPassword, setTypeField]);

  const renderSuffix = useCallback(() => {
    if (isFieldPassword && isViewPassword) {
      return <IconView />;
    }
    if (isFieldPassword && !isViewPassword) {
      return <IconViewHide />;
    }

    return suffix;
  }, [isFieldPassword, isViewPassword, suffix]);

  const handleOnChange = useCallback(
    (e) => {
      if (regex) {
        const isValid = regex?.test(e?.target?.value);
        if (isValid) {
          onChange(e);
        }
        return;
      }
      onChange(e);
    },
    [onChange, regex]
  );

  return (
    <Styled.Container className={classNameWrap}>
      <Styled.Label className={className}>
        {label} {requited && <Styled.Required>*</Styled.Required>}
        <Styled.InputContainer $isError={isError} $isFocus={isFocus}>
          {prefix && (
            <Styled.WrapIcon className="mr-14">{prefix}</Styled.WrapIcon>
          )}
          {isPhoneNumber && (
            <Styled.CountryCode $isValue={focusInputPhone}>
              (+61)
            </Styled.CountryCode>
          )}
          <Styled.Input
            {...props}
            name={name}
            placeholder={placeholder}
            type={typeField || type}
            value={value}
            onChange={handleOnChange}
            onFocus={handleFocusInput}
            onBlur={handleBlurInput}
          />

          {suffix ||
            (isFieldPassword && (
              <Styled.WrapIcon className="ml-14" onClick={handleSuffix}>
                {renderSuffix()}
              </Styled.WrapIcon>
            ))}

          {isCheckList && isFieldPassword && showCheckList && (
            <Styled.Popup>
              <p>Password conditions:</p>
              <ReactPasswordChecklist
                rules={rules}
                minLength={minLength}
                value={value}
                valueAgain={valueAgain}
                messages={messages}
              />
            </Styled.Popup>
          )}
        </Styled.InputContainer>
        {!error && isError && name && (
          <Styled.ErrorMessage name={name} component="span" />
        )}
        {error && isError && name && (
          <Styled.MessageError id="message-error">{error}</Styled.MessageError>
        )}
      </Styled.Label>
    </Styled.Container>
  );
};

export default TextField;
