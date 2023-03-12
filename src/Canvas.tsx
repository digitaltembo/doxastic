import React from "react";
import styled from "styled-components";
import Code from "./code/Code";

import { ComponentContexts, ComponentContextType } from "./utils/ComponentContext";
import RenderInWindow from "./utils/RenderInWindow";
import { EasyComponent, PropsOf } from "./types";

const CanvasContainer = styled.div`
  border-radius: 0.5rem;
  width: 80%;
  margin: 1.5rem auto;
  box-shadow: 0.4rem 0.4rem 0.6rem #aaa;
`;

const CanvasHeader = styled.div`
  background: #eee;
  border-radius: 0.5rem 0.5rem 0 0;
`;

const CanvasBody = styled.div`
  border-radius: 0 0 0.5em 0.5em;
  border: 1px solid #eee;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const CanvasFooter = styled.div`
`;

const Grid = styled.div`
  flex-grow: 1;
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
  importPath?: string;
};

function Canvas<C extends EasyComponent>({ importPath, componentName }: Props) {
  const { Component, samples, view, setView } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;

  const [newWindow, setNewWindow] = React.useState(false);
  const grid = React.useMemo(
    () => (
      <>
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
        <CanvasFooter>
          {" "}
          <Code componentName={componentName} importPath={importPath} />
        </CanvasFooter>
      </>
    ),
    [Component, samples, componentName, importPath]
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
