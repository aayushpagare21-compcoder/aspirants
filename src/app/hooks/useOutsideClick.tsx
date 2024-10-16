import { useEffect, MutableRefObject } from "react";

const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | undefined>,
  callback: () => void,
): void => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
