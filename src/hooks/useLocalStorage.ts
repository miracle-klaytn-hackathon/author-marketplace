/* eslint-disable @typescript-eslint/ban-types */
import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? (value as Function)(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      return initialValue;
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      localStorage.removeItem(key);
    } catch (error) {
      return initialValue;
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

export default useLocalStorage;
