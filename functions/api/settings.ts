interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare('SELECT * FROM settings').all();
    const map: Record<string, string> = {};
    for (const row of results as { key: string; value: string }[]) {
      map[row.key] = row.value;
    }
    return Response.json(map);
  } catch {
    return Response.json({ error: 'Database not configured' }, { status: 500 });
  }
};
