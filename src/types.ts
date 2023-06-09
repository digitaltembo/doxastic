import { BooleanPropMeta } from "./prop/bool";
import { CallbackPropMeta } from "./prop/callback";
import { ChoicesPropMeta } from "./prop/choices";
import { ColorPropMeta } from "./prop/colors";
import { NumberPropMeta } from "./prop/num";
import { StringPropMeta } from "./prop/str";

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

export type RestrictedPropMeta<T> = Omit<T, "type" | "Controller" | "docs">;
export type PropMeta<T> =
  | (T extends number ? NumberPropMeta : never)
  | (T extends string
      ? StringPropMeta | ColorPropMeta | ChoicesPropMeta<T>
      : never)
  | (T extends boolean ? BooleanPropMeta : never)
  | (T extends (...args: any) => any ? CallbackPropMeta : never);

export type PropMetasFor<T extends Record<string, unknown>> = {
  [Prop in keyof T]?: PropMeta<T[Prop]>;
};
export type EasyComponent = { displayName?: string } & ((args: any) => any);
export type PropsOf<Component extends EasyComponent> =
  Parameters<Component>[0] & {
    _override?: { component: EasyComponent; name: string };
  };
export type PropMetasOf<Component extends EasyComponent> = PropMetasFor<
  PropsOf<Component>
>;

export type PropGrid<Props> = Array<Array<Props>>;
export type PropGridOf<Component extends EasyComponent> = PropGrid<
  PropsOf<Component>
>;
