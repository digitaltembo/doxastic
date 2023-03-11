import React from "react";

type TextProps = React.PropsWithChildren<{ color?: string }>;

export function H1({ color, children }: TextProps) {
  return <h1 style={{ color }}>{children}</h1>;
}

export function H2({ color, children }: TextProps) {
  return <h2 style={{ color }}>{children}</h2>;
}

export function H3({ color, children }: TextProps) {
  return <h3 style={{ color }}>{children}</h3>;
}

export function H4({ color, children }: TextProps) {
  return <h4 style={{ color }}>{children}</h4>;
}

export function H5({ color, children }: TextProps) {
  return <h5 style={{ color }}>{children}</h5>;
}

export function H6({ color, children }: TextProps) {
  return <h6 style={{ color }}>{children}</h6>;
}

export function P({ color, children }: TextProps) {
  return <p style={{ color }}>{children}</p>;
}
