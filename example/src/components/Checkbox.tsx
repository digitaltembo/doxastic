import React from "react";

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
