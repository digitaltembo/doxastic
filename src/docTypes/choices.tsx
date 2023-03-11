import React from "react";

import templatize from "../templatize";
import { ControllerProps, EasyPropMeta, RestrictedPropMeta } from "../types";

export type ChoicesPropMeta<T extends string> = EasyPropMeta<
  "choices",
  T
>;


function ChoiceControl<T extends string>({
  onChange,
  value,
  meta,
}: ControllerProps<T>) {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(event.target.value as T);
      }
    },
    [onChange]
  );
  return (
    <select onChange={handleChange} value={value}>
        {meta.examples?.map((val) => <option key={val} value={val}>{val}</option>)}
    </select>
  );
}

export function choices<T extends string>(info: RestrictedPropMeta<ChoicesPropMeta<T>>, ...choices: string[]) {
  return templatize({
    type: "choices",
    Controller: ChoiceControl,
    examples: choices,
    typeStr: (choices || info.examples).join(' | '),
    ...info,
  } as ChoicesPropMeta<T>);
}
