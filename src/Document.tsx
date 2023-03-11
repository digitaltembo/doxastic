import React from "react";
import ReactDOM from "react-dom";
import Canvas from "./Canvas";
import Code from "./Code";
import ControlPanel from "./ControlPanel";
import { ComponentView, nameOf, PropProvider } from "./PropContext";

import {
  EasyComponent,
  PropMetasOf,
  PropMeta,
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
  const [componentView, setComponentView] = React.useState(
    props?._defaultView ?? "single"
  );

  const componentName = React.useMemo(
    () => nameOf(props._a),
    [props._a.name, props._a.displayName]
  );
  const meta = React.useMemo(() => getPropMeta(props), [props]);

  if (props._hide) {
    return null;
  }

  return (
    <PropProvider
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
    </PropProvider>
  );
}

export default Document;
