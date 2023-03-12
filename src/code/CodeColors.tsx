import React from "react";
import styled from "styled-components";

const ColorSpan = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

const makeColor =
  (r: number, g: number, b: number) =>
  ({ children }: { children: string }) =>
    <ColorSpan color={`rgb(${r},${g},${b})`}>{children}</ColorSpan>;

export const Magenta = makeColor(179, 130, 180);
export const Blue = makeColor(168, 216, 248);
export const DarkBlue = makeColor(100, 150, 200);
export const Orange = makeColor(193, 146, 122);
export const Yellow = makeColor(220, 220, 175);
export const Gray = makeColor(117, 117, 117);
export const Green = makeColor(113, 200, 180);
