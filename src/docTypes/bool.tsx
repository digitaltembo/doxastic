import React from "react";

import templatize from "../templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";
export type BooleanPropExtension = {
  // If `undefined` is considered a different thing than `false`
  trinary?: boolean;
};
export type BooleanPropMeta = EasyPropMeta<
  "boolean",
  boolean,
  BooleanPropExtension
> &
  BooleanPropExtension;

function BooleanControl({
  onChange,
  value,
  meta,
}: ControllerProps<boolean, BooleanPropExtension>) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event.target.checked);
      }
    },
    [onChange]
  );
  return <input type="checkbox" onChange={handleChange} checked={value} />;
}

export function bool(info: RestrictedPropMeta<BooleanPropMeta> = {}) {
  return templatize({
    type: "boolean",
    Controller: BooleanControl,
    examples: [
      false,
      true,
      ...(info.required || !info.trinary ? [] : [undefined]),
    ],
    ...info,
  } as BooleanPropMeta);
}
