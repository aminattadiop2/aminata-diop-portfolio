interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const authHeader = context.request.headers.get('Authorization');
  if (!authHeader) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as {
      id: string;
      title?: string;
      subtitle?: string;
      content?: string;
      metadata?: string;
    };

    await context.env.DB.prepare(
      `UPDATE sections SET
        title = COALESCE(?, title),
        subtitle = COALESCE(?, subtitle),
        content = COALESCE(?, content),
        metadata = COALESCE(?, metadata),
        updated_at = datetime('now')
      WHERE id = ?`,
    )
      .bind(body.title ?? null, body.subtitle ?? null, body.content ?? null, body.metadata ?? null, body.id)
      .run();

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};
