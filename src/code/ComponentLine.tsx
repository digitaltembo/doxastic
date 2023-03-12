import React from "react";

import { Gray, Green, Blue, Orange, Magenta } from "./CodeColors";

export type ComponentLineProps = {
  indents: number;
  name?: string;
  open?: string;
  close?: string;
  children?: string;
  props?: Record<string, string | undefined>;
};

function ComponentLine({
  indents,
  name,
  open,
  close,
  props,
  children,
}: ComponentLineProps) {
  const predent = new Array(Math.max(0, indents * 2) + 1).join(" ");
  if (name) {
    return (
      <div>
        {predent}

        <Gray>&lt;</Gray>
        <Green>{name}</Green>
        {props &&
          Object.entries(props).map(([key, value]) => (
            <React.Fragment key={key}>
              {" "}
              {value ? (
                <>
                  <Blue>{`${key}=`}</Blue>
                  {value.startsWith('"') ? (
                    <Orange>{value}</Orange>
                  ) : (
                    <>
                      <Magenta>{"{"}</Magenta>
                      <Blue>{value.substring(1, value.length - 1)}</Blue>
                      <Magenta>{"}"}</Magenta>
                    </>
                  )}
                </>
              ) : (
                <Blue>{key}</Blue>
              )}
            </React.Fragment>
          ))}
        {children ? (
          <>
            <Gray>&gt;</Gray>
            {children}
            <Gray>&lt;/</Gray>
            <Green>{name}</Green>
            <Gray>&gt;</Gray>
          </>
        ) : (
          <Gray>/&gt;</Gray>
        )}
      </div>
    );
  }
  if (open && !close) {
    return (
      <div>
        {predent}
        <Gray>&lt;</Gray>
        <Green>{open}</Green>
        <Gray>&gt;</Gray>
      </div>
    );
  }
  if (close && !open) {
    return (
      <div>
        {predent}
        <Gray>&lt;/</Gray>
        <Green>{close}</Green>
        <Gray>&gt;</Gray>
      </div>
    );
  }
  return <div />;
}

export default ComponentLine;
