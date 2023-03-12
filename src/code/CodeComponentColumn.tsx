import React from "react";

import { BooleanPropMeta } from "../prop/bool";
import { EasyComponent, PropMetasFor, PropsOf } from "../types";
import ComponentLine, { ComponentLineProps } from "./ComponentLine";

type Props<C extends EasyComponent> = {
  componentName: string;
  col: Array<PropsOf<C>>;
  meta: PropMetasFor<PropsOf<C>>;
};
function CodeComponentColumm<C extends EasyComponent>({
  componentName,
  col,
  meta,
}: Props<C>) {
  const componentProps: Array<ComponentLineProps> = col.map(
    (props: PropsOf<C>) => {
      const separatedProps: [string, string | undefined][] = Object.entries(
        props
      ).flatMap<[string, string | undefined]>(([key, value]) => {
        if (
          key === "children" ||
          value === undefined ||
          value === meta[key]?.default ||
          (!(meta[key] as Partial<BooleanPropMeta>)?.trinary &&
            value === false) ||
          key === "_override" ||
          typeof value === "function"
        ) {
          return [];
        }
        if (value === true) {
          return [[key, undefined]];
        }
        if (typeof value === "string") {
          return [[key, `"${value}"`]];
        }
        return [[key, `{${value}}`]];
      });

      return {
        indents: 4,
        name: props._override?.name ?? componentName,
        children: props.children,
        props: Object.fromEntries(separatedProps),
      };
    }
  );

  return componentProps.length > 1 ? (
    <>
      <ComponentLine indents={3} open="Col" />
      {componentProps.map((c, i) => (
        <ComponentLine key={i} {...c} />
      ))}
      <ComponentLine indents={3} close="Col" />
    </>
  ) : (
    <ComponentLine {...componentProps[0]} indents={3} />
  );
}
export default CodeComponentColumm;
