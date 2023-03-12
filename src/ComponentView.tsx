import React from "react";

import { EasyComponent, PropGridOf, PropMetasOf, PropsOf } from "./types";
import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
import { getBaseProps } from "./utils/views";

type Props<C extends EasyComponent> = {
  docs?: JSX.Element | string;
  componentName: string;
  defaultOpenProps?: boolean;
  Component: C;
  importPath?: string;
  meta: PropMetasOf<C>;
  initProps?: PropsOf<C>;
  samples: PropGridOf<C>;
};

// Return the set of props that are commonly defined accross all samples
function commonProps<C extends EasyComponent>(samples: PropGridOf<C>) {
   const [init, ...tail] = samples.flat().map(Object.entries);
   if (tail.length === 0) {
    return Object.fromEntries(init);
   }
   return Object.fromEntries(tail.reduce((acc, cur) => acc.filter(([key]) => cur.some(([propKey]) => propKey === key), init)));
}
function ComponentView<C extends EasyComponent>({
  docs,
  componentName,
  defaultOpenProps,
  Component,
  importPath,
  meta,
  samples,
}: Props<C>) {
  const [baseProps, setBaseProps] = React.useState<PropsOf<C>>(
    {...getBaseProps(meta), ...commonProps(samples)}
  );


  //   const [view, setView] = React.useState(defaultView ?? "single");
  const setPropVal = React.useCallback(
    (key: keyof PropsOf<C>) => (value: any) =>
      setBaseProps((curProps: PropsOf<C>) => ({
        ...curProps,
        [key]: value,
      })),
    []
  );

  const mergedSamples = React.useMemo(
    () =>
      samples.map((col) => col.map((props) => ({...baseProps,  ...props}))),
    [samples, baseProps]
  );

  return (
    <div>
      {docs}

      <ControlPanel baseProps={baseProps} meta={meta} setPropVal={setPropVal} defaultOpen={defaultOpenProps}/>
      <Canvas
        componentName={componentName}
        importPath={importPath}
        Component={Component}
        samples={mergedSamples}
        meta={meta}
      />
    </div>
  );
}

export default ComponentView;
