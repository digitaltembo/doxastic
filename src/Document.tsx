import React from "react";
import Canvas from "./Canvas";
import Code from "./Code";
import ControlPanel from "./ControlPanel";
import { ComponentView, nameOf, ComponentProvider } from "./ComponentContext";

import { EasyComponent, PropMetasOf, PropsOf, PropGridOf } from "./types";
import { LibraryContext } from "./LibraryContext";

type BaseDocumentProps<C extends EasyComponent> = {
  _a: C;
  _examples?: PropGridOf<C>;
  _import?: string;
  _groupBy?: Array<keyof PropsOf<C>>;
  _defaultView?: ComponentView;
  _hide?: boolean;
  _name?: string;
};

type DocumentProps<C extends EasyComponent> = BaseDocumentProps<C> &
  PropMetasOf<C>;

const RESERVED_PROPS = new Set([
  "_a",
  "_import",
  "_examples",
  "_defaultView",
  "_hide",
  "_name",
]);

function getPropMeta<C extends EasyComponent>(props: DocumentProps<C>) {
  return Object.fromEntries(
    Object.entries(props).flatMap(([key, value]) => {
      if (key.startsWith("_")) {
        if (RESERVED_PROPS.has(key)) {
          return [];
        } else {
          return [[key.substring(1) as keyof C, value]];
        }
      }
      return [[key as keyof PropsOf<C>, value]];
    })
  ) as PropMetasOf<C>;
}

function Document<C extends EasyComponent>(props: DocumentProps<C>) {
  const componentName = React.useMemo(
    () => props._name ?? nameOf(props._a),
    [props._name, props._a]
  );
  const { activeComponent, registerComponent } =
    React.useContext(LibraryContext);

  const meta = React.useMemo(() => getPropMeta(props), [props]);

  const register = React.useCallback(
    (ref: HTMLHeadingElement) =>
      ref !== null && registerComponent({ componentName, ref }),
    [registerComponent, componentName]
  );

  if (
    props._hide ||
    (activeComponent !== undefined && activeComponent !== componentName)
  ) {
    return null;
  }

  return (
    <ComponentProvider
      componentName={componentName}
      meta={meta}
      examples={props._examples}
      Component={props._a}
      defaultView={props._defaultView}
    >
      <h1 ref={register}>{componentName}</h1>
      <Canvas componentName={componentName} />
      <Code componentName={componentName} importPath={props._import} />
      <ControlPanel componentName={componentName} />
    </ComponentProvider>
  );
}

export default Document;
