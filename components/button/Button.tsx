"use client"
import React, {FC} from "react";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    classNames?: string;
    value: string;
    theme?: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-info-light" | "btn-danger-light" | "btn-info-link" | "btn-outline-secondary" | "btn-outline-primary" | "btn-secondary-light";
    size?: "btn-md" | "btn-sm";
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: HTMLElement | undefined;
}

const Button: FC<ButtonProps> = ({
                                  type = "button", classNames = "",
                                  value, theme = "btn-primary", size = "btn-md",
                                  icon = undefined,
                                  isLoading = false, isDisabled = false, ...otherProps
                              }) => {
    return (
        <button type={type} disabled={isDisabled} {...otherProps}
                className={`flex items-center gap-1.5 justify-center rounded-lg w-full ${theme} ${size} ${classNames}`}
        >{isLoading ? <></> : undefined}{icon}{value}</button>
    );
};

export default Button;