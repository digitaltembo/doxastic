import React from "react";
import { BooleanPropMeta } from "./docTypes/bool";
import { nameOf, PropContexts, PropContextType } from "./PropContext";
import { EasyComponent, PropGrid, PropsOf } from "./types";

type Props = {
  componentName: string;
  importPath?: string;
};

type PropPair<C extends EasyComponent> = [PropsOf<C>, string];
function ColCode<C extends EasyComponent>({
  componentName,
  col,
}: {
  componentName: string;
  col: Array<PropPair<C>>;
}) {
  const components = col.map(
    ([props, propString]: PropPair<C>) =>
      `
              <${
        props._overrideComponent
          ? nameOf(props._overrideComponent)
          : componentName
      }${propString}${
        props.children ? `>${props.children}</${componentName}>` : "/>"
      }`
  );
  const content =
    components.length > 1
      ? `<Col>${components.join('')}
            </Col>`
      : components[0];
  return <>{content}</>;
}

// function GridCode<C extends EasyComponent>({grid}: {grid: PropGridOf<PropPair<C>>}) {

// }
function Code<C extends EasyComponent>({ componentName, importPath }: Props) {
  const { meta, samples } = React.useContext(
    PropContexts[componentName]
  ) as PropContextType<C>;

  const propList: PropGrid<PropPair<C>> = React.useMemo(
    () =>
      samples.map((propGroup: Array<PropsOf<C>>) =>
        propGroup.map((sampleProps: PropsOf<C>) => [
          sampleProps,
          Object.entries(sampleProps)
            .map(([key, value]) => {
              if (
                key == "children" ||
                value === undefined ||
                value === meta[key]?.default ||
                (!(meta[key] as Partial<BooleanPropMeta>)?.trinary &&
                  value === false) ||
                typeof value === "function"
              ) {
                return "";
              }
              if (value === true) {
                return ` ${key}`;
              }
              if (typeof value === "string") {
                return ` ${key}="${value}"`;
              }
              return ` ${key}={${value}}`;
            })
            .join(""),
        ])
      ),
    [samples]
  );
  return (
    <pre style={{ textAlign: "left" }}>
      {`
      import React from "react";
      ${importPath ? `import ${componentName} from "${importPath}";\n` : ""}
      
      function Render() {
        return (
          <Grid>`}{propList.map((col: Array<PropPair<C>>, i) => (
        <ColCode key={i} componentName={componentName} col={col} />
      ))}
      {`
          </Grid>
        );
      }`}
    </pre>
  );
}

export default Code;
