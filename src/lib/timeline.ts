export interface Milestone {
  id: string;
  date: Date;
  until?: Date;
  label: string;
  title: string;
  text: string;
}

export type MilestoneStatus = "past" | "current" | "next";

export const MILESTONES: Milestone[] = [
  {
    id: "software",
    date: new Date(2025, 6, 29),
    label: "29 jul 2025",
    title: "Programas adaptados",
    text: "Los fabricantes de software ya deben ofrecer versiones que cumplan.",
  },
  {
    id: "voluntario",
    date: new Date(2026, 0, 1),
    until: new Date(2027, 0, 1),
    label: "Todo 2026",
    title: "Año de pruebas",
    text: "Puedes usar Verifactu de forma voluntaria para ir probando.",
  },
  {
    id: "sociedades",
    date: new Date(2027, 0, 1),
    label: "1 ene 2027",
    title: "Obligatorio para sociedades",
    text: "SL, SA y demás entidades que pagan Impuesto sobre Sociedades.",
  },
  {
    id: "autonomos",
    date: new Date(2027, 6, 1),
    label: "1 jul 2027",
    title: "Obligatorio para autónomos",
    text: "Personas físicas con actividad y el resto de obligados.",
  },
];

export function milestoneStatus(milestone: Milestone, now: Date = new Date()): MilestoneStatus {
  if (milestone.until && now >= milestone.until) return "past";
  if (now < milestone.date) return "next";
  return milestone.until ? "current" : "past";
}

export function todayPercent(now: Date = new Date()): number {
  const start = MILESTONES[0].date.getTime();
  const end = MILESTONES[MILESTONES.length - 1].date.getTime();
  const percent = ((now.getTime() - start) / (end - start)) * 100;
  return Math.max(0, Math.min(100, percent));
}
