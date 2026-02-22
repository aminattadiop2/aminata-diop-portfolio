import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + offset;
      let current = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveId(current);
    };

    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [sectionIds, offset]);

  return activeId;
}
