import { createContext, useContext, useState, useEffect } from 'react';
import { uiService } from '../services/api';

const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadConfig = async () => {
    try {
      const response = await uiService.getActiveConfig();
      const data = response.data;
      if (data) {
        setConfig(data);
        applyTheme(data);
      }
    } catch (error) {
      console.error('Failed to load UI configuration:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyTheme = (data) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', data.primary_color || '#6366f1');
    root.style.setProperty('--color-secondary', data.secondary_color || '#4f46e5');
    root.style.setProperty('--color-bg', data.background_color || '#0f172a');
    root.style.setProperty('--color-text', data.text_color || '#f8fafc');

    // Update favicon
    if (data.favicon_url) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = data.favicon_url;
    }

    // Update title if label exists
    if (data.labels?.site_title) {
      document.title = data.labels.site_title;
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  return (
    <UIContext.Provider value={{ config, loading, reloadConfig: loadConfig }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
