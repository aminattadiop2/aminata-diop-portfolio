interface Env {
  DB: D1Database;
}

function checkAuth(request: Request): boolean {
  return !!request.headers.get('Authorization');
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as Record<string, string>;

    const stmts = Object.entries(body).map(([key, value]) =>
      context.env.DB.prepare(
        'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      ).bind(key, typeof value === 'string' ? value : JSON.stringify(value)),
    );

    await context.env.DB.batch(stmts);
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};
