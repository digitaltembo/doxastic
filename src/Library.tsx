import React from "react";
import styled from "styled-components";
import { DoxasticTheme, ThemeProvider } from "./ThemeProvider";
import { LibraryContext, LibraryProvider } from "./utils/LibraryContext";
import { ClickableHeader } from "./utils/Text";
import useLocationHashManager from "./utils/useLocationHashManager";

const Window = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  ${({theme}) => theme.doxastic.fonts.default}
`;

const LeftBar = styled.div`
  overflow-y: auto;
  min-width: 15%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-right: 1px solid ${({theme}) => theme.doxastic.pallette.fg};
`;
const RightBar = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1em;
`;

const SingleView = styled.div`
  ${({theme}) => theme.doxastic.fonts.default}
  padding: 2rem;
`;

type LibraryProps = React.PropsWithChildren<{
  heading?: JSX.Element;
  version?: JSX.Element;
  defaultShowSource?: boolean;
  theme?: DoxasticTheme;
}>;

export function LibraryLayout({ heading, version, children }: LibraryProps) {
  const { components, activeComponent } = React.useContext(LibraryContext);

  const [search, setSearch] = React.useState<string>("");
  const [rightRef, setRightRef] = React.useState<HTMLDivElement | null>(null);
  const { hash, changeHash } = useLocationHashManager();

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
  React.useEffect(() => {
    if (hash.view !== undefined) {
      const el = components.filter(
        ({ componentName, ref }) => componentName === hash.view
      )?.[0]?.ref;
      el?.scrollIntoView();
    }
  }, [components, hash]);

  React.useEffect(() => {
    if (rightRef) {
      let currentlyVisible: Element[] = [];
      const observer = new IntersectionObserver(
        (entries, o) => {
          currentlyVisible = components.flatMap(({ ref }) => {
            const entryIsIntersecting: boolean | undefined = entries.filter(
              (entry) => entry.target === ref
            )?.[0]?.isIntersecting;
            const notScrolledOut =
              currentlyVisible.indexOf(ref) >= 0 &&
              entryIsIntersecting !== false;

            if (entryIsIntersecting || notScrolledOut) {
              return [ref];
            }
            return [];
          });
          changeHash({
            view:
              currentlyVisible[0]?.querySelector("h1")?.textContent ??
              undefined,
          });
        },
        { root: rightRef, threshold: 0 }
      );
      for (const { ref: componentRef } of components) {
        observer.observe(componentRef);
      }
      return () => {
        observer.disconnect();
      };
    }
    return () => {};
  }, [rightRef, components, changeHash]);

  if (activeComponent !== undefined) {
    return <SingleView>{children}</SingleView>;
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
              <ClickableHeader onClick={handleClick(ref)}>{componentName}</ClickableHeader>
            </li>
          ))}
        </ul>
      </LeftBar>
      <RightBar ref={setRightRef}>{children}</RightBar>
    </Window>
  );
}

function Library(props: LibraryProps) {
  return (
    <ThemeProvider theme={props.theme}>
      <LibraryProvider defaultShowSource={props.defaultShowSource}>
        <LibraryLayout {...props} />
      </LibraryProvider>
    </ThemeProvider>
  );
}
export default Library;
