import type { Section, Project, SocialLink } from '../types';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
}

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

// ─── Public reads ───

export const api = {
  getSections: () => safeFetch<Section[]>('/api/sections', []),
  getProjects: () => safeFetch<Project[]>('/api/projects', []),
  getLinks: () => safeFetch<SocialLink[]>('/api/links', []),
  getSettings: () => safeFetch<Record<string, string>>('/api/settings', {}),

  // ─── Admin writes ───

  login: async (password: string) => {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw new Error('Unauthorized');
    return (await res.json()) as { token: string; expires: number };
  },

  updateSection: async (data: { id: string; title?: string; subtitle?: string; content?: string; metadata?: string }) => {
    const res = await fetch('/api/admin/sections', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update section');
  },

  createProject: async (data: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create project');
    return (await res.json()) as { success: boolean; id: number };
  },

  updateProject: async (data: Partial<Project> & { id: number }) => {
    const res = await fetch('/api/admin/projects', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update project');
  },

  deleteProject: async (id: number) => {
    const res = await fetch(`/api/admin/projects?id=${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete project');
  },

  createLink: async (data: Omit<SocialLink, 'id'>) => {
    const res = await fetch('/api/admin/links', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create link');
    return (await res.json()) as { success: boolean; id: number };
  },

  updateLink: async (data: Partial<SocialLink> & { id: number }) => {
    const res = await fetch('/api/admin/links', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update link');
  },

  deleteLink: async (id: number) => {
    const res = await fetch(`/api/admin/links?id=${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!res.ok) throw new Error('Failed to delete link');
  },

  updateSettings: async (data: Record<string, string>) => {
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update settings');
  },
};
