import { createRef } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { createRef } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function OpenProfile() {
  const ref = createRef<FastCommentsCommentWidget>();
  return (
    <>
      <button onClick={() => ref.current?.lastWidgetInstance?.openProfile({ userId: 'demo' })}>
        Open profile
      </button>
      <FastCommentsCommentWidget ref={ref} tenantId="demo" urlId="react-demo" />
    </>
  );
}`;

export default function OpenProfile() {
  const ref = createRef<FastCommentsCommentWidget>();
  const { isDark } = useTheme();

  return (
    <DemoChrome
      breadcrumb="Flows / Open Profile"
      title="Open User Profile Programmatically"
      subtitle="Reach into the widget’s imperative API to open the user-profile drawer from anywhere in your app. Perfect for custom @-mention pickers, admin actions, or support flows."
      tags={[{ label: 'API · imperative', brand: true }]}
      code={CODE}
      codeLabel="OpenProfile.tsx"
    >
      <div className="fc-stage__panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 10, paddingBottom: 16, boxShadow: 'inset 0 -1px 0 0 var(--fc-border)', marginBottom: 20 }}>
          <button
            className="fc-btn fc-btn--primary"
            onClick={() => ref.current?.lastWidgetInstance?.openProfile({ userId: 'demo' })}
          >
            Open example profile
          </button>
        </div>
        <div className="fc-stage__panel fc-stage__panel--light" style={{ padding: 20 }}>
          <FastCommentsCommentWidget ref={ref} tenantId="demo" urlId="react-demo-open-profile" hasDarkBackground={isDark} />
        </div>
      </div>
    </DemoChrome>
  );
}
