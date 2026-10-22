import { useEffect, useState } from "react";

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export function useCountUp(target: number, duration = 900, delay = 250) {
  const [value, setValue] = useState(() => (reducedMotion() ? target : 0));

  useEffect(() => {
    if (reducedMotion()) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startedAt = 0;
    const tick = (now: number) => {
      startedAt ||= now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const easeOutQuart = 1 - (1 - progress) ** 4;
      setValue(Math.round(target * easeOutQuart));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    // El retraso deja que la tarjeta del resultado termine de entrar antes de contar.
    const timeout = setTimeout(() => (frame = requestAnimationFrame(tick)), delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [target, duration, delay]);

  return value;
}
