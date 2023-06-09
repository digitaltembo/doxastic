
<p align="center"><img align="center" alt="Doxastic" src="https://user-images.githubusercontent.com/4743325/224505564-9a428cf2-7dbe-4fbb-84b6-9cb8799a92d0.png" /></p>
<p align="center">
  <a href="https://www.npmjs.com/package/doxastic"><img alt="npm" src="https://img.shields.io/npm/v/doxastic" /></a>
</p>
<h4 align="center">🚧🚧🚧Under Construction 🚧🚧🚧</h4>
<h5 align="center">Document your React component library, with React</h5>

           
  
**Doxastic** is a component documentation system that aims to ease component implementation and iteration, taking you from install to fully customizable, interactive, and self-documenting component library/playground in a few easy steps.

[Storybook](https://github.com/storybookjs/storybook) is the classic and almost ubiquitous React component library documentation system, and [React Styleguidist](https://github.com/styleguidist/react-styleguidist) is another excellent project in this field. Both have many features that allow your component docs to thrive! But both require new types of files that are built with a whole new build process - Doxastic lets you document and render documentation with an ergonomic and well-typed interface of React components. At a high level, Doxastic should be able to provide all the features you want without additional overhead!

## Getting Started

To get started, you just need to install from npm:
```
npm i doxastic
```

Doxastic has additional peer-dependencies on React, React-DOM, and styled-components. This being a React documentation library, hopefully you have react, but styled-components is a handy library for including CSS styles in your React components that you may also need to install:
```
npm i styled-components
```

### Document a Component
Lets walk through a straightforward Checkbox component documentation:
```jsx
import {Document, bool, callback} from "doxastic";
import Checkbox from "my-checkbox-component";

<Document
  _a={Checkbox}
  _views={[views.autoGrid]}
  _import="src/components/Checkbox.tsx"
  checked={prop.bool({ trinary: true })}
  disabled={prop.bool()}
  onClick={prop.callback()}
/>
```

<img width="560" alt="Screenshot 2023-03-12 at 10 36 24 AM" src="https://user-images.githubusercontent.com/4743325/224551675-2389a32b-b8c0-42d6-b1dd-45730d43e396.png">

Easy enough to see, this will render documentation on our Checkbox component. Each component is rendered in a series of *views* where users will be able to preview the element, interact with it, edit props, and see demo source code. If the `_views` prop is left empty, it will default to showing a view of a single component. In this example, we use the `views.autoGrid` view definition to preview a grid of all combinations of example prop values - being checked = {true, false, undefined} and disabled = {true, false}.

The most important part of documenting a component is documenting the props - and for this, the `Document` component from doxastic takes in property meta values, easily created through a variety of helpers. Here we demonstrate 2 boolean properties, with the `checked` property behaving as a trinary boolean (where unknown is significantly distinct from false), and `disabled` being self-explanatory. All of the docType helpers can additionally act as a tagged template string, where the final string is arbitrary documentation of the prop. The `onClick` prop takes a callback, with the callback helper instantiating a quick method that logs when the callback is triggered.

### Documenting a set of components

Sometimes, you may want to document a set of related components together:
```jsx

import {Document, colors, str} from "doxastic";
import {H1, H2, H3, H4, H5, H6} from "my-text-components";

<Document
  _a={H1}
  _import="src/components/Text.tsx"
  _name="Text"
  _views={[
    views.example([
      [
        { _override: {component: H1, name: 'H1'} },
        { _override: {component: H2, name: 'H2'} },
        { _override: {component: H3, name: 'H3'} },
        { _override: {component: H4, name: 'H4'} },
        { _override: {component: H5, name: 'H5'} },
        { _override: {component: H6, name: 'H6'} },
      ],
    ]),
  ]}
  color={prop.colors({ default: "#000", example: "#000" })}
  children={prop.str({ example: "The quick brown fox etc" })}
/>
```
Here we group together our various text components, rendering a view of a set of examples with different components. We also introduce the `colors` and `str` docType helpers, which render basic input elements. With this, we can see all of the components together, and quickly try out new colors and contents on all of them:

<img width="680" alt="Screenshot 2023-03-12 at 10 38 56 AM" src="https://user-images.githubusercontent.com/4743325/224551747-f1068e2b-b8cc-4164-95a3-6a2e3b1dd54c.png">
