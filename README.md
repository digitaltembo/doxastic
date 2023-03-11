
<p align="center"><img align="center" alt="Doxastic" src="https://user-images.githubusercontent.com/4743325/224505564-9a428cf2-7dbe-4fbb-84b6-9cb8799a92d0.png" /></p>
<h4 align="center">🚧🚧🚧Under Construction 🚧🚧🚧</h4>
<h5 align="center">Document your React component library, with React</h5>

**Doxastic** is a component documentation system that aims to ease component implementation and iteration, taking you from install to fully customizable, interactive, and self-documenting component library/playground in a few easy steps.

[Storybook](https://github.com/storybookjs/storybook) is the classic and almost ubiquitous React component library documentation system, and [React Styleguidist](https://github.com/styleguidist/react-styleguidist) is another excellent project in this field. Both have many features that allow your component docs to thrive! But both require new types of files that are built with a whole new build process - Doxastic lets you document and render documentation with an ergonomic and well-typed interface of React components. At a high level, Doxastic should be able to provide all the features you want without additional overhead!

## Getting Started

I guess install the thing

### Document a Component
Lets walk through a straightforward Checkbox component documentation:
```jsx
import {Document, bool, callback} from "doxastic";
import Checkbox from "my-checkbox-component";

<Document
  _a={Checkbox}
  _defaultView='grid'
  checked={bool({ trinary: true })`
    This is documentation about the checked prop
  `}
  disabled={bool()}
  onClick={callback()}
/>
```
<img width="444" alt="Screenshot 2023-03-11 at 1 58 09 PM" src="https://user-images.githubusercontent.com/4743325/224506696-e929fa02-94df-4d71-b2b8-88efd1aa6145.png">

Easy enough to see, this will render documentation on our Checkbox component. The `_defaultView` here says that we will by default see a grid of permutations of the component, automatically chosen based on the potential and example values of the props of the component.

The most important part of documenting a component is documenting the props - and for this, the `Document` component from doxastic takes in property meta values, easily created through a variety of helpers. Here we demonstrate 2 boolean properties, with the `checked` property behaving as a trinary boolean (where unknown is significantly distinct from false), and `disabled` being self-explanatory. All of the docType helpers can additionally act as a tagged template string, where the final string is arbitrary documentation of the prop. The `onClick` prop takes a callback, with the callback helper instantiating a quick method that logs when the callback is triggered.

### Documenting a set of components

Sometimes, you may want to document a set of related components together:
```jsx

import {Document, colors, str} from "doxastic";
import {H1, H2, H3, H4, H5, H6} from "my-text-components";

<Document
  _a={H1}
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
  _defaultView='examples'
  color={colors({default: '#000', example: '#000'})}
  children={str({ example: "The quick brown fox etc" })}
/>
```
Here we group together our various text components, rendering a set of examples with different component. We also introduce the `colors` and `str` docType helpers, which render basic input elements. With this, we can see all of the components together, and quickly try out new colors and contents on all of them:
<img width="483" alt="Screenshot 2023-03-11 at 1 56 53 PM" src="https://user-images.githubusercontent.com/4743325/224506655-d3128374-f401-4014-aa50-7a25ec0e9135.png">

And that is about what I have in me right now!
