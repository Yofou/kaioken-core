import { useEffect, useState } from "kaioken";
import { useEventListener } from "./useEventListener";

export const useWindowFocus = () => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setFocused(window.document.hasFocus());
  }, []);

  useEventListener("focus", () => {
    setFocused(true);
  });

  useEventListener("blur", () => {
    setFocused(false);
  });

  return [focused];
};
