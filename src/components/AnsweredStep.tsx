import type { Step } from "../lib/steps";
import { optionLabel } from "../lib/verifactu";

interface Props {
  step: Step;
  value: string;
  hash: string;
  onEdit: () => void;
}

export function AnsweredStep({ step, value, hash, onEdit }: Props) {
  return (
    <li className="link done">
      <div className="answered">
        <span className="q">{step.question}</span>
        <span className="a">{optionLabel(step, value)}</span>
        <span className="hash" aria-hidden="true">
          huella {hash.slice(0, 4)}…{hash.slice(-2)}
        </span>
        <button className="edit" type="button" onClick={onEdit}>
          Cambiar
        </button>
      </div>
    </li>
  );
}
