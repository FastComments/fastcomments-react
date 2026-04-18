import { FastCommentsCommentCountWidget } from 'fastcomments-react';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsCommentCountWidget } from 'fastcomments-react';

export default function CommentCount() {
  return <FastCommentsCommentCountWidget tenantId="demo" urlId="react-demo" />;
}`;

export default function CommentCount() {
  return (
    <DemoChrome
      breadcrumb="Widgets / Comment Count"
      title="Comment Count"
      subtitle="A low-weight count badge for article listings, cards, and feeds. The number stays live as new comments come in."
      tags={[{ label: 'Tenant · demo', brand: true }]}
      code={CODE}
      codeLabel="CommentCount.tsx"
    >
      <div className="fc-stage__panel" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontFamily: 'var(--fc-mono)', fontSize: 12, color: 'var(--fc-ink-mute)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Count rendered →
        </span>
        <div style={{ fontFamily: 'var(--fc-body)', fontSize: 14, color: 'var(--fc-ink)' }}>
          <FastCommentsCommentCountWidget tenantId="demo" urlId="react-demo" />
        </div>
      </div>
    </DemoChrome>
  );
}
