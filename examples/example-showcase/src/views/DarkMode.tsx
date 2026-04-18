import { useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function DarkMode() {
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <button onClick={() => setIsDark(false)}>Light</button>
      <button onClick={() => setIsDark(true)}>Dark</button>
      <FastCommentsCommentWidget
        tenantId="demo"
        urlId="react-demo-dark"
        hasDarkBackground={isDark}
      />
    </>
  );
}`;

export default function DarkMode() {
  const { isDark: themeIsDark } = useTheme();
  const [isDark, setIsDark] = useState(themeIsDark);

  return (
    <DemoChrome
      breadcrumb="Flows / Dark Mode"
      title="Dark Mode"
      subtitle={<>Toggle the widget theme at runtime. The widget re-renders immediately when
        <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)', margin: '0 4px' }}>hasDarkBackground</code>
        changes.</>}
      tags={[{ label: `Active · ${isDark ? 'dark' : 'light'}`, brand: true }]}
      code={CODE}
      codeLabel="DarkMode.tsx"
    >
      <div className="fc-stage__panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 10, paddingBottom: 16, boxShadow: 'inset 0 -1px 0 0 var(--fc-border)', marginBottom: 20 }}>
          <button className={`fc-btn${!isDark ? ' fc-btn--primary' : ''}`} onClick={() => setIsDark(false)}>Light</button>
          <button className={`fc-btn${isDark ? ' fc-btn--primary' : ''}`} onClick={() => setIsDark(true)}>Dark</button>
        </div>
        <div style={{
          padding: 24,
          borderRadius: 12,
          transition: 'background 250ms ease, color 250ms ease',
          background: isDark ? '#0b0b0b' : '#ffffff',
          color: isDark ? '#fff' : '#111',
        }}>
          <FastCommentsCommentWidget tenantId="demo" urlId="react-demo-dark" hasDarkBackground={isDark} />
        </div>
      </div>
    </DemoChrome>
  );
}
