import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function CommentsPage() {
  return <FastCommentsCommentWidget tenantId="demo" urlId="react-demo" />;
}`;

export default function CommentWidget() {
  const { isDark } = useTheme();
  return (
    <DemoChrome
      breadcrumb="Widgets / Live Comment Widget"
      title="Live Comment Widget"
      subtitle="The flagship live commenting widget. Replies, voting, moderation, media attachments, and realtime sync come bundled in the default configuration."
      tags={[{ label: 'Tenant · demo', brand: true }, { label: 'urlId · react-demo' }]}
      code={CODE}
      codeLabel="CommentWidget.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsCommentWidget tenantId="demo" urlId="react-demo" hasDarkBackground={isDark} />
      </div>
    </DemoChrome>
  );
}
