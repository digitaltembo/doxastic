import React from "react";
import { PropMetasOf } from "../types";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox(props: Props) {
  return (
    <input
      type="checkbox"
      readOnly
      {...props}
      ref={(input) => {
        if (props.checked === undefined && input) {
          input.indeterminate = true;
        }
      }}
    />
  );
}
