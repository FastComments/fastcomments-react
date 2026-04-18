import { useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import type { FastCommentsSSOSimple } from 'fastcomments-typescript';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsCommentWidget } from 'fastcomments-react';
import type { FastCommentsSSOSimple } from 'fastcomments-typescript';

export default function SimpleSSO() {
  const simpleSSO: FastCommentsSSOSimple = {
    username: 'Someone',
    email: 'someone@somewhere.com',
    avatar: 'https://example.com/avatar.jpg'
  };
  return (
    <FastCommentsCommentWidget
      tenantId="demo"
      urlId="react-demo-simple-sso"
      simpleSSO={simpleSSO}
    />
  );
}`;

export default function SimpleSSO() {
  const { isDark } = useTheme();
  const [simpleSSO] = useState<FastCommentsSSOSimple>({
    avatar: 'https://staticm.fastcomments.com/1582299581264-69384190_3015192525174365_476457575596949504_o.jpg',
    email: 'someone@somewhere.com',
    username: 'Someone',
    websiteUrl: 'https://blog.fastcomments.com',
  });

  return (
    <DemoChrome
      breadcrumb="Flows / Simple SSO"
      title="Simple SSO"
      subtitle="The zero-backend identity flow. Hand the widget a user object with a username and optional metadata. The account is created or updated on first comment."
      tags={[{ label: 'Mode · Simple', brand: true }, { label: `User · ${simpleSSO.username ?? ''}` }]}
      code={CODE}
      codeLabel="SimpleSSO.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsCommentWidget tenantId="demo" urlId="react-demo-simple-sso" simpleSSO={simpleSSO} hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
