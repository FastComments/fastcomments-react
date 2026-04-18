import { useEffect, useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import type { FastCommentsSSO } from 'fastcomments-typescript';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { useEffect, useState } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import type { FastCommentsSSO } from 'fastcomments-typescript';

export default function SecureSSO() {
  const [sso, setSSO] = useState<FastCommentsSSO>({
    loginURL: 'https://example.com/login',
    logoutURL: 'https://example.com/logout'
  });

  useEffect(() => {
    // Your server HMAC-signs a base64 payload of the user record
    fetch('/sso-user-info')
      .then((r) => r.json())
      .then((info) => setSSO((s) => ({ ...s, ...info })));
  }, []);

  return (
    <FastCommentsCommentWidget
      tenantId="demo"
      urlId="react-demo-secure-sso"
      sso={sso}
    />
  );
}`;

async function getLoggedInUserInfo(): Promise<Pick<FastCommentsSSO, 'userDataJSONBase64' | 'verificationHash' | 'timestamp'>> {
  const response = await fetch('http://localhost:3003/sso-user-info', {
    headers: { Accept: 'application/json' },
  });
  return await response.json();
}

export default function SecureSSO() {
  const { isDark } = useTheme();
  const [sso, setSSO] = useState<FastCommentsSSO>({
    loginURL: 'https://example.com/login',
    logoutURL: 'https://example.com/logout',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    (async () => {
      setStatus('loading');
      try {
        const userInfo = await getLoggedInUserInfo();
        setSSO((existing) => ({ ...existing, ...userInfo }));
        setStatus('ready');
      } catch {
        setStatus('error');
      }
    })();
  }, []);

  return (
    <DemoChrome
      breadcrumb="Flows / Secure SSO"
      title="Secure SSO"
      subtitle={<>Production-grade identity. Your server HMAC-signs a base64 user payload; the widget verifies it
        before trusting any session. Pair with the{' '}
        <a
          href="https://github.com/fastcomments/fastcomments-code-examples/tree/master/sso/node-express"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--fc-accent-c)', textDecoration: 'underline dashed' }}
        >node-express reference server</a>.</>}
      tags={[{ label: 'Mode · HMAC', brand: true }, { label: `Status · ${status}` }]}
      code={CODE}
      codeLabel="SecureSSO.tsx"
    >
      {status === 'error' && (
        <div className="fc-stage__panel" style={{ borderColor: 'rgba(255, 59, 48, 0.5)', background: 'rgba(255, 59, 48, 0.05)' }}>
          <div style={{ fontFamily: 'var(--fc-mono)', fontSize: 13, color: '#ff8b85' }}>
            Couldn’t reach the example SSO server.<br />
            <span style={{ color: 'var(--fc-ink-mute)' }}>
              Run <code>node-express</code> from <a href="https://github.com/fastcomments/fastcomments-code-examples" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--fc-accent-c)', textDecoration: 'underline dashed' }}>fastcomments-code-examples</a> on port 3003 to continue.
            </span>
          </div>
        </div>
      )}
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsCommentWidget tenantId="demo" urlId="react-demo-secure-sso" sso={sso} hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
