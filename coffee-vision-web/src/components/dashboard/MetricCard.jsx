export default function MetricCard({ icon, label, value, hint }) {
  return (
    <article className="relative grid gap-2 overflow-hidden rounded-lg border border-line bg-white/95 p-5 shadow-panel">
      <span className="relative z-10 grid h-11 w-11 place-items-center rounded-lg bg-green-soft text-green">
        <i className={icon} aria-hidden="true" />
      </span>
      <p className="relative z-10 font-bold text-muted">{label}</p>
      <strong className="relative z-10 text-3xl leading-none text-coffee">{value ?? "—"}</strong>
      {hint && <small className="relative z-10 text-muted">{hint}</small>}
      <span className="absolute -bottom-6 -right-5 h-[70px] w-[70px] rounded-full bg-green-soft" />
    </article>
  );
}
