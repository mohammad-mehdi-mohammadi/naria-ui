import React, {FC} from "react";
export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    value: string;
}

const Button: FC<props> = ({
                                  type = "button",
                                  value
                              }) => {
    return (
        <button>{value}</button>
    );
};

export default Button;