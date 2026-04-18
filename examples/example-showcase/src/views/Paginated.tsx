import { useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function Paginated() {
  const [page, setPage] = useState(0);
  return (
    <>
      <button onClick={() => setPage(page - 1)}>Prev</button>
      <button onClick={() => setPage(page + 1)}>Next</button>
      <FastCommentsCommentWidget
        tenantId="demo"
        urlId={\`product-\${page}\`}
      />
    </>
  );
}`;

export default function Paginated() {
  const [page, setPage] = useState(0);
  const { isDark } = useTheme();
  const urlId = `react-demo-page-${page}`;

  return (
    <DemoChrome
      breadcrumb="Flows / Thread Pagination"
      title="Thread Pagination"
      subtitle={<>Swap the widget’s
        <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)', margin: '0 4px' }}>urlId</code>
        at runtime to jump between products, posts, or pages. Threads provision lazily. No pre-creation needed.</>}
      tags={[{ label: `Page · ${page}`, brand: true }, { label: `urlId · ${urlId}` }]}
      code={CODE}
      codeLabel="Paginated.tsx"
    >
      <div className="fc-stage__panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 14, boxShadow: 'inset 0 -1px 0 0 var(--fc-border)', marginBottom: 20, flexWrap: 'wrap' }}>
          <button className="fc-btn" onClick={() => setPage(page - 1)}>← prev</button>
          <button className="fc-btn fc-btn--primary" onClick={() => setPage(page + 1)}>next →</button>
          <div style={{ fontFamily: 'var(--fc-mono)', fontSize: 13, color: 'var(--fc-ink-dim)', marginLeft: 'auto' }}>
            <span style={{ color: 'var(--fc-ink-mute)' }}>page </span>
            <span style={{ color: 'var(--fc-ink)' }}>{page}</span>
          </div>
        </div>
        <div className="fc-stage__panel fc-stage__panel--light" style={{ padding: 20 }}>
          <FastCommentsCommentWidget tenantId="demo" urlId={urlId} hasDarkBackground={isDark} />
        </div>
      </div>
    </DemoChrome>
  );
}
