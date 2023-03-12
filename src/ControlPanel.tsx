import React from "react";
import styled from "styled-components";

import { DarkBlue, Green } from "./code/CodeColors";
import { EasyComponent, PropMetasOf, PropsOf } from "./types";
import { ClickableHeader } from "./utils/Text";

const Table = styled.table`
  width: 100%;
`;

type ControlPanelProps<C extends EasyComponent> = {
  baseProps: PropsOf<C>;
  meta: PropMetasOf<C>;
  setPropVal: (key: keyof PropsOf<C>) => (value: any) => void;
  defaultOpen?: boolean;
};

function ControlPanel<C extends EasyComponent>({
    baseProps,
  meta,
  setPropVal,
  defaultOpen,
}: ControlPanelProps<C>) {
  const [showProps, setShowProps] = React.useState(defaultOpen ?? false);
  return (
    <>
      <ClickableHeader onClick={() => setShowProps((v) => !v)}>
        Props
      </ClickableHeader>
      {showProps && (
        <Table>
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
                        value={baseProps[name]}
                        meta={def}
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ControlPanel;
