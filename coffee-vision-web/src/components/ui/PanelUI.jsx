export function PageHeader({ eyebrow, title, description, action }) {
  return (
    <header className="page-heading">
      <section>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
      </section>
      {action && <aside className="page-action">{action}</aside>}
    </header>
  );
}

export function MetricCard({ icon, label, value, note, tone = "green" }) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`} aria-hidden="true">{icon}</span>
      <span className="stat-label">{label}</span>
      <strong className="stat-value">{value ?? "—"}</strong>
      {note && <small className="stat-note">{note}</small>}
    </article>
  );
}

export function RequestState({ loading, error, onRetry }) {
  if (loading) return <p className="request-state">Cargando información…</p>;
  if (!error) return null;

  return (
    <aside className="request-error" role="alert">
      <p>{error}</p>
      <button className="button button-outline" onClick={onRetry}>Intentar de nuevo</button>
    </aside>
  );
}

export function DataTable({ columns, rows, empty = "Aún no hay registros." }) {
  return (
    <section className="table-scroll">
      <table className="data-table">
        <thead>
          <tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows?.length ? rows.map((row, index) => (
            <tr key={row.id ?? index}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row) : row[column.key] ?? "—"}
                </td>
              ))}
            </tr>
          )) : (
            <tr><td className="empty-cell" colSpan={columns.length}>{empty}</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
