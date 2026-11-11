import Link from "next/link";

export default function AuthLayout({ title, subtitle, backgroundImage, children }) {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage:
          `linear-gradient(rgba(251, 250, 247, .68), rgba(238, 244, 228, .74)), url('${backgroundImage}')`,
      }}
    >
      <article className="w-full max-w-md rounded-lg border border-line bg-surface p-8 shadow-panel">
        <header className="mb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            className="mb-2 self-start text-sm font-semibold text-muted hover:text-coffee"
          >
            <i className="fa-solid fa-arrow-left mr-1.5" aria-hidden="true" />
            Volver
          </Link>
          <img
            src="/coffee-tech/logo2.png"
            alt="Coffee+Visión"
            className="mb-3 h-24 w-auto object-contain"
          />
          <h1 className="text-2xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{subtitle}</p>
        </header>
        {children}
      </article>
    </main>
  );
}
