interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
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
      title: string;
      description?: string;
      image_url?: string;
      live_url?: string;
      repo_url?: string;
      tags?: string;
      featured?: number;
      sort_order?: number;
    };

    const result = await context.env.DB.prepare(
      `INSERT INTO projects (title, description, image_url, live_url, repo_url, tags, featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        body.title,
        body.description ?? null,
        body.image_url ?? null,
        body.live_url ?? null,
        body.repo_url ?? null,
        body.tags ?? '[]',
        body.featured ?? 0,
        body.sort_order ?? 0,
      )
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
      title?: string;
      description?: string;
      image_url?: string;
      live_url?: string;
      repo_url?: string;
      tags?: string;
      featured?: number;
      sort_order?: number;
    };

    await context.env.DB.prepare(
      `UPDATE projects SET
        title = COALESCE(?, title),
        description = COALESCE(?, description),
        image_url = COALESCE(?, image_url),
        live_url = COALESCE(?, live_url),
        repo_url = COALESCE(?, repo_url),
        tags = COALESCE(?, tags),
        featured = COALESCE(?, featured),
        sort_order = COALESCE(?, sort_order),
        updated_at = datetime('now')
      WHERE id = ?`,
    )
      .bind(
        body.title ?? null,
        body.description ?? null,
        body.image_url ?? null,
        body.live_url ?? null,
        body.repo_url ?? null,
        body.tags ?? null,
        body.featured ?? null,
        body.sort_order ?? null,
        body.id,
      )
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

    await context.env.DB.prepare('DELETE FROM projects WHERE id = ?').bind(Number(id)).run();
    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
};
