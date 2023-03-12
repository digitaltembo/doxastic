import React from "react";

import { Document, prop, views } from "doxastic";
import Button from "./Button";

export default function ButtonStory() {
  return (
    <Document
      _a={Button}
      _docs={`
            The humble button serves to entice and engage all sophisticated users
        `}
      _views={[
        views.simple,
        views.example([[{ mode: "secondary" }]])`
                The Secondary button is used as a lame fallback
            `,
      ]}
      _import="src/components/Button.tsx"
      mode={prop.choices(
        { default: "primary" },
        "primary",
        "secondary",
        "tertiary"
      )`
                Primary display mode
            `}
      sunglasses={prop.num({
        example: 6,
        min: 3,
        max: 10,
        default: 0,
        range: true,
      })`
                The number of sunglasses to put in the button
            `}
      children={prop.str({ example: "Button" })`
                Contents of the button
            `}
      onClick={prop.callback()}
    />
  );
}