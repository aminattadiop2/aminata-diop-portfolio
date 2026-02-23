interface Env {
  DB: D1Database;
}

function checkAuth(request: Request): boolean {
  return !!request.headers.get('Authorization');
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as {
      platform: string;
      url: string;
      icon?: string;
      sort_order?: number;
    };

    const result = await context.env.DB.prepare(
      'INSERT INTO links (platform, url, icon, sort_order) VALUES (?, ?, ?, ?)',
    )
      .bind(body.platform, body.url, body.icon ?? 'Mail', body.sort_order ?? 0)
      .run();

    return Response.json({ success: true, id: result.meta.last_row_id });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};

export const onRequestPut: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await context.request.json()) as {
      id: number;
      platform?: string;
      url?: string;
      icon?: string;
      sort_order?: number;
    };

    await context.env.DB.prepare(
      `UPDATE links SET
        platform = COALESCE(?, platform),
        url = COALESCE(?, url),
        icon = COALESCE(?, icon),
        sort_order = COALESCE(?, sort_order)
      WHERE id = ?`,
    )
      .bind(body.platform ?? null, body.url ?? null, body.icon ?? null, body.sort_order ?? null, body.id)
      .run();

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  if (!checkAuth(context.request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get('id');
    if (!id) return Response.json({ error: 'Missing id' }, { status: 400 });

    await context.env.DB.prepare('DELETE FROM links WHERE id = ?').bind(Number(id)).run();
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};
