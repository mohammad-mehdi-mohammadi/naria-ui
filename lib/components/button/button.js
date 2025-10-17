import { jsx as _jsx } from "react/jsx-runtime";
const Button = ({ type = "button", value }) => {
    return (_jsx("button", { children: value }));
};
export default Button;
