import React from "react";
import "styled-components";
import { ThemeProvider as Provider } from "styled-components";

export type DoxasticTheme = {
  pallette: {
    bg: string;
    fg: string;
    outOfFocus: string;
    outOfFocusHover: string;
    magenta: string;
    blue: string;
    darkBlue: string;
    orange: string;
    yellow: string;
    gray: string;
    green: string;
  };
  fonts: {
    default: string;
    light: string;
    header: string;
  };
};
declare module "styled-components" {
  export interface DefaultTheme {
    doxastic: DoxasticTheme;
  }
}

const DEFAULT_THEME = {
  doxastic: {
    pallette: {
      bg: "#FFF",
      fg: "#000",
      outOfFocus: "#888",
      outOfFocusHover: "#666",
      magenta: 'rgb(179, 130, 180)',
      blue: 'rgb(168, 216, 248)',
      darkBlue: 'rgb(100, 150, 200)',
      orange: 'rgb(193, 146, 122)',
      yellow: 'rgb(220, 220, 175)',
      gray: 'rgb(117, 117, 117)',
      green: 'rgb(113, 200, 180)',
    },
    fonts: {
      default: "font-family: sans-serif;",
      light: "font-weight: lighter;",
      header: "font-weight: normal;",
    },
  },
};

export function ThemeProvider({
  theme,
  children,
}: React.PropsWithChildren<{ theme?: Partial<DoxasticTheme> }>) {
  const finalTheme = React.useMemo(
    () =>
      theme
        ? {
            doxastic: {
              pallette: {
                ...DEFAULT_THEME.doxastic.pallette,
                ...theme.pallette,
              },
              fonts: { ...DEFAULT_THEME.doxastic.fonts, ...theme.fonts },
            },
          }
        : DEFAULT_THEME,
    [theme]
  );
  return (
    <Provider theme={theme ? finalTheme : DEFAULT_THEME}>{children}</Provider>
  );
}
