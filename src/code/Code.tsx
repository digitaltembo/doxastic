import React from "react";
import styled from "styled-components";

import { ComponentContexts, ComponentContextType } from "../ComponentContext";
import { LibraryContext } from "../LibraryContext";
import { EasyComponent, PropsOf } from "../types";
import { DarkBlue, Yellow, Magenta, Gray } from "./CodeColors";
import CodeComponentColumm from "./CodeComponentColumn";
import ComponentLine from "./ComponentLine";
import ImportLine from "./ImportLine";

const CodeHeader = styled.h3`
  cursor: pointer;
  text-decoration: underline;
  font-weight: lighter;
`;

const Pre = styled.pre`
  background: #202020;
  color: rgb(168, 216, 248);
  padding: 1em;
  margin: 2em auto;
  width: 80%;
  box-sizing: border-box;
  border-radius: 1em;
`;

type Props = {
  componentName: string;
  importPath?: string;
};

function Code<C extends EasyComponent>({ componentName, importPath }: Props) {
  const { defaultShowSource } = React.useContext(LibraryContext);
  const [showSource, setShowSource] = React.useState(
    defaultShowSource ?? false
  );

  const { meta, samples } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;

  return (
    <>
      <CodeHeader onClick={() => setShowSource((cur) => !cur)}>
        Source
      </CodeHeader>
      {showSource && (
        <Pre style={{ textAlign: "left" }}>
          <ImportLine thing="React" from="react" />
          {importPath && <ImportLine thing={componentName} from={importPath} />}
          {"\n"}
          <div>
            <DarkBlue>function</DarkBlue>
            {` `}
            <Yellow>{`Render() {`}</Yellow>
          </div>
          <div>
            {"  "}
            <Magenta>return</Magenta>
            <DarkBlue>{` (`}</DarkBlue>
          </div>
          <ComponentLine indents={2} open="Grid" />
          {samples.map((col: Array<PropsOf<C>>, i) => (
            <CodeComponentColumm
              componentName={componentName}
              key={i}
              col={col}
              meta={meta}
            />
          ))}
          <ComponentLine indents={2} open="Grid" />
          <div>
            <DarkBlue>{"  )"}</DarkBlue>
            <Gray>;</Gray>
          </div>
          <div>
            <Yellow>{"}"}</Yellow>
          </div>
        </Pre>
      )}
    </>
  );
}

export default Code;
