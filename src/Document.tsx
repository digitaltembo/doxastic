import React from "react";
import Canvas from "./Canvas";
import Code from "./Code";
import ControlPanel from "./ControlPanel";
import { ComponentView, nameOf, ComponentProvider } from "./ComponentContext";

import {
  EasyComponent,
  PropMetasOf,
  PropsOf,
  PropGridOf,
} from "./types";

type DocumentProps<C extends EasyComponent> = {
  _a: C;
  _examples?: PropGridOf<C>;
  _import?: string;
  _groupBy?: Array<keyof PropsOf<C>>;
  _defaultView?: ComponentView;
  _hide?: boolean;
} & PropMetasOf<C>;

const RESERVED_PROPS = new Set(["_a", "_import", "_examples", "_defaultView"]);

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
    () => nameOf(props._a),
    [props._a]
  );
  
  const meta = React.useMemo(() => getPropMeta(props), [props]);

  if (props._hide) {
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
      <Canvas
        componentName={componentName}
      />
      <Code componentName={componentName} importPath={props._import} />
      <ControlPanel componentName={componentName} />
    </ComponentProvider>
  );
}

export default Document;
