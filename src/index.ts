import Document from "./Document";
import Canvas from "./Canvas";
import Code from "./Code";
import ControlPanel from "./ControlPanel";
import { ComponentView, ComponentProvider } from "./ComponentContext";
import { num } from "./docTypes/num";
import { choices } from "./docTypes/choices";
import { str } from "./docTypes/str";
import { callback } from "./docTypes/callback";
import { bool } from "./docTypes/bool";
import { colors } from "./docTypes/colors";

export type { ComponentView };
export {
    Document,
    Canvas,
    Code,
    ControlPanel, ComponentProvider,
    num, choices, str, callback, bool, colors
};    

