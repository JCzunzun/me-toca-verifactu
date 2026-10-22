import { useEffect, useRef, type CSSProperties } from "react";
import type { Step } from "../lib/steps";

interface Props {
  step: Step;
  value?: string;
  autoFocus: boolean;
  onAnswer: (value: string) => void;
}

export function QuestionStep({ step, value, autoFocus, onAnswer }: Props) {
  const fieldset = useRef<HTMLFieldSetElement>(null);

  // Mover el foco a la nueva pregunta permite hacer el test entero con teclado.
  // En la carga inicial no se hace para no saltar por encima del inicio de la página.
  useEffect(() => {
    if (!autoFocus) return;
    fieldset.current?.querySelector<HTMLInputElement>("input:checked, input")?.focus({ preventScroll: true });
  }, [autoFocus, step.id]);

  return (
    <li className="link enter">
      <fieldset ref={fieldset} id={`step-${step.id}`}>
        <legend>{step.question}</legend>
        {step.hint && <p className="hint">{step.hint}</p>}
        <div className="options">
          {step.options.map((option, i) => (
            <label className="opt" key={option.value} style={{ "--i": i } as CSSProperties}>
              <input
                type="radio"
                id={`${step.id}-${option.value}`}
                name={step.id}
                value={option.value}
                checked={value === option.value}
                onChange={() => onAnswer(option.value)}
              />
              <div>
                <strong>{option.label}</strong>
                {option.detail && <span>{option.detail}</span>}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </li>
  );
}
