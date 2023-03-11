import React from "react";

import templatize from "../templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";

export type StringPropMeta = EasyPropMeta<
  "string",
  string
>;


function StringControl({
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
    [onChange, meta.required]
  );
  return (
    <input
      onChange={handleChange}
      value={!meta.required && value === undefined ? '' : value}
    />
  );
}

export function str(info: RestrictedPropMeta<StringPropMeta> = {}) {
  return templatize({
    type: "string",
    Controller: StringControl,
    ...info,
  } as StringPropMeta);
}
