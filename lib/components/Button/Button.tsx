import React, {FC, ReactNode} from "react";
import './button.scss';
import {Loading} from "../Loading";


export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    classNames?: {
        root: string;
        loading: {
            root: string;
            color: string;
        };
    };
    value: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: ReactNode;
}

export const Button: FC<props> = ({
                                      type = "button",
                                      classNames = {
                                          root: "",
                                          loading: {
                                              root: "",
                                              color: ""
                                          }
                                      },
                                      value,
                                      icon = undefined,
                                      isLoading = false,
                                      isDisabled = false,
                                      ...otherProps
                                  }) => {

    return (
        <button type={type} disabled={isDisabled} {...otherProps}
                className={`naria-button ${isDisabled ? "naria-button--disabled" : ""} ${classNames?.root}`}
                data-class-prop="root"
        >{isLoading ? <Loading classNames={{
            root: classNames.loading.root,
            color: classNames.loading.color
        }} data-class-prop="root" data-class-prop-color="color"/> : icon}{value}</button>
    );
};


