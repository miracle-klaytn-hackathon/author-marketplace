import React, { ReactElement } from "react";
import ButtonStyled from "./button.style";
import { ReactComponent as IconLoading } from "assets/images/Loading.svg";
import { ReactNode } from "react";

interface Props {
  text: string | ReactElement;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  white?: boolean;
  isLoading?: boolean;
  isVisible?: boolean;
  loadingLabel?: string;
  icon?: ReactNode | null;
  ref?: React.LegacyRef<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({
  onClick,
  type = "button",
  text,
  className,
  disabled,
  white,
  isLoading,
  loadingLabel,
  icon,
  ref,
}) => {
  return (
    <ButtonStyled.Button
      $white={white}
      onClick={onClick}
      type={type}
      className={className}
      disabled={isLoading || disabled}
      ref={ref}
    >
      {icon && <ButtonStyled.WrapIcon>{icon}</ButtonStyled.WrapIcon>}
      {isLoading && (
        <ButtonStyled.Icon>
          <IconLoading />
        </ButtonStyled.Icon>
      )}
      <span>{isLoading ? loadingLabel || "Processing..." : text}</span>
    </ButtonStyled.Button>
  );
};

export default Button;
