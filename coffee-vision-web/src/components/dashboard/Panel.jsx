export default function Panel({ eyebrow, title, action, className = "", children }) {
  return (
    <article className={`dashboard-panel rounded-lg border border-line bg-white/95 p-5 shadow-panel ${className}`}>
      {(title || action) && (
        <header className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <section>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </section>
          {action}
        </header>
      )}
      {children}
    </article>
  );
}
