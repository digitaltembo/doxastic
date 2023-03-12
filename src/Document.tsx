import React from "react";
import styled from "styled-components";

import { EasyComponent, PropMetasOf, PropsOf } from "./types";
import { LibraryContext } from "./utils/LibraryContext";
import ComponentView from "./ComponentView";
import { simple, View } from "./utils/views";
import { ClickableHeader } from "./utils/Text";

const Name = styled.h1`
  ${({theme}) => theme.doxastic.fonts.header}
`;

function nameOf<C extends EasyComponent>(Component: C) {
  return Component.name ?? Component.displayName ?? "Foo";
}

type BaseDocumentProps<C extends EasyComponent> = {
  _a: C;
  _docs?: JSX.Element | string;
  _views?: View<C>[];
  _import?: string;
  _hide?: boolean;
  _name?: string;
};

type DocumentProps<C extends EasyComponent> = BaseDocumentProps<C> &
  PropMetasOf<C>;

const RESERVED_PROPS = new Set([
  "_a",
  "_import",
  "_views",
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
  const views: View<C>[] = React.useMemo(() => props._views ?? [simple], [props._views]);
  
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
      <div ref={register}>
        <Name>{componentName}</Name>
        {activeComponent === componentName ? (
          <button onClick={() => setActiveComponent(undefined)}>Leave</button>
        ) : (
          <button onClick={() => setActiveComponent(componentName)}>
            Full
          </button>
        )}
        {props._import && (
          <ClickableHeader title="Copy to Clipboard">{props._import}</ClickableHeader>
        )}
        {views.map((view, i) =>
          <ComponentView 
            key={`view-${i}`}
            defaultOpenProps={i===0}
            docs={view.docs ?? (i === 0 ? props._docs : undefined)}
            componentName={componentName}
            importPath={props._import}
            meta={meta}
            samples={view.samples(meta)}
            Component={props._a} />
          )}
      </div>
  );
}

export default Document;
