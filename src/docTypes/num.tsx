import React from "react";

import templatize from "../utils/templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";

type NumberPropMetaExtension = {
  min?: number;
  max?: number;
  range?: boolean;
};
export type NumberPropMeta = EasyPropMeta<
  "number",
  number,
  NumberPropMetaExtension
> &
  NumberPropMetaExtension;

function NumberControl({
  onChange,
  value,
  meta,
}: ControllerProps<number, NumberPropMetaExtension>) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {

        if(!meta.required && event.target.value === '') {
            onChange(undefined);
        } else {
            onChange(Number(event.target.value));
        }
      }
    },
    [onChange, meta.required]
  );
  return (
    <input
      type={meta?.range ? "range" : "number"}
      onChange={handleChange}
      value={value}
      min={meta?.min}
      max={meta?.max}
    />
  );
}

export function num(info: RestrictedPropMeta<NumberPropMeta> = {}) {
  return templatize({
    type: "number",
    Controller: NumberControl,
    ...info,
  } as NumberPropMeta);
}
