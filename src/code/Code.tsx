import React from "react";
import styled from "styled-components";

import { LibraryContext } from "../utils/LibraryContext";
import { EasyComponent, PropGridOf, PropMetasOf, PropsOf } from "../types";
import { DarkBlue, Yellow, Magenta, Gray } from "./CodeColors";
import CodeComponentColumm from "./CodeComponentColumn";
import ComponentLine from "./ComponentLine";
import ImportLine from "./ImportLine";
import { ClickableHeader } from "../utils/Text";

const Pre = styled.pre`
  background: #202020;
  color: rgb(168, 216, 248);
  padding: 1em;
  box-sizing: border-box;
  border-radius: 0 0 0.5em 0.5em;
  margin: 0 -1rem -1rem;
`;

type Props<C extends EasyComponent> = {
  componentName: string;
  importPath?: string;
  meta: PropMetasOf<C>;
  samples: PropGridOf<C>;
};

function Code<C extends EasyComponent>({ componentName, importPath, meta, samples }: Props<C>) {
  const { defaultShowSource } = React.useContext(LibraryContext);
  const [showSource, setShowSource] = React.useState(
    defaultShowSource ?? false
  );

  return (
    <>
      <ClickableHeader onClick={() => setShowSource((cur) => !cur)}>
        Source
      </ClickableHeader>
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
