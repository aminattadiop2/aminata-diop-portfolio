interface Env {
  DB?: D1Database;
  aminata_diop_db?: D1Database;
  [key: string]: unknown;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (!context.env.DB && context.env.aminata_diop_db) {
    (context.env as Record<string, unknown>).DB = context.env.aminata_diop_db;
  }
  return context.next();
};
