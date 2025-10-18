import React, {FC} from "react";

export interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type?: "button" | "submit";
  value: string;
}
export const Button: FC<props> = ({type = "button", value}) => {

  return (
    <button type={type}>
      {value}
    </button>
  );
};


