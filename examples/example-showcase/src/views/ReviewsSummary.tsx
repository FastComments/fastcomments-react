import { FastCommentsReviewsSummaryWidget } from 'fastcomments-react';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsReviewsSummaryWidget } from 'fastcomments-react';

export default function ReviewsSummary() {
  return <FastCommentsReviewsSummaryWidget tenantId="demo" urlId="demo-ratings" />;
}`;

export default function ReviewsSummary() {
  return (
    <DemoChrome
      breadcrumb="Widgets / Reviews Summary"
      title="Reviews Summary"
      subtitle="A compact star-rating aggregate with per-rating breakdown. Drops into product pages, listing previews, and marketing components wherever sentiment beats individual comments."
      tags={[{ label: 'Tenant · demo', brand: true }]}
      code={CODE}
      codeLabel="ReviewsSummary.tsx"
    >
      <div className="fc-stage__panel fc-stage__panel--light">
        <FastCommentsReviewsSummaryWidget tenantId="demo" urlId="demo-ratings" />
      </div>
    </DemoChrome>
  );
}
