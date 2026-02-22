interface Env {
  ADMIN_PASSWORD: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { password } = (await context.request.json()) as { password: string };
  const expected = context.env.ADMIN_PASSWORD || 'admin123';

  if (password !== expected) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = btoa(`${Date.now()}:${crypto.randomUUID()}`);
  return Response.json({ token, expires: Date.now() + 3600000 });
};
