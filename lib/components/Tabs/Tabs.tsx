import React, {FC, ReactNode} from "react";
import './tabs.scss';
import {Loading} from "../Loading";


export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    classNames?: {
        root?: string;
        loading?: {
            root?: string;
            color?: string;
        };
    };
    value: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    icon?: ReactNode;
}

export const Tabs: FC<props> = ({
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
        <div>
            
        </div>
    );
};


