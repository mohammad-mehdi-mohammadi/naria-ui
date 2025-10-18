import {FC} from "react";

export interface props {
  type?: "password" | "text";
  placeholder: string;
}
export const Input: FC<props> = ({type = "text", placeholder}) => {

  return (
    <input type={type} placeholder={placeholder} />
  );
};


