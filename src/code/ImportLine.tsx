import React from "react";

import { Magenta, Blue, Orange, Gray } from "./CodeColors";

function ImportLine({ thing, from }: { thing: string; from: string }) {
  return (
    <div>
      <Magenta>import</Magenta>
      {` `}
      <Blue>{thing}</Blue>
      {` `}
      <Magenta>from</Magenta>
      {` `}
      <Orange>{`"${from}"`}</Orange>
      <Gray>;</Gray>
    </div>
  );
}
export default ImportLine;
