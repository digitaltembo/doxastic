import React from "react";
import { ComponentContexts, ComponentContextType } from "./ComponentContext";
import RenderInWindow from "./RenderInWindow";
import { EasyComponent, PropsOf } from "./types";

type Props = {
  componentName: string;
};

function Canvas<C extends EasyComponent>({
  componentName,
}: Props) {

  const { Component, samples, view, setView } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;
  
  const [newWindow, setNewWindow] = React.useState(false);
  const grid = React.useMemo(
    () => (
      <div className="doxastic-grid">
        {samples.map((col: Array<PropsOf<C>>, i) => (
          <div className="doxastic-col" key={`col${i}`}>
            {col.map((props: PropsOf<C>, j) =>
              props._overrideComponent ? (
                <props._overrideComponent key={`comp${i}-${j}`} {...props} />
              ) : (
                <Component key={`comp${i}-${j}`} {...props} />
              )
            )}
          </div>
        ))}
      </div>
    ),
    [Component, samples]
  );

  return (
    <div className="doxastic-canvas">
      <div className="doxastic-canvas-header">
        <input
          type="checkbox"
          onChange={() => setView(view === "grid" ? "single" : "grid")}
          checked={view === "grid"}
        />
        View Grid
        <input
          type="checkbox"
          onChange={() => setNewWindow(!newWindow)}
          checked={newWindow}
        />
        Open Window
      </div>
      <div className="doxastic-canvas-body">
        {grid}
        {newWindow && <RenderInWindow>{grid}</RenderInWindow>}
      </div>
    </div>
  );
}

export default Canvas;
