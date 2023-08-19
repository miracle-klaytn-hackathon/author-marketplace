import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

interface CustomIconComponents {
  ValidIcon: React.ReactNode;
  InvalidIcon: React.ReactNode;
}
interface PasswordProps {
  value: string;
  valueAgain?: string;
  minLength?: number;
  maxLength?: number;
  iconSize?: number;
  validColor?: string;
  invalidColor?: string;
  onChangeCheckList?: (isValid: boolean) => any;
  messages?: {
    [key in RuleNames]?: string;
  };
  iconComponents?: CustomIconComponents;
}
export type RuleNames =
  | "minLength"
  | "maxLength"
  | "specialChar"
  | "number"
  | "capital"
  | "match"
  | "lowercase"
  | "letter"
  | "notEmpty";

export interface ReactPasswordChecklistProps extends PasswordProps {
  className?: string;
  style?: React.CSSProperties;
  rules?: Array<RuleNames>;
  rtl?: boolean;
}
const ReactPasswordChecklist: React.FC<ReactPasswordChecklistProps> = ({
  className,
  style,
  rules,
  value,
  valueAgain,
  minLength,
  maxLength,
  rtl,
  onChangeCheckList,
  messages = {},
  ...remainingProps
}) => {
  const theme = useTheme();
  const [isValid, setIsValid] = useState(false);
  const ruleDefinitions: {
    [key in RuleNames]: { valid: boolean; message: string };
  } = {
    minLength: {
      valid: value.length >= (minLength || 100),
      message:
        messages.minLength || `Password has at least ${minLength} characters.`,
    },
    specialChar: {
      // eslint-disable-next-line no-useless-escape
      valid: /[~`¿¡!#$%\^&*€£@+÷=\-\[\]\\';,/{}\(\)|\\":<>\?\.\_]/g.test(value),
      message: messages.specialChar || "Password has special characters.",
    },
    number: {
      valid: /\d/g.test(value),
      message: messages.number || "Password has a number.",
    },
    capital: {
      valid: (() => {
        let i = 0;
        if (value.length === 0) {
          return false;
        }
        while (i < value.length) {
          const character = value.charAt(i);
          if (character == character.toLowerCase()) {
            // Character is lowercase, numeric, or a symbol
          } else if (character == character.toUpperCase()) {
            return true;
          }
          i++;
        }
        return false;
      })(),
      message: messages.capital || "Password has a capital letter.",
    },
    match: {
      valid: value.length > 0 && value === valueAgain,
      message: messages.match || "Passwords match.",
    },
    lowercase: {
      valid: (() => {
        let i = 0;
        if (value.length === 0) {
          return false;
        }
        while (i < value.length) {
          const character = value.charAt(i);
          if (character == character.toUpperCase()) {
            // Character is lowercase, numeric, or a symbol
          } else if (character == character.toLowerCase()) {
            return true;
          }
          i++;
        }
        return false;
      })(),
      message: messages.lowercase || "Password has a lowercase letter.",
    },
    letter: {
      valid: /[a-zA-Z]/g.test(value),
      message: messages.letter || "Password has a letter.",
    },
    maxLength: {
      valid: value.length <= (maxLength || 16),
      message:
        messages.maxLength ||
        `Password has no more than ${maxLength} characters.`,
    },
    notEmpty: {
      valid: Boolean(value.length > 0 && valueAgain && valueAgain.length > 0),
      message: messages.notEmpty || "Password fields are not empty.",
    },
  };
  const enabledRules = rules
    ? rules.filter((rule) => Boolean(ruleDefinitions[rule]))
    : [];
  useEffect(() => {
    if (enabledRules.every((rule) => ruleDefinitions[rule].valid)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, valueAgain]);
  useEffect(() => {
    if (typeof onChangeCheckList === "function") {
      onChangeCheckList(isValid);
    }
  }, [isValid, onChangeCheckList]);

  if (rtl) {
    className = className ? className + " rtl" : "rtl";
  }

  return (
    <UL className={className} style={style}>
      {enabledRules.map((rule) => {
        const { message, valid } = ruleDefinitions[rule];
        return (
          <Rule key={rule} valid={valid} {...remainingProps}>
            {message}
          </Rule>
        );
      })}
    </UL>
  );
};

interface RuleProps {
  valid: boolean;
  iconSize?: number;
  iconComponents?: CustomIconComponents;
  validColor?: string;
  invalidColor?: string;
  children?: React.ReactNode;
}
const Rule: React.FC<RuleProps> = ({ valid, iconComponents, children }) => {
  return (
    <LI className={valid ? "valid" : "invalid"}>
      {iconComponents
        ? valid
          ? iconComponents.ValidIcon
          : iconComponents.InvalidIcon
        : null}
      <span>{children}</span>
    </LI>
  );
};

const UL = styled.ul`
  margin: 0;
  padding: 0;

  padding-left: 24px;
  margin-top: 12px;
  &.rtl svg {
    margin-left: 5px;
    margin-right: 0;
  }

  & > li:not(:last-child) {
    margin-bottom: 8px;
  }
`;
const LI = styled.li`
  /* list-style-type: none; */
  /* display: flex; */
  align-items: flex-start;
  margin: 2px 0;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  & > span {
    padding-top: 2px;
    color: ${({ className, theme }) =>
      className === "valid" ? theme.colors.primary : theme.colors.white};
    /* opacity: ${(props) => (props.className === "valid" ? 1 : 0.5)}; */
    /* flex: 1; */
  }

  &::marker {
    color: ${({ className, theme }) =>
      className === "valid" ? theme.colors.primary : theme.colors.white};
  }
`;
const Svg = styled.svg`
  margin-right: 5px;
`;

export default ReactPasswordChecklist;
