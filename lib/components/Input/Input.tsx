import {FC} from "react";

export interface props {
    type?: "password" | "text";
    classNames?: {
        root?: string;
        label?: string;
        title?: string;
        input?: string;
        errorText?: string;
    };
    placeholder: string;
    title: string;
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
                                         root: "",
                                         label: "",
                                         title: "",
                                         input: "",
                                         errorText: "",
                                     },
                                     title,
                                     hasError,
                                     register, name,
                                     isDisabled = false,
                                     autocomplete = false,
                                     ...otherProps
                                 }) => {

    return (
        <div className={`naria-input ${classNames.root}`} data-class-prop = "root">
            <label
                htmlFor={name}
                className={`${classNames.label} ${hasError && "naria-input__label--error"}`} data-class-prop = "label">
                <span className={classNames?.title} data-class-prop="title">{title}</span>
                <input
                    disabled={isDisabled}
                    autoComplete={autocomplete ? "on" : "off"}
                    id={name}
                    {...register}
                    {...otherProps}
                    type={type}
                    name={name}
                    className={`${classNames.input} ${hasError && "naria-input__input--error"}`}
                    placeholder={placeholder}
                    data-class-prop = "input"
                />
            </label>
            {
                hasError &&
                <p className={`naria-input--error-text ${classNames?.errorText}`} data-class-prop = "errorText">{hasError}</p>
            }
        </div>
    );
};


