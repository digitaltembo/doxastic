import React from "react";
import styled from "styled-components";

import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
import { ComponentView, nameOf, ComponentProvider } from "./utils/ComponentContext";

import { EasyComponent, PropMetasOf, PropsOf, PropGridOf } from "./types";
import { LibraryContext } from "./utils/LibraryContext";

const Name = styled.h1`
  font-weight: normal;
`;

const ImportPath = styled.h3`
  color: #888;
  font-weight: lighter;
  cursor: pointer;

  &:hover {
    color: #666;
  }

  &:active {
    color: #000;
  }
`;

type BaseDocumentProps<C extends EasyComponent> = {
  _a: C;
  _docs?: JSX.Element | string;
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
  "_docs",
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
  const { activeComponent, setActiveComponent, registerComponent } =
    React.useContext(LibraryContext);

  const meta = React.useMemo(() => getPropMeta(props), [props]);

  const register = React.useCallback(
    (ref: HTMLDivElement) =>
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
      <div ref={register}>
        <Name>{componentName}</Name>
        {activeComponent === componentName ? (
          <button onClick={() => setActiveComponent()}>Leave</button>
        ) : (
          <button onClick={() => setActiveComponent(componentName)}>
            Full
          </button>
        )}
        {props._import && (
          <ImportPath title="Copy to Clipboard">{props._import}</ImportPath>
        )}
        {props._docs}

        <ControlPanel componentName={componentName} />
        <Canvas componentName={componentName} importPath={props._import} />
      </div>
    </ComponentProvider>
  );
}

export default Document;
