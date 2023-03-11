import React from "react";

import templatize from "../templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";

type CallbackPropExtension = {
  disabled?: boolean;
};
export type CallbackPropMeta = EasyPropMeta<
  "callback",
  (...args: any[]) => any,
  CallbackPropExtension
> &
  CallbackPropExtension;

function CallbackControl({
  onChange,
  value,
}: ControllerProps<(...args: any[]) => any, CallbackPropExtension>) {
  const handleChange = React.useCallback(() => {
    if (onChange) {
      onChange(
        value === undefined
          ? (...args: any) => console.log("Callback", ...args)
          : undefined
      );
    }
  }, [onChange, value]);
  return (
    <span>
      Enabled:
      <input
        type="checkbox"
        onChange={handleChange}
        checked={value !== undefined}
      />
    </span>
  );
}

export function callback(info: RestrictedPropMeta<CallbackPropMeta> = {}) {
  return templatize({
    type: "callback",
    Controller: CallbackControl,
    ...info,
  } as CallbackPropMeta);
}
