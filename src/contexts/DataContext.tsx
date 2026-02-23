import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Section, Project, SocialLink, SkillCategory } from '../types';
import {
  defaultSections, defaultProjects, defaultLinks, defaultSkillCategories,
  defaultPublication, resumeContact, resumeExperiences, resumeEducation,
  resumeLanguages, resumeAtouts,
  type Publication, type ResumeExperience, type ResumeEducation,
  type ResumeLanguage, type ResumeAtout,
} from '../data/defaults';
import { api } from '../services/api';

export interface SiteData {
  sections: Record<string, Section>;
  projects: Project[];
  links: SocialLink[];
  skillCategories: SkillCategory[];
  publication: Publication;
  resumeContact: { profile: string; email: string; location: string; phone: string };
  resumeExperiences: ResumeExperience[];
  resumeEducation: ResumeEducation[];
  resumeLanguages: ResumeLanguage[];
  resumeAtouts: ResumeAtout[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const defaultData: SiteData = {
  sections: { ...defaultSections },
  projects: [...defaultProjects],
  links: [...defaultLinks],
  skillCategories: [...defaultSkillCategories],
  publication: { ...defaultPublication },
  resumeContact: { ...resumeContact },
  resumeExperiences: [...resumeExperiences],
  resumeEducation: [...resumeEducation],
  resumeLanguages: [...resumeLanguages],
  resumeAtouts: [...resumeAtouts],
  loading: true,
  refresh: async () => {},
};

const DataContext = createContext<SiteData>(defaultData);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Omit<SiteData, 'refresh' | 'loading'>>(() => ({
    sections: { ...defaultSections },
    projects: [...defaultProjects],
    links: [...defaultLinks],
    skillCategories: [...defaultSkillCategories],
    publication: { ...defaultPublication },
    resumeContact: { ...resumeContact },
    resumeExperiences: [...resumeExperiences],
    resumeEducation: [...resumeEducation],
    resumeLanguages: [...resumeLanguages],
    resumeAtouts: [...resumeAtouts],
  }));
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [sections, projects, links, settings] = await Promise.all([
        api.getSections(),
        api.getProjects(),
        api.getLinks(),
        api.getSettings(),
      ]);

      setData((prev) => {
        const next = { ...prev };

        if (sections.length > 0) {
          const map: Record<string, Section> = {};
          for (const s of sections) map[s.id] = s;
          next.sections = { ...defaultSections, ...map };

          const skillsMeta = map.skills?.metadata;
          if (skillsMeta) {
            try {
              const parsed = JSON.parse(skillsMeta);
              if (parsed.categories) next.skillCategories = parsed.categories;
            } catch { /* keep defaults */ }
          }
        }

        if (projects.length > 0) next.projects = projects;
        if (links.length > 0) next.links = links;

        if (settings.publication) {
          try { next.publication = JSON.parse(settings.publication); } catch { /* keep defaults */ }
        }
        if (settings.resumeContact) {
          try { next.resumeContact = JSON.parse(settings.resumeContact); } catch { /* keep defaults */ }
        }
        if (settings.resumeExp) {
          try { next.resumeExperiences = JSON.parse(settings.resumeExp); } catch { /* keep defaults */ }
        }
        if (settings.resumeEdu) {
          try { next.resumeEducation = JSON.parse(settings.resumeEdu); } catch { /* keep defaults */ }
        }
        if (settings.resumeLang) {
          try { next.resumeLanguages = JSON.parse(settings.resumeLang); } catch { /* keep defaults */ }
        }
        if (settings.resumeAtouts) {
          try { next.resumeAtouts = JSON.parse(settings.resumeAtouts); } catch { /* keep defaults */ }
        }

        return next;
      });
    } catch {
      // API unreachable (local dev with vite only) — keep defaults
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return (
    <DataContext.Provider value={{ ...data, loading, refresh }}>
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(DataContext);
}
