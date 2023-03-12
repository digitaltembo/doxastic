import React from "react";

type HashContents = {
  view?: string;
  active?: string;
};

function parseLocationHash() {
  return Object.fromEntries(
    new URLSearchParams(
      window.location.hash.substring(1) // skip the first char (#)
    )
  ) as HashContents;
}

function useLocationHashManager() {
  const [hashContents, setHashContents] = React.useState(parseLocationHash());


  const hashChangeHandler = React.useCallback(() => {
    setHashContents(parseLocationHash());
  }, []);
  const changeHash = React.useCallback(
    (partialNew: HashContents) => {
      const newContents = {...hashContents, ...partialNew};
      const searchParams = new URLSearchParams(newContents);
      // remove undefined entries
      Object.entries(newContents).forEach(([key, value]) => {
        if (value === undefined) {
          searchParams.delete(key);
        }
      });
      if (hashContents.active !== newContents.active) {
        window.history.pushState("", "", "#" + searchParams.toString());
      } else {

        window.history.replaceState("", "", "#" + searchParams.toString());
      }
    },
    [hashContents]
  );

  React.useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, [hashChangeHandler]);

  return { hash: hashContents, changeHash };
}

export default useLocationHashManager;
