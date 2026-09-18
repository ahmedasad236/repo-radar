import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delayTime: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delayTime);
    return () => clearTimeout(timeout);
  }, [value, delayTime]);

  return debouncedValue;
}
