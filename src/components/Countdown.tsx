import { useCountUp } from "../hooks/useCountUp";

export function Countdown({ days }: { days: number }) {
  const remaining = Math.max(0, days);
  const shown = useCountUp(remaining);

  let caption = "Tu fecha límite ya ha llegado";
  if (remaining === 1) caption = "día para tu fecha límite";
  else if (remaining > 1) caption = "días para tu fecha límite";

  return (
    <div className="count">
      {/* El número animado se oculta al lector de pantalla para que no lea cada paso. */}
      <b aria-hidden="true">{shown.toLocaleString("es-ES")}</b>
      <span className="sr-only">{remaining}</span>
      <span>{caption}</span>
    </div>
  );
}
