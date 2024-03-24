import { useEffect, useState } from "kaioken";

export const useMutationObserver = (
  ref: Kaioken.Ref<Element>,
  callback: MutationCallback,
  options: MutationObserverInit | undefined = undefined
) => {
  const [isSupported, setIsSupported] = useState(false)
  const [isListening, setIsListening] = useState(true);
  let observer: MutationObserver | undefined;

  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = undefined;
    }
  };

  useEffect(() => {
    cleanup();
    if (isSupported && ref.current && isListening) {
      observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
    }
  }, [ref.current, isListening, isSupported]);

  useEffect(() => {
    setIsSupported(window && 'MutationObserver' in window)
  }, [])

  const start = () => {
    setIsListening(true);
  };

  const stop = () => {
    setIsListening(true);
  };

  return {
    isSupported,
    start,
    stop,
  };
};
