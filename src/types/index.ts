export interface Section {
  id: string;
  title: string;
  subtitle: string | null;
  content: string | null;
  metadata: string | null;
  updated_at: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  live_url: string | null;
  repo_url: string | null;
  tags: string;
  featured: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
  sort_order: number;
}

export interface SiteSettings {
  key: string;
  value: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
}

export interface HeroMeta {
  roles: string[];
  cta_text?: string;
  cta_url?: string;
  cv_url?: string;
}

export interface AdminAuth {
  token: string;
  expires: number;
}
