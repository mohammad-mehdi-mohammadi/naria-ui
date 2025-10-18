import {FC} from "react";

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    value: string;
}

const Button: FC<ButtonProps> = ({
                                  type = "button",
                                  value
                              }) => {
    return (
        <button type={type}>{value}</button>
    );
};

export default Button;