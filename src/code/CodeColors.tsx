import React from "react";
import styled from "styled-components";
import { DoxasticTheme } from "../ThemeProvider";

const ColorSpan = styled.span<{ color: keyof DoxasticTheme["pallette"]}>`
  color: ${({ color, theme }) => theme.doxastic.pallette[color]};
`;

const makeColor =
  (color: keyof DoxasticTheme["pallette"]) =>
  ({ children }: { children: string }) =>
    <ColorSpan color={color}>{children}</ColorSpan>;

export const Magenta = makeColor("magenta");
export const Blue = makeColor("blue");
export const DarkBlue = makeColor("darkBlue");
export const Orange = makeColor('orange');
export const Yellow = makeColor('yellow');
export const Gray = makeColor('gray');
export const Green = makeColor('green');
