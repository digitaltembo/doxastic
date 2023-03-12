import React from "react";
import ReactDOM from "react-dom/client";
import { Document, Library, prop, views } from "doxastic";
import Button from "./components/Button";

import Checkbox from "./components/Checkbox";
import { H1, H2, H3, H4, H5, H6 } from "./components/Text";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Library defaultShowSource>
      <Document
        _a={Button}
        _name="Button"
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

      <Document
        _a={Checkbox}
        _name="Checkbox"
        _views={[views.autoGrid]}
        _import="src/components/Checkbox.tsx"
        checked={prop.bool({ trinary: true })}
        disabled={prop.bool()}
        onClick={prop.callback()}
      />

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
    </Library>
  </React.StrictMode>
);
