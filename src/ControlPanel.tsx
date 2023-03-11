import React from "react";
import { ComponentContexts, ComponentContextType } from "./ComponentContext";
import { EasyComponent } from "./types";

type ControlPanelProps = {
  componentName: string;
};
function ControlPanel<C extends EasyComponent>({ componentName }: ControlPanelProps) {
  const { props, meta, setPropVal } = React.useContext(
    ComponentContexts[componentName]
  ) as ComponentContextType<C>;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
          <th>Control</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(meta).map(
          ([name, def]) =>
            def && (
              <tr key={name}>
                <td><pre>{name}</pre></td>
                <td>{def.docs}</td>
                <td>
                  {def.required && "*"} {def.typeStr || def.type}
                </td>
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
  );
}

export default ControlPanel;
