"use client"
import React, {FC, ReactNode, useRef} from "react";

export interface ButtonProps {
    type?: "button" | "submit";
    classNames?: string;
    value: string;
    theme?: "btn-primary" | "btn-secondary" | "btn-success" | "btn-warning" | "btn-info-light" | "btn-danger-light" | "btn-info-link" | "btn-outline-secondary" | "btn-outline-primary" | "btn-secondary-light";
    size?: "btn-md" | "btn-sm";
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: ReactNode | undefined;
}

const Button: FC<ButtonProps> = ({
                                  type = "button", classNames = "",
                                  value, theme = "btn-primary", size = "btn-md",
                                  icon = undefined,
                                  isLoading = false, isDisabled = false, ...otherProps
                              }) => {
    const ref = useRef(null);
    return (
        <button type={type} disabled={isDisabled} {...otherProps}  ref={ref as React.Ref<HTMLButtonElement>}
                className={`flex items-center gap-1.5 justify-center rounded-lg w-full ${theme} ${size} ${classNames}`}
        >{isLoading ? <></> : undefined}{icon}{value}</button>
    );
};

export default Button;