import {FC} from "react";

export interface props {
    type?: "password" | "text";
    classNames?: {
        wrapper?: string;
        label?: string;
        input?: string;
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
                                     },
                                     label,
                                     hasError,
                                     register, name,
                                     isDisabled = false,
                                     autocomplete = false,
                                     ...otherProps
                                 }) => {

    return (
        <div className={`nariaInputWrapper ${classNames.wrapper}`}>
            <label
                htmlFor={name}
                className={`${classNames.label} ${hasError && "nariaInputLabel-error"}`}>
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
                />
            </label>
            {
                hasError &&
                <p className="nariaInputErrorText">{hasError}</p>
            }
        </div>
    );
};


