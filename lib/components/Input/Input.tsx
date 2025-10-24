import {FC} from "react";

export interface props {
    type?: "password" | "text";
    classNames?: {
        wrapper?: string;
        label?: string;
        input?: string;
        errorText?: string;
    };
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
                                     classNames = {
                                         wrapper: "",
                                         label: "",
                                         input: "",
                                         errorText: "",
                                     },
                                     label,
                                     hasError,
                                     register, name,
                                     isDisabled = false,
                                     autocomplete = false,
                                     ...otherProps
                                 }) => {

    return (
        <div className={`nariaInputWrapper ${classNames.wrapper}`} data-prop = "wrapper">
            <label
                htmlFor={name}
                className={`${classNames.label} ${hasError && "nariaInputLabel-error"}`} data-prop = "label">
                {label}
                <input
                    disabled={isDisabled}
                    autoComplete={autocomplete ? "on" : "off"}
                    id={name}
                    {...register}
                    {...otherProps}
                    type={type}
                    name={name}
                    className={`${classNames.input} ${hasError && "nariaInput-error"}`}
                    placeholder={placeholder}
                    data-prop = "input"
                />
            </label>
            {
                hasError &&
                <p className={`nariaInputErrorText ${classNames?.errorText}`} data-prop = "errorText">{hasError}</p>
            }
        </div>
    );
};


