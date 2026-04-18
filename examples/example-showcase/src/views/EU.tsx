import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function EU() {
  return (
    <FastCommentsCommentWidget
      tenantId="demo"
      region="eu"
      urlId="react-demo-eu"
    />
  );
}`;

export default function EU() {
  const { isDark } = useTheme();
  return (
    <DemoChrome
      breadcrumb="Flows / EU Region"
      title="EU Region"
      subtitle={<>Pin widget reads and writes to the EU datacenter to satisfy data-residency requirements. A single
        <code style={{ fontFamily: 'var(--fc-mono)', color: 'var(--fc-ink)', margin: '0 4px' }}>region="eu"</code>
        flag routes everything through the EU cluster.</>}
      tags={[{ label: 'Region · EU', brand: true }, { label: 'GDPR-friendly' }]}
      code={CODE}
      codeLabel="EU.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsCommentWidget tenantId="demo" region="eu" urlId="react-demo-eu" hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
