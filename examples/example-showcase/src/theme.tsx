import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'fc-showcase-theme';
const USER_SET_KEY = STORAGE_KEY + ':user-set';

type ThemeContextValue = {
    theme: Theme;
    isDark: boolean;
    setTheme: (next: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitial(): Theme {
    if (typeof document === 'undefined') return 'light';
    const fromAttr = document.documentElement.getAttribute('data-fc-theme');
    if (fromAttr === 'light' || fromAttr === 'dark') return fromAttr;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(readInitial);

    useEffect(() => {
        document.documentElement.dataset.fcTheme = theme;
        window.localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    useEffect(() => {
        const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
        const onChange = (e: MediaQueryListEvent) => {
            if (!window.localStorage.getItem(USER_SET_KEY)) {
                setThemeState(e.matches ? 'dark' : 'light');
            }
        };
        mq?.addEventListener?.('change', onChange);
        return () => mq?.removeEventListener?.('change', onChange);
    }, []);

    const setTheme = useCallback((next: Theme) => {
        window.localStorage.setItem(USER_SET_KEY, '1');
        setThemeState(next);
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({ theme, isDark: theme === 'dark', setTheme }),
        [theme, setTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
}
