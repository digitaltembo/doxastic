import React from "react";
import {
  EasyComponent,
  PropGridOf,
  PropMetasOf,
  PropsOf,
} from "./types";

export type ComponentView = "single" | "grid" | "examples";

export type ComponentContextType<C extends EasyComponent> = {
  props: PropsOf<C>;
  meta: PropMetasOf<C>;
  samples: PropGridOf<C>;
  Component: C;
  view: ComponentView;
  setPropVal: (key: keyof PropsOf<C>) => (value: any) => void;
  setView: (newView: ComponentView) => void;
};

export const ComponentContexts: Record<
  string,
  React.Context<ComponentContextType<any>>
> = {};

export function nameOf<C extends EasyComponent>(Component: C) {
    return Component.name ?? Component.displayName ?? "Foo"
}

function startingProps<C extends EasyComponent>(propDefs: PropMetasOf<C>) {
  return Object.fromEntries(
    Object.entries(propDefs).flatMap(([key, value]) => {
      if (value?.type === "callback") {
        if (value?.disabled) {
          return [[key, undefined]];
        }
        return [
          [key, (...args: any[]) => console.log("Callback ", key, ...args)],
        ];
      }
      if (value?.example !== undefined) {
        return [[key, value.example]];
      }
      if (value?.examples?.[0] !== undefined) {
        return [[key, value.examples[0]]];
      }
      return [];
    })
  );
}

function gridDimensionsFromMeta<C extends EasyComponent>(meta: PropMetasOf<C>) {
  return Object.entries(meta).flatMap(([propName, propValue]) =>
    propValue?.examples
      ? [
          propValue.examples.map((examplePropVal: any) => ({
            [propName]: examplePropVal,
          })),
        ]
      : []
  ) as PropGridOf<C>;
}

function getSamplesFromDimensions<C extends EasyComponent>(
  props: PropsOf<C>,
  [gridCols, ...tail]: PropGridOf<C>
) {
  if (tail.length === 0) {
    return [
      gridCols.map((exampleProps: PropsOf<C>) => ({
        ...props,
        ...exampleProps,
      })),
    ];
  }
  return gridCols.map((colProps: PropsOf<C>) => {
    const colBaseProps = { ...props, ...colProps };
    return tail
      .reduce(
        (accumulatedPropList: Array<PropsOf<C>>, cur: Array<PropsOf<C>>) =>
          accumulatedPropList.flatMap((accumulatedProps: PropsOf<C>) =>
            cur.map((newProp: PropsOf<C>) => ({
              ...accumulatedProps,
              ...newProp,
            }))
          ),
        [{}]
      )
      .map((colExtraProps: PropsOf<C>) => ({
        ...colBaseProps,
        ...colExtraProps,
      }));
  });
}

export function ComponentProvider<C extends EasyComponent>({
  componentName,
  meta,
  examples,
  Component,
  defaultView,
  children,
}: React.PropsWithChildren<{
  componentName: string;
  meta: PropMetasOf<C>;
  examples?: PropGridOf<C>;
  defaultView?: ComponentView;
  Component: C;
}>) {
  const [props, setProps] = React.useState<PropsOf<C>>(startingProps(meta));
  const [view, setView] = React.useState(defaultView ?? "single");
  const setPropVal = React.useCallback(
    (key: keyof PropsOf<C>) => (value: any) =>
      setProps((curProps: PropsOf<C>) => ({
        ...curProps,
        [key]: value,
      })),
    []
  );

  const samples: PropGridOf<C> = React.useMemo(() => {
    const fallback = [[props]];
    switch (view) {
      case "single":
        return fallback;
      case "grid":
        const gridDimensions = gridDimensionsFromMeta(meta);
        if (gridDimensions.length > 0) {
            return getSamplesFromDimensions(props,  gridDimensions);
        }
        return fallback;
      case "examples":
        if (examples?.length) {
            return getSamplesFromDimensions(props, examples);
        }
        return fallback;
    }
  }, [props, meta, view, examples]);

  const Context = React.useMemo(() => {
    if (ComponentContexts[componentName] === undefined) {
      ComponentContexts[componentName] = React.createContext<ComponentContextType<C>>({
        props: startingProps(meta),
        setPropVal: () => () => {},
        meta,
        samples: [[]],
        Component,
        view: "single",
        setView: () => {},
      });
    }
    return ComponentContexts[componentName];
  }, [meta, componentName, Component]);

  return (
    <Context.Provider
      value={{ props, meta, setPropVal, samples, Component, view, setView }}
    >
      {children}
    </Context.Provider>
  );
}
