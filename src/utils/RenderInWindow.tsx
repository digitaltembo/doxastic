import React from "react";
import ReactDOM from "react-dom";

function RenderInWindow(props: React.PropsWithChildren<{}>) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const newWindow = React.useRef<Window | null>(null);

  React.useEffect(() => {
    // Create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  React.useEffect(() => {
    // When container is ready
    if (container) {
      // Create window
      newWindow.current = window.open(
        "",
        "",
        "width=600,height=400"
      );
      // Append container
      newWindow.current?.document?.body?.appendChild?.(container);

      // Save reference to window for cleanup
      const curWindow = newWindow.current;

      // Return cleanup function
      return () => curWindow?.close();
    }
  }, [container]);

  return container && ReactDOM.createPortal(props.children, container);
}
export default RenderInWindow;
