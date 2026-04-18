import { FastCommentsLiveChatWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsLiveChatWidget } from 'fastcomments-react';

export default function LiveChat() {
  return <FastCommentsLiveChatWidget tenantId="demo" urlId="react-demo-live-chat" />;
}`;

export default function LiveChat() {
  const { isDark } = useTheme();
  return (
    <DemoChrome
      breadcrumb="Widgets / Live Chat"
      title="Live Chat"
      subtitle="The streaming flavor of the core widget. Tuned for live events, launches, and broadcasts where message volume would overwhelm a threaded view."
      tags={[{ label: 'Tenant · demo', brand: true }, { label: 'Mode · streaming' }]}
      code={CODE}
      codeLabel="LiveChat.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsLiveChatWidget tenantId="demo" urlId="react-demo-live-chat" hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
