import React from "react";

type ComponentRegistration = {
  componentName: string;
  ref: HTMLHeadingElement;
};
type LibraryContextType = {
  activeComponent?: string;
  components: ComponentRegistration[];
  registerComponent: (registration: ComponentRegistration) => void;
};

export const LibraryContext = React.createContext<LibraryContextType>({
  components: [],
  registerComponent: () => {},
});

export function LibraryProvider({ children }: React.PropsWithChildren<{}>) {
  //   const [activeComponent, setActiveComponent] = React.useState<
  //     string | undefined
  //   >(undefined);
  const [components, setComponents] = React.useState<ComponentRegistration[]>(
    []
  );
  const registerComponent = React.useCallback(
    (newRegistration: ComponentRegistration) =>
      setComponents((oldComponents: ComponentRegistration[]) => {
        if (
          !oldComponents.find(
            ({ componentName }) =>
              componentName === newRegistration.componentName
          )
        ) {
          return [...oldComponents, newRegistration];
        } else {
          return oldComponents;
        }
      }),
    []
  );

  return (
    <LibraryContext.Provider value={{ components, registerComponent }}>
      {children}
    </LibraryContext.Provider>
  );
}
