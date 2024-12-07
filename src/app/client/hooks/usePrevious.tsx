import { useEffect, useRef } from "react";

// Generic type T allows usePrevious to accept any type.
export default function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]); // Update ref only when value changes

  return ref.current;
}
