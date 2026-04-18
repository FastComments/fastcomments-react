import { useState } from 'react';
import type { ReactNode } from 'react';

type Tag = { label: string; brand?: boolean };

export default function DemoChrome({
  breadcrumb,
  title,
  subtitle,
  tags,
  children,
  code,
  codeLabel,
}: {
  breadcrumb: string;
  title: string;
  subtitle: ReactNode;
  tags?: Tag[];
  children: ReactNode;
  code?: string;
  codeLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (_) {}
  }

  return (
    <div className="fc-demo">
      <header className="fc-demo__head">
        <div>
          <div className="fc-demo__breadcrumb">
            {breadcrumb.split('/')[0].trim()} <em>/ {breadcrumb.split('/')[1]?.trim() ?? title}</em>
          </div>
          <h1 className="fc-demo__title">{title}</h1>
          <p className="fc-demo__subtitle">{subtitle}</p>
        </div>
        {tags && tags.length > 0 && (
          <div className="fc-demo__actions">
            {tags.map((t, i) => (
              <span key={i} className={`fc-tag${t.brand ? ' fc-tag--brand' : ''}`}>{t.label}</span>
            ))}
          </div>
        )}
      </header>
      {children}
      {code && (
        <div className="fc-code-panel">
          <div className="fc-code-panel__head">
            <span className="fc-code-panel__head-label">{codeLabel ?? 'App.tsx'}</span>
            <button type="button" className="fc-code-panel__copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
          <pre className="fc-code-panel__body">{code}</pre>
        </div>
      )}
    </div>
  );
}
