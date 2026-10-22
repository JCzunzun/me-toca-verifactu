import type { CSSProperties } from "react";
import { useStoredState } from "../hooks/useStoredState";
import { fnv1a } from "../lib/verifactu";

// Cada tarea se guarda por el hash de su texto: si se cambia la redacción,
// su casilla vuelve a aparecer sin marcar en lugar de heredar otra.
export function Checklist({ tasks }: { tasks: string[] }) {
  const [checked, setChecked] = useStoredState<Record<string, boolean>>("vf-checks", {});
  const done = tasks.filter((task) => checked[fnv1a(task)]).length;

  return (
    <div>
      <div className="todo-head">
        <h3>Qué tienes que hacer</h3>
        <span className="todo-count">
          {done} de {tasks.length}
        </span>
      </div>
      <div className="todo-bar" aria-hidden="true">
        <div style={{ width: `${(done / tasks.length) * 100}%` }} />
      </div>
      <ul className="todo">
        {tasks.map((task, i) => {
          const key = fnv1a(task);
          return (
            <li key={key} style={{ "--i": i } as CSSProperties}>
              <label>
                <input
                  type="checkbox"
                  id={`todo-${key}`}
                  checked={!!checked[key]}
                  onChange={(e) => setChecked({ ...checked, [key]: e.target.checked })}
                />
                <span>{task}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
