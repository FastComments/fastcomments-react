import { useRef } from 'react';
import { FastCommentsCollabChatWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { useRef } from 'react';
import { FastCommentsCollabChatWidget } from 'fastcomments-react';

export default function CollabChat() {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <article ref={contentRef}>
        <h2>Highlight any passage to pin a discussion.</h2>
        <p>Selection-anchored realtime chat inside your document.</p>
      </article>
      <FastCommentsCollabChatWidget
        tenantId="demo"
        urlId="react-demo-collab-chat"
        targetRef={contentRef}
      />
    </>
  );
}`;

export default function CollabChat() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

  return (
    <DemoChrome
      breadcrumb="Widgets / Collab Chat"
      title="Collab Chat"
      subtitle="Document-anchored realtime chat. Readers highlight any passage and open a thread pinned to that exact selection. Perfect for docs, drafts, and review flows."
      tags={[{ label: 'Tenant · demo', brand: true }]}
      code={CODE}
      codeLabel="CollabChat.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <div
          ref={contentRef}
          style={{ fontFamily: 'Georgia, serif', color: 'var(--fc-light-panel-ink)', maxWidth: '64ch', margin: '0 auto 32px', lineHeight: 1.7, fontSize: 17 }}
        >
          <h2 style={{ fontFamily: 'var(--fc-display)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em', color: 'var(--fc-light-panel-ink)', marginTop: 0 }}>
            The Rise of Real-Time Collaboration
          </h2>
          <p>
            Real-time collaboration tools have transformed how teams work together. From shared documents to inline
            commenting, the ability to discuss content in context reduces miscommunication and speeds up
            decision-making.
          </p>
          <p>
            FastComments Collab Chat brings this experience to any web page. Users can highlight text and attach
            comments directly to it, creating threaded discussions tied to specific passages.
          </p>
        </div>
        <FastCommentsCollabChatWidget
          tenantId="demo"
          urlId="react-demo-collab-chat"
          targetRef={contentRef}
          hasDarkBackground={isDark}
        />
      </div>
    </DemoChrome>
  );
}
