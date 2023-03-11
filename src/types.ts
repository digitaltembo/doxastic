import { BooleanPropMeta } from "./docTypes/bool";
import { CallbackPropMeta } from "./docTypes/callback";
import { ChoicesPropMeta } from "./docTypes/choices";
import { ColorPropMeta } from "./docTypes/colors";
import { NumberPropMeta } from "./docTypes/num";
import { StringPropMeta } from "./docTypes/str";

export type ControllerProps<T, K = {}> = {
  value: T;
  onChange?: (newVal?: T) => void;
  meta: K & EasyPropMeta<string, T, K>;
};
export type EasyPropMeta<S extends string, T, K = {}> = {
  type: S;
  typeStr?: string;
  Controller: (props: ControllerProps<T, K>) => JSX.Element;
  docs?: string;
  examples?: Array<T>;
  example?: T;
  default?: T;
  required?: boolean;
};
// export type InferredPropMeta<P> = P extends EasyPropMeta<infer S, infer T>
//   ? EasyPropMeta<S, T>
//   : never;
export type RestrictedPropMeta<T> = Omit<T, "type" | "Controller" | "docs">;
export type PropMeta<T> =
  | (T extends number ? NumberPropMeta : never)
  | (T extends string ? StringPropMeta | ColorPropMeta | ChoicesPropMeta<T> : never)
  | (T extends boolean ? BooleanPropMeta : never)
  | (T extends (...args: any) => any ? CallbackPropMeta : never);

export type PropMetasFor<T extends Record<string, unknown>> = {
  [Prop in keyof T]?: PropMeta<T[Prop]>;
};
export type EasyComponent = { displayName?: string } & ((args: any) => any);
export type PropsOf<Component extends EasyComponent> = Parameters<Component>[0] & {_overrideComponent?: EasyComponent};
export type PropMetasOf<Component extends EasyComponent> = PropMetasFor<
  PropsOf<Component>
>;

export type PropGrid<Props> = Array<Array<Props>>;
export type PropGridOf<Component extends EasyComponent> = PropGrid<PropsOf<Component>>;
