"use client"
import {FC} from "react";

export interface props {
    type?: string;
    classNames?: string;
    placeholder: string;
    label: string;
    theme?: "secondary";
    size?: "md" | "sm";
    hasError?: string | null;
    register?: any;
    name?: string;
    isDisabled?: boolean;
    autocomplete?: boolean;
}

const themes = {
    secondary: {
        input: `border
                bg-transparent 
                placeholder:text-secondary-400 
                outline-1 
                outline-primary-100  
                border-secondary-300 
                rounded-md 
                hover:not:border-primary-100 
                focus:outline 
                focus:border-primary-100
                
                disabled:text-secondary-100
                disabled:border-secondary-500`,

        label: `text-dark-100
                peer-focus:text-primary-100 
                peer-focus:scale-90
                
                peer-disabled:text-secondary-400`
    }
}

const sizes = {
    sm: {
        input: "text-xs px-2 py-1",
        label: `px-1 text-xs `,
    },
    md: {
        input: "text-sm px-3 py-2",
        label: `px-1 text-xs`,
    },
}
const Input: FC<props> = ({
                                 type = "text", placeholder, classNames = "",
                                 label, theme = "secondary", size = "md", hasError,
                                 register, name, isDisabled = false, autocomplete = false,
                                 ...otherProps
                             }) => {
    return (
        <div>
            <label
                htmlFor={name}
                className={`cursor-text transition-all duration-200 
                transform ${themes[theme].label} ${sizes[size].label}
                ${hasError && "!text-danger-100"}`}>
                {label}
                <input
                    disabled={isDisabled}
                    autoComplete = {autocomplete ? "on" : "off"}
                    id={name}
                    {...register}
                    {...otherProps}
                    type={type}
                    name={name}
                    className={`mt-1 w-full bg-white transition duration-200 ease ${themes[theme].input} ${sizes[size].input}
                ${hasError && "!border-danger-100 focus:border-danger-100 outline-danger-100"} ${classNames}`}
                    placeholder={placeholder}
                />
            </label>
            {
                hasError &&
                <p className="text-xs mt-1 text-danger-100">{hasError}</p>
            }
        </div>


    );
};

export default Input;