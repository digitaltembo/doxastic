import React from "react";
import styled from "styled-components";
import { LibraryContext, LibraryProvider } from "./LibraryContext";

const Window = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  font-family: sans-serif;
`;

const LeftBar = styled.div`
  overflow-y: auto;
  resize: horizontal;
  min-width: 15%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-right: 1px solid #000;
`;
const RightBar = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1em;
`;

type LibraryProps = React.PropsWithChildren<{
  heading?: JSX.Element;
  version?: JSX.Element;
  defaultShowSource?: boolean;
}>;

export function LibraryLayout({ heading, version, children }: LibraryProps) {
  const { components, activeComponent } = React.useContext(LibraryContext);

  const [search, setSearch] = React.useState<string>("");

  const filteredComponents = React.useMemo(
    () =>
      components.filter(({ componentName }) =>
        componentName.toLowerCase().includes(search.toLowerCase())
      ),
    [components, search]
  );

  const handleClick = React.useCallback(
    (ref: HTMLHeadingElement) => (event: React.MouseEvent) => {
      event.preventDefault();
      ref.scrollIntoView({ behavior: "smooth" });
    },
    []
  );
  const handleSearch = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );
  if (activeComponent !== undefined) {
    return <>{children}</>;
  }
  return (
    <Window>
      <LeftBar>
        {heading ?? <h1>Doxastic</h1>}
        {version}
        <hr />
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Component Search"
        />
        <ul>
          {filteredComponents.flatMap(({ componentName, ref }) => (
            <li key={componentName}>
              <button onClick={handleClick(ref)}>{componentName}</button>
            </li>
          ))}
        </ul>
      </LeftBar>
      <RightBar>{children}</RightBar>
    </Window>
  );
}

function Library(props: LibraryProps) {
  return (
    <LibraryProvider defaultShowSource={props.defaultShowSource}>
      <LibraryLayout {...props} />
    </LibraryProvider>
  );
}
export default Library;
