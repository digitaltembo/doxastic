import React from "react";
import styled from "styled-components";

import { DarkBlue, Green } from "./code/CodeColors";
import { ComponentContexts, ComponentContextType } from "./ComponentContext";
import { EasyComponent } from "./types";

const PanelHeader = styled.h3`
  cursor: pointer;
  text-decoration: underline;
  font-weight: lighter;
`;

type ControlPanelProps = {
  componentName: string;
};

function ControlPanel<C extends EasyComponent>({
  componentName,
}: ControlPanelProps) {
  const { props, meta, setPropVal } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;
  const [showProps, setShowProps] = React.useState(true);
  return (
    <>
      <PanelHeader onClick={() => setShowProps((v) => !v)}>Props</PanelHeader>
      {showProps && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(meta).map(
              ([name, def]) =>
                def && (
                  <tr key={name}>
                    <td>
                      <pre>
                        <DarkBlue>{name}</DarkBlue>
                      </pre>
                    </td>
                    <td>
                      <pre>
                        <Green>{`${def.required ? "* " : ""}${
                          def.typeStr || def.type
                        }`}</Green>
                      </pre>
                    </td>
                    <td>{def.docs}</td>
                    <td>{def.default}</td>
                    <td>
                      <def.Controller
                        onChange={setPropVal(name)}
                        value={props[name]}
                        meta={def}
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ControlPanel;
