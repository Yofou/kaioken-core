import { useEffect, useState } from "kaioken";
import { useEventListener } from "./useEventListener";
import { useMediaQuery } from "./useMediaQuery";

export const useWindowSize = (listenOrientation: boolean = true) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const update = () => {
    if (window) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
  };

  useEffect(update, []);
  useEventListener("resize", update, { passive: true });
  
  if (listenOrientation) {
    const [matches] = useMediaQuery('(orientation: portrait)')
    useEffect(update, [matches])
  }

  return { width, height };
};
