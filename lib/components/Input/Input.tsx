import {FC} from "react";

export interface props {
    type?: "password" | "text";
    wrapperClass?: string;
    labelClass?: string;
    inputClass?: string;
    errorClass?: string;
    placeholder: string;
    label: string;
    hasError?: string | null;
    register?: any;
    name?: string;
    isDisabled?: boolean;
    autocomplete?: boolean;
}

export const Input: FC<props> = ({
                                     type = "text",
                                     placeholder,
                                     wrapperClass = "",
                                     labelClass = "",
                                     inputClass = "",
                                     errorClass = "",
                                     label,
                                     hasError,
                                     register, name,
                                     isDisabled = false,
                                     autocomplete = false,
                                     ...otherProps
                                 }) => {

    return (
        <div className={wrapperClass}>
            <label
                htmlFor={name}
                className={`${labelClass} ${hasError && "error"}`}>
                {label}
                <input
                    disabled={isDisabled}
                    autoComplete={autocomplete ? "on" : "off"}
                    id={name}
                    {...register}
                    {...otherProps}
                    type={type}
                    name={name}
                    className={`${inputClass} ${hasError && "error"} ${errorClass}`}
                    placeholder={placeholder}
                />
            </label>
            {
                hasError &&
                <p className={errorClass}>{hasError}</p>
            }
        </div>
    );
};


