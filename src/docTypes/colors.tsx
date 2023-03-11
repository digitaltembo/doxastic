import React from "react";

import templatize from "../templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";

export type ColorPropMeta = EasyPropMeta<
  "color",
  string
>;


function ColorControl({
  onChange,
  value,
  meta,
}: ControllerProps<string>) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        if(!meta.required && event.target.value === '') {
            onChange(undefined);
        } else {
            onChange(event.target.value );
        }
      }
    },
    [onChange]
  );
  return (
    <input
      type="color"
      onChange={handleChange}
      value={!meta.required && value === undefined ? '' : value}
    />
  );
}

export function colors(info: RestrictedPropMeta<ColorPropMeta> = {}) {
  return templatize({
    type: "color",
    Controller: ColorControl,
    ...info,
  } as ColorPropMeta);
}
