import type { Entry, ViewKey } from '../App';

type HomeProps = {
  entries: Entry[];
  widgets: Entry[];
  flows: Entry[];
  onSelect: (key: ViewKey) => void;
};

export default function Home({ widgets, flows, onSelect }: HomeProps) {
  return (
    <>
      <div className="fc-hero">
        <div>
          <div className="fc-hero__label">fastcomments / react · showcase</div>
          <h1 className="fc-hero__title">
            Comment<br />infrastructure<br /><em>for React.</em>
          </h1>
          <p className="fc-hero__body">
            Every widget and integration flow the React library ships with. Running live against the public demo
            tenant. Use the rail to jump between examples; each view is a pristine implementation you can lift
            directly into production.
          </p>
        </div>

        <div className="fc-hero__meta">
          <div className="fc-meta-card">
            <div className="fc-meta-card__key">Widgets</div>
            <div className="fc-meta-card__value fc-meta-card__value--gradient">{widgets.length}</div>
          </div>
          <div className="fc-meta-card">
            <div className="fc-meta-card__key">Flows</div>
            <div className="fc-meta-card__value">{flows.length}</div>
          </div>
          <div className="fc-meta-card">
            <div className="fc-meta-card__key">Package</div>
            <div className="fc-meta-card__value" style={{ fontFamily: 'var(--fc-mono)', fontSize: 14, marginTop: 10 }}>fastcomments-react</div>
          </div>
          <div className="fc-meta-card">
            <div className="fc-meta-card__key">Runtime</div>
            <div className="fc-meta-card__value" style={{ fontFamily: 'var(--fc-mono)', fontSize: 14, marginTop: 10 }}>CRA · React 18</div>
          </div>
        </div>
      </div>

      <div className="fc-section-title">
        <span>01</span>
        <h2>Widgets</h2>
        <div className="fc-rule" />
        <span>{widgets.length} components</span>
      </div>
      <div className="fc-grid">
        {widgets.map((item, i) => (
          <button
            key={item.key}
            className="fc-card"
            onClick={() => onSelect(item.key)}
            style={{ animation: 'fc-rise 480ms ease both', animationDelay: `${i * 40}ms` }}
          >
            <span className="fc-card__kind">{item.kind}</span>
            <span className="fc-card__title">{item.label}</span>
            <span className="fc-card__hint">{item.hint}</span>
            <span className="fc-card__cta">Open example</span>
          </button>
        ))}
      </div>

      <div className="fc-section-title">
        <span>02</span>
        <h2>Flows &amp; configuration</h2>
        <div className="fc-rule" />
        <span>{flows.length} recipes</span>
      </div>
      <div className="fc-grid">
        {flows.map((item, i) => (
          <button
            key={item.key}
            className="fc-card"
            onClick={() => onSelect(item.key)}
            style={{ animation: 'fc-rise 480ms ease both', animationDelay: `${i * 40}ms` }}
          >
            <span className="fc-card__kind">{item.kind}</span>
            <span className="fc-card__title">{item.label}</span>
            <span className="fc-card__hint">{item.hint}</span>
            <span className="fc-card__cta">Open example</span>
          </button>
        ))}
      </div>
    </>
  );
}
