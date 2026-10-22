import { describe, expect, it } from "vitest";
import { activeSteps, answer, buildChain, daysUntil, decide, DEADLINES, progressPercent } from "./verifactu";
import type { Answers } from "./steps";
import { MILESTONES, milestoneStatus, todayPercent } from "./timeline";

const base: Answers = { emite: "si", foral: "comun", sii: "no" };

describe("decide", () => {
  it("devuelve null mientras faltan respuestas", () => {
    expect(decide({})).toBeNull();
    expect(decide({ emite: "si" })).toBeNull();
    expect(decide({ ...base, como: "programa", forma: "autonomo" })).toBeNull();
  });

  it("excluye a quien no factura, territorios forales y SII", () => {
    expect(decide({ emite: "no" })?.kind).toBe("clear");
    expect(decide({ emite: "si", foral: "pv" })?.title).toMatch(/no se te aplica/);
    expect(decide({ emite: "si", foral: "na" })?.title).toMatch(/no se te aplica/);
    expect(decide({ emite: "si", foral: "comun", sii: "si" })?.title).toMatch(/SII/);
  });

  it("deja fuera las facturas a mano y las plantillas sin cálculos", () => {
    expect(decide({ ...base, como: "mano" })?.kind).toBe("clear");
    expect(decide({ ...base, como: "plantilla" })?.kind).toBe("clear");
  });

  it("asigna 1 de enero de 2027 a sociedades", () => {
    const v = decide({ ...base, como: "programa", forma: "sociedad", soft: "nube" });
    expect(v?.kind).toBe("affected");
    if (v?.kind === "affected") expect(v.deadline).toBe(DEADLINES.sociedad);
  });

  it("asigna 1 de julio de 2027 a autónomos y comunidades de bienes", () => {
    for (const forma of ["autonomo", "cb"]) {
      const v = decide({ ...base, como: "programa", forma, soft: "medida" });
      if (v?.kind !== "affected") throw new Error("debería afectar");
      expect(v.deadline).toBe(DEADLINES.persona);
    }
  });

  it("trata un Excel con cálculos fiscales como sistema de facturación", () => {
    const v = decide({ ...base, sii: "nose", como: "macros", forma: "autonomo" });
    if (v?.kind !== "affected") throw new Error("debería afectar");
    expect(v.software).toBe("macros");
  });
});

describe("flujo", () => {
  it("cambiar una respuesta borra las posteriores", () => {
    const a = answer({ ...base, como: "programa", forma: "sociedad", soft: "nube" }, "foral", "pv");
    expect(a).toEqual({ emite: "si", foral: "pv" });
  });

  it("solo muestra la pregunta del programa si se factura con uno", () => {
    expect(activeSteps({ ...base, como: "macros" }).map((s) => s.id)).not.toContain("soft");
    expect(activeSteps({ ...base, como: "programa" }).map((s) => s.id)).toContain("soft");
  });
});

describe("daysUntil", () => {
  it("cuenta días naturales desde medianoche local", () => {
    expect(daysUntil(DEADLINES.sociedad.date, new Date(2026, 9, 23, 23, 59))).toBe(70);
    expect(daysUntil(DEADLINES.persona.date, new Date(2026, 9, 23, 8, 0))).toBe(251);
  });
});

describe("calendario", () => {
  it("marca el estado de cada hito según la fecha", () => {
    const now = new Date(2026, 9, 23);
    expect(MILESTONES.map((m) => milestoneStatus(m, now))).toEqual(["past", "current", "next", "next"]);
    expect(milestoneStatus(MILESTONES[1], new Date(2027, 0, 2))).toBe("past");
  });

  it("limita la posición de hoy entre 0 y 100", () => {
    expect(todayPercent(new Date(2020, 0, 1))).toBe(0);
    expect(todayPercent(new Date(2030, 0, 1))).toBe(100);
    const p = todayPercent(new Date(2026, 9, 23));
    expect(p).toBeGreaterThan(60);
    expect(p).toBeLessThan(70);
  });
});

describe("buildChain", () => {
  it("se detiene en la primera pregunta sin responder", () => {
    const chain = buildChain({ emite: "si" }, null);
    expect(chain.map((item) => item.type)).toEqual(["done", "open"]);
    expect(chain[1].step.id).toBe("foral");
  });

  it("cambiar una respuesta cambia la huella de las siguientes", () => {
    const before = buildChain({ ...base, como: "mano" }, null);
    const after = buildChain({ ...base, sii: "nose", como: "mano" }, null);
    const hash = (chain: typeof before, i: number) => (chain[i].type === "done" ? chain[i].hash : "");
    expect(hash(before, 1)).toBe(hash(after, 1));
    expect(hash(before, 3)).not.toBe(hash(after, 3));
  });

  it("reabre la pregunta que se está editando", () => {
    const chain = buildChain(base, "foral");
    expect(chain[chain.length - 1]).toMatchObject({ type: "open", step: { id: "foral" } });
  });
});

describe("progressPercent", () => {
  it("no llega al 100 % hasta que hay resultado", () => {
    expect(progressPercent(0, false)).toBe(0);
    expect(progressPercent(10, false)).toBeLessThan(100);
    expect(progressPercent(3, true)).toBe(100);
  });
});
