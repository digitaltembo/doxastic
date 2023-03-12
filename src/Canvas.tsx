import React from "react";
import styled from "styled-components";

import { ComponentContexts, ComponentContextType } from "./ComponentContext";
import RenderInWindow from "./RenderInWindow";
import { EasyComponent, PropsOf } from "./types";

const CanvasContainer = styled.div`
  border-radius: 0.5em;
  width: 80%;
  margin: 0px auto;
  box-shadow: 0.4em 0.4em 0.6em #aaa;
`;

const CanvasHeader = styled.div`
  background: #eee;
  border-radius: 0.5em 0.5em 0 0;
`;

const CanvasBody = styled.div`
  border-radius: 0 0 0.5em 0.5em;
  border: 1px solid #eee;
  padding: 1em;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

type Props = {
  componentName: string;
};

function Canvas<C extends EasyComponent>({ componentName }: Props) {
  const { Component, samples, view, setView } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;

  const [newWindow, setNewWindow] = React.useState(false);
  const grid = React.useMemo(
    () => (
      <Grid>
        {samples.map((col: Array<PropsOf<C>>, i) => (
          <Col key={`col${i}`}>
            {col.map((props: PropsOf<C>, j) =>
              props._overrideComponent ? (
                <props._overrideComponent key={`comp${i}-${j}`} {...props} />
              ) : (
                <Component key={`comp${i}-${j}`} {...props} />
              )
            )}
          </Col>
        ))}
      </Grid>
    ),
    [Component, samples]
  );

  return (
    <CanvasContainer>
      <CanvasHeader>
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
      </CanvasHeader>
      <CanvasBody>
        {grid}
        {newWindow && <RenderInWindow>{grid}</RenderInWindow>}
      </CanvasBody>
    </CanvasContainer>
  );
}

export default Canvas;
