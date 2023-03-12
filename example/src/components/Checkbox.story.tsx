import React from "react";
import { Document, prop, views } from "doxastic";
import Checkbox from "./Checkbox";

export default function CheckboxStory() {
  return (
    <Document
      _a={Checkbox}
      _views={[views.autoGrid]}
      _import="src/components/Checkbox.tsx"
      checked={prop.bool({ trinary: true })}
      disabled={prop.bool()}
      onClick={prop.callback()}
    />
  );
}
