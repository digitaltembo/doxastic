import React from "react";
import styled from "styled-components";
import { LibraryContext, LibraryProvider } from "./LibraryContext";

const Window = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
`;

const LeftBar = styled.div`
  overflow-y: auto;
  resize: horizontal;
  min-width: 15%;
  display: flex;
  flex-direction: column;
`;
const RightBar = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

type LibraryProps = React.PropsWithChildren<{
  heading?: JSX.Element;
  version?: JSX.Element;
}>;

export function LibraryLayout({ heading, version, children }: LibraryProps) {
  const { components } = React.useContext(LibraryContext);

  const [search, setSearch] = React.useState<string>("");

  const filteredComponents = React.useMemo(
    () =>
      components.filter(({ componentName }) => componentName.toLowerCase().includes(search.toLowerCase())),
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

  return (
    <Window>
      <LeftBar>
        {heading ?? <h1>Doxastic</h1>}
        {version}
        <hr />
        <input type="text" onChange={handleSearch} value={search} placeholder="Component Search" />
        <ul>
          {filteredComponents.flatMap(({ componentName, ref }) => (
            <li key={componentName}>
              <button onClick={handleClick(ref)}>
                {componentName}
              </button>
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
    <LibraryProvider>
      <LibraryLayout {...props} />
    </LibraryProvider>
  );
}
export default Library;
