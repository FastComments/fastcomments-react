import { useRef } from 'react';
import { FastCommentsImageChatWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { useRef } from 'react';
import { FastCommentsImageChatWidget } from 'fastcomments-react';

export default function ImageChat() {
  const ref = useRef<HTMLImageElement>(null);
  return (
    <>
      <img ref={ref} src="/demo.jpg" alt="" />
      <FastCommentsImageChatWidget
        tenantId="demo"
        urlId="react-demo-image-chat"
        targetRef={ref}
      />
    </>
  );
}`;

export default function ImageChat() {
  const contentRef = useRef<HTMLImageElement>(null);
  const { isDark } = useTheme();

  return (
    <DemoChrome
      breadcrumb="Widgets / Image Chat"
      title="Image Chat"
      subtitle="Drag to select any region of the image. A threaded discussion gets pinned to that region. Ideal for design reviews, bug triage, and creative collaboration."
      tags={[{ label: 'Tenant · demo', brand: true }]}
      code={CODE}
      codeLabel="ImageChat.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <img
          ref={contentRef}
          src="https://fastcomments.com/images/image-chat-demo-1.jpg"
          alt="Demo Image"
          style={{ maxWidth: '100%', borderRadius: 12, display: 'block', margin: '0 auto 20px' }}
        />
        <FastCommentsImageChatWidget tenantId="demo" urlId="react-demo-image-chat" targetRef={contentRef} hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
