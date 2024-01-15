const base = import.meta.env.BASE_URL;

export const AppRoutes = {
  base,
  notes: `${base}notes`,
  note: `${base}notes/:id`,
} as const;
