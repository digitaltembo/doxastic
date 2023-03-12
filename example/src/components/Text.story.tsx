import React from "react";

import { Document, prop, views } from "doxastic";
import { H1, H2, H3, H4, H5, H6 } from "./Text";

export default function CheckboxStory() {
  return (
    <Document
      _a={H1}
      _import="src/components/Text.tsx"
      _name="Text"
      _views={[
        views.example([
          [
            { _override: { component: H1, name: "H1" } },
            { _override: { component: H2, name: "H2" } },
            { _override: { component: H3, name: "H3" } },
            { _override: { component: H4, name: "H4" } },
            { _override: { component: H5, name: "H5" } },
            { _override: { component: H6, name: "H6" } },
          ],
        ]),
      ]}
      color={prop.colors({ default: "#000", example: "#000" })}
      children={prop.str({ example: "The quick brown fox etc" })}
    />
  );
}
