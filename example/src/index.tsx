import React from "react";
import ReactDOM from "react-dom/client";
import { Document, Library, prop } from "doxastic";
import Button from "./components/Button";

import Checkbox from "./components/Checkbox";
import { H1, H2, H3, H4, H5, H6 } from "./components/Text";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Library>
      <Document
        _a={Button}
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
        _defaultView="grid"
        checked={prop.bool({ trinary: true })}
        disabled={prop.bool()}
        onClick={prop.callback()}
      />

      <Document
        _a={H1}
        _name="Text"
        _examples={[
          [
            { _overrideComponent: H1 },
            { _overrideComponent: H2 },
            { _overrideComponent: H3 },
            { _overrideComponent: H4 },
            { _overrideComponent: H5 },
            { _overrideComponent: H6 },
          ],
        ]}
        _defaultView="examples"
        color={prop.colors({ default: "#000", example: "#000" })}
        children={prop.str({ example: "The quick brown fox etc" })}
      />
    </Library>
  </React.StrictMode>
);