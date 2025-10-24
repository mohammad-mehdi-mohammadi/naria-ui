import React, {FC, ReactNode} from "react";
import './button.scss';
import Loading from "../../../shared/loading/Loading";

export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    classNames?: {
        button: string;
        loading: {
            wrapper: string;
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
                                          button: "",
                                          loading: {
                                              wrapper: "",
                                              color: ""
                                          }
                                      },
                                      value,
                                      icon = null,
                                      isLoading = false,
                                      isDisabled = false,
                                      ...otherProps
                                  }) => {

    return (
        <button type={type} disabled={isDisabled} {...otherProps}
                className={`nariaButton ${isDisabled ? "nariaButton-disabled" : ""} ${classNames?.button}`}
                data-prop="button"
        >{isLoading ? <Loading classNames={{
            wrapper: classNames.loading.wrapper,
            color: classNames.loading.color
        }} data-prop-wrapper = "wrapper" data-prop-color = "color" /> : icon}{value}</button>
    );
};


