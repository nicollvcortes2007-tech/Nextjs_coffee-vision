"use client";

import Link from "next/link";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { authApi } from "@/features/auth";

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_API_URL) {
        setMessage("La pantalla está en modo demostración. Para enviar el enlace debes conectar el backend de recuperación de contraseña.");
        return;
      }

      await authApi.requestPasswordReset(email.trim());
      setMessage("Si existe una cuenta asociada a ese correo, recibirás instrucciones para restablecer tu contraseña.");
    } catch (requestError) {
      setError(requestError.message || "No fue posible enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Recupera tu contraseña"
      subtitle="Te ayudamos a volver a entrar a tu cuenta"
      backgroundImage="/coffee-tech/cosecha.webp"
    >
      <form onSubmit={submit} className="grid gap-4">
        <p className="text-sm leading-relaxed text-muted">Escribe el correo electrónico asociado a tu cuenta. Si está registrado, recibirás instrucciones para restablecer tu contraseña.</p>

        <label className="grid gap-1.5 text-sm font-semibold text-coffee">
          Correo electrónico
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="min-h-11.5 rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </label>

        {error && <p role="alert" className="rounded-lg border border-danger/20 bg-red-50 px-3 py-2.5 text-sm font-semibold text-danger">{error}</p>}
        {message && <p role="status" className="rounded-lg border border-green/20 bg-green-soft px-3 py-2.5 text-sm leading-relaxed text-green-deep">{message}</p>}

        <button type="submit" disabled={loading} className="mt-1 inline-flex min-h-11.5 items-center justify-center gap-2 rounded-lg bg-green font-bold text-white transition-colors hover:bg-green-deep disabled:cursor-wait disabled:opacity-60">
          <i className="fa-solid fa-paper-plane" aria-hidden="true" />{loading ? "Enviando solicitud…" : "Enviar instrucciones"}
        </button>

        <footer className="pt-1 text-center text-sm">
          <Link href="/login" className="font-semibold text-green hover:text-green-deep"><i className="fa-solid fa-arrow-left mr-1.5" aria-hidden="true" />Volver a iniciar sesión</Link>
        </footer>
      </form>
    </AuthLayout>
  );
}