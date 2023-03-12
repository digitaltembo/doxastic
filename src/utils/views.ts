import { EasyComponent, PropMetasOf, PropGridOf, PropsOf, PropGrid } from "../types";
import templatize from "./templatize";

export function gridDimensionsFromMeta<C extends EasyComponent>(
  meta: PropMetasOf<C>
) {
  return Object.entries(meta).flatMap(([propName, propValue]) =>
    propValue?.examples
      ? [
          propValue.examples.map((examplePropVal: any) => ({
            [propName]: examplePropVal,
          })),
        ]
      : []
  ) as PropGridOf<C>;
}

export function getSamplesFromDimensions<C extends EasyComponent>(
  [gridCols, ...tail]: PropGridOf<C>,
  baseProps: PropsOf<C> = {}
) {
  if (tail.length === 0) {
    return [gridCols.map((gridProps) => ({ ...baseProps, ...gridProps }))];
  }
  return gridCols.map((colProps: PropsOf<C>) => {
    const colBaseProps = { ...baseProps, ...colProps };
    return tail
      .reduce(
        (accumulatedPropList: Array<PropsOf<C>>, cur: Array<PropsOf<C>>) =>
          accumulatedPropList.flatMap((accumulatedProps: PropsOf<C>) =>
            cur.map((newProp: PropsOf<C>) => ({
              ...accumulatedProps,
              ...newProp,
            }))
          ),
        [{}]
      )
      .map((colExtraProps: PropsOf<C>) => ({
        ...colBaseProps,
        ...colExtraProps,
      }));
  });
}

export function getBaseProps<C extends EasyComponent>(meta: PropMetasOf<C>) {
  return Object.fromEntries(
    Object.entries(meta).flatMap(([key, value]) => {
      if (value?.type === "callback") {
        if (value?.disabled) {
          return [[key, undefined]];
        }
        return [
          [key, (...args: any[]) => console.log("Callback ", key, ...args)],
        ];
      }
      if (value?.example !== undefined) {
        return [[key, value.example]];
      }
      if (value?.examples?.[0] !== undefined) {
        return [[key, value.examples[0]]];
      }
      return [];
    })
  );
}

export function getSampleGrid<C extends EasyComponent>(
  meta: PropMetasOf<C>,
  baseProps: PropsOf<C> = {}
): PropGridOf<C> {
  const gridDimensions = gridDimensionsFromMeta(meta);
  if (gridDimensions.length > 0) {
    return getSamplesFromDimensions(gridDimensions, baseProps);
  }
  return [[baseProps]];
}

export type View<C extends EasyComponent> = {
  docs?: string | JSX.Element;
  samples: (meta: PropMetasOf<C>) => PropGrid<Partial<PropsOf<C>>>;
};

export const autoGrid = templatize({ samples: getSampleGrid });
export const simple = templatize({
  samples: <C extends EasyComponent>(meta: PropMetasOf<C>) => [[{}]],
});

export function example<C extends EasyComponent>(examples: PropGrid<Partial<PropsOf<C>>>) {
  return templatize<View<C>>({
    samples: () => examples
  });
}

const views = { autoGrid, simple, example };

export default views;