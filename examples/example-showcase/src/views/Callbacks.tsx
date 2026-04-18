import { useState, useMemo } from 'react';
import { FastCommentsCommentWidget } from 'fastcomments-react';
import { useTheme } from '../theme';
import DemoChrome from './_DemoChrome';

const CODE = `import { FastCommentsCommentWidget } from 'fastcomments-react';

export default function Callbacks() {
  return (
    <FastCommentsCommentWidget
      tenantId="demo"
      urlId="react-demo-callbacks"
      onInit={() => console.log('onInit')}
      onRender={() => console.log('onRender')}
      onCommentsRendered={(comments) => console.log('rendered', comments.length)}
      commentCountUpdated={(count) => console.log('count', count)}
      onAuthenticationChange={(event, data) => console.log(event, data)}
      onReplySuccess={(comment) => console.log('reply', comment)}
      onVoteSuccess={(c, voteId, direction) => console.log('vote', direction)}
      onCommentSubmitStart={(comment, continueFn) => continueFn()}
    />
  );
}`;

type Event = { id: number; name: string; payload: string; at: string };

export default function Callbacks() {
  const [events, setEvents] = useState<Event[]>([]);
  const { isDark } = useTheme();

  const track = useMemo(() => {
    let seq = 0;
    return (name: string, payload: unknown) => {
      const pretty = typeof payload === 'string' ? payload : JSON.stringify(payload).slice(0, 220);
      setEvents((prev) => [{ id: ++seq, name, payload: pretty, at: new Date().toLocaleTimeString() }, ...prev].slice(0, 40));
      console.log(`Callback: ${name}`, payload);
    };
  }, []);

  const handlers = useMemo(() => ({
    onInit: () => track('onInit', ''),
    onRender: () => track('onRender', ''),
    onCommentsRendered: (comments: unknown[]) => track('onCommentsRendered', `${comments.length} comments`),
    commentCountUpdated: (count: number) => track('commentCountUpdated', `count=${count}`),
    onAuthenticationChange: (event: string, data: unknown) => track('onAuthenticationChange', { event, data }),
    onReplySuccess: (comment: unknown) => track('onReplySuccess', comment),
    onVoteSuccess: (_comment: unknown, voteId: string, direction: string, status: string) =>
      track('onVoteSuccess', { voteId, direction, status }),
    onImageClicked: (src: string) => track('onImageClicked', src),
    onOpenProfile: (context: unknown) => { track('onOpenProfile', context); return false; },
    onUserBlocked: (userId: string, _c: unknown, isBlocked: boolean) => track('onUserBlocked', { userId, isBlocked }),
    onCommentFlagged: (userId: string, _c: unknown, isFlagged: boolean) => track('onCommentFlagged', { userId, isFlagged }),
    onCommentEdited: (userId: string, comment: unknown) =>
      track('onCommentEdited', { userId, id: (comment as { _id?: string })._id }),
    onCommentDeleted: (userId: string, comment: unknown) =>
      track('onCommentDeleted', { userId, id: (comment as { _id?: string })._id }),
    onCommentSubmitStart: (_comment: unknown, continueSubmitFn: () => void) => {
      track('onCommentSubmitStart', _comment);
      continueSubmitFn();
    },
  }), [track]);

  return (
    <DemoChrome
      breadcrumb="Flows / Event Callbacks"
      title="Event Callbacks"
      subtitle="Every lifecycle and user-action hook the widget fires, mirrored live in an event log. Handy for wiring analytics, audit trails, or custom submission gates."
      tags={[{ label: 'Tenant · demo', brand: true }, { label: `Events · ${events.length}` }]}
      code={CODE}
      codeLabel="Callbacks.tsx"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(280px, 0.9fr)', gap: 18 }}>
        <div className="fc-stage__panel fc-stage__panel--light" style={{ minWidth: 0 }}>
          <FastCommentsCommentWidget
            tenantId="demo"
            urlId="react-demo-callbacks"
            hasDarkBackground={isDark}
            {...handlers}
          />
        </div>
        <div className="fc-stage__panel" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--fc-mono)', fontSize: 10.5, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fc-ink-mute)' }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#27be69', marginRight: 8 }} />
              Event log
            </span>
            <button className="fc-btn" style={{ padding: '6px 12px', fontSize: 11 }} onClick={() => setEvents([])}>clear</button>
          </div>
          <div className="fc-log">
            {events.length === 0 && <span className="fc-log__line">&gt; waiting for events...</span>}
            {events.map((e) => (
              <span key={e.id} className="fc-log__line fc-log__line--in">
                [{e.at}] {e.name} <span style={{ color: 'var(--fc-ink-mute)' }}>· {e.payload}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </DemoChrome>
  );
}
