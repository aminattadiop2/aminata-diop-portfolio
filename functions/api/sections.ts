interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const id = url.searchParams.get('id');

  try {
    if (id) {
      const row = await context.env.DB.prepare('SELECT * FROM sections WHERE id = ?').bind(id).first();
      if (!row) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json(row);
    }

    const { results } = await context.env.DB.prepare('SELECT * FROM sections').all();
    return Response.json(results);
  } catch {
    return Response.json({ error: 'Database not configured' }, { status: 500 });
  }
};
