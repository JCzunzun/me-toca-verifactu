import { useMemo, useState, type Ref } from "react";
import { useStoredState } from "../hooks/useStoredState";
import type { Answers, StepId } from "../lib/steps";
import { answer, buildChain, decide, progressPercent, prune, summaryText } from "../lib/verifactu";
import { AnsweredStep } from "./AnsweredStep";
import { QuestionStep } from "./QuestionStep";
import { Verdict } from "./Verdict";

interface Props {
  ref?: Ref<HTMLElement>;
  // Pasa a true cuando el usuario empieza a interactuar; antes no se mueve el foco ni el scroll.
  interacted: boolean;
  onInteract: () => void;
  onRestart: () => void;
}

export function Quiz({ ref, interacted, onInteract, onRestart }: Props) {
  const [saved, setSaved] = useStoredState<Answers>("vf-answers", {});
  const [editing, setEditing] = useState<StepId | null>(null);

  const answers = useMemo(() => prune(saved), [saved]);
  const chain = buildChain(answers, editing);
  const isOpen = chain.some((item) => item.type === "open");
  const verdict = isOpen ? null : decide(answers);
  const answered = chain.filter((item) => item.type === "done").length;
  const progress = progressPercent(answered, verdict !== null);

  const restart = () => {
    setEditing(null);
    setSaved({});
    onRestart();
  };

  return (
    <section className="section quiz" id="test" ref={ref} aria-labelledby="quiz-title">
      <div className="wrap">
        <div className="quiz-head">
          <h2 id="quiz-title" className="section-title">
            El test
          </h2>
          <span className="quiz-step">{verdict ? "Resultado listo" : `Pregunta ${answered + 1}`}</span>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="Progreso del test"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div style={{ width: `${progress}%` }} />
        </div>

        <ol className="chain" aria-live="polite">
          {chain.map((item) =>
            item.type === "done" ? (
              <AnsweredStep
                key={item.step.id}
                step={item.step}
                value={item.value}
                hash={item.hash}
                onEdit={() => {
                  onInteract();
                  setEditing(item.step.id);
                }}
              />
            ) : (
              <QuestionStep
                key={item.step.id}
                step={item.step}
                value={answers[item.step.id]}
                autoFocus={interacted}
                onAnswer={(value) => {
                  onInteract();
                  setEditing(null);
                  setSaved(answer(answers, item.step.id, value));
                }}
              />
            ),
          )}
        </ol>

        {verdict && (
          <Verdict
            verdict={verdict}
            summary={summaryText(answers, verdict)}
            autoFocus={interacted}
            onRestart={restart}
          />
        )}
      </div>
    </section>
  );
}
