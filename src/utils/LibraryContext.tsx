import React from "react";
import useLocationHashManager from "./useLocationHashManager";

type ComponentRegistration = {
  componentName: string;
  ref: HTMLDivElement;
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
  const {hash, changeHash} = useLocationHashManager();

  const activateComponent = React.useCallback((component?: string) => {
    changeHash({active: component, view: undefined });
    setActiveComponent(component);
  }, [changeHash]);

  const registerComponent = React.useCallback(
    (newRegistration: ComponentRegistration) => {
      setComponents((oldComponents: ComponentRegistration[]) => [
        ...oldComponents.filter(
          ({ componentName }) => componentName !== newRegistration.componentName
        ),
        newRegistration,
      ]);
    },
    []
  );

  React.useEffect(() => {
    setActiveComponent(hash.active);
  }, [hash.active]);

  return (
    <LibraryContext.Provider
      value={{
        activeComponent,
        setActiveComponent: activateComponent,
        components,
        registerComponent,
        defaultShowSource,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}
