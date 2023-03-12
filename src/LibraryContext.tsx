import React from "react";

type ComponentRegistration = {
  componentName: string;
  ref: HTMLHeadingElement;
};
type LibraryContextType = {
  activeComponent?: string;
  components: ComponentRegistration[];
  defaultShowSource?: boolean;
  registerComponent: (registration: ComponentRegistration) => void;
  setActiveComponent: (c?: string) => void;
};

export const LibraryContext = React.createContext<LibraryContextType>({
  components: [],
  registerComponent: () => {},
  setActiveComponent: () => {},
});

export function LibraryProvider({
  defaultShowSource,
  children,
}: React.PropsWithChildren<{ defaultShowSource?: boolean }>) {
  const [activeComponent, setActiveComponent] = React.useState<
    string | undefined
  >(undefined);
  const [components, setComponents] = React.useState<ComponentRegistration[]>(
    []
  );
  const registerComponent = React.useCallback(
    (newRegistration: ComponentRegistration) =>
      setComponents((oldComponents: ComponentRegistration[]) => [
        ...oldComponents.filter(
          ({ componentName }) => componentName !== newRegistration.componentName
        ),
        newRegistration,
      ]),
    []
  );

  return (
    <LibraryContext.Provider
      value={{
        activeComponent,
        setActiveComponent,
        components,
        registerComponent,
        defaultShowSource,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}
