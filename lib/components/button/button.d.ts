import React, { FC } from "react";
export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    type?: "button" | "submit";
    value: string;
}
declare const Button: FC<props>;
export default Button;
//# sourceMappingURL=button.d.ts.map