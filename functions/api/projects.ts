interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { results } = await context.env.DB.prepare(
      'SELECT * FROM projects ORDER BY sort_order ASC',
    ).all();
    return Response.json(results);
  } catch {
    return Response.json({ error: 'Database not configured' }, { status: 500 });
  }
};
