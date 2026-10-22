import { useEffect, useState } from "react";

// En modo privado o con el almacenamiento bloqueado, localStorage lanza excepción.
// En ese caso el estado funciona igual, solo que no sobrevive a una recarga.
export function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin almacenamiento disponible: nada que hacer.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
