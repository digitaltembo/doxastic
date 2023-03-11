import React, { ButtonHTMLAttributes } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  sunglasses: number;
  mode: "primary" | "secondary" | "tertiary";
};
function Button({ mode, sunglasses, children, onClick }: Props) {
  return (
    <button className={`sample-${mode}`} onClick={onClick}>
      {children}
      {Array.from({ length: sunglasses }).map(() => "😎")}
    </button>
  );
}

export default Button;
