"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROLES } from "@/constants/roles";
import AuthLayout from "@/components/auth/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (process.env.NODE_ENV === "development") {
        const email = form.email.toLowerCase();
        const role = email.includes("admin") ? ROLES.ADMIN : email.includes("empleado") ? ROLES.EMPLEADO : ROLES.CAFICULTOR;
        document.cookie = `token=${encodeURIComponent(`demo-session:${form.email}`)}; path=/; SameSite=Lax`;
        document.cookie = `rol=${encodeURIComponent(role)}; path=/; SameSite=Lax`;
        router.push(getDashboardPath(role));
        return;
      }

      const base = process.env.NEXT_PUBLIC_API_URL;
      if (!base) {
        throw new Error("Configura NEXT_PUBLIC_API_URL para conectar con el servidor.");
      }

      const response = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "No se pudo iniciar sesión.");
      }

      const role = data.rol || data.role;
      const validRoles = [ROLES.CAFICULTOR, ROLES.EMPLEADO, ROLES.ADMIN];
      if (!validRoles.includes(role) || !data.access_token) {
        throw new Error("El servidor no devolvió un rol válido para esta cuenta.");
      }

      document.cookie = `token=${encodeURIComponent(data.access_token)}; path=/; SameSite=Lax`;
      document.cookie = `rol=${encodeURIComponent(role)}; path=/; SameSite=Lax`;

      router.push(getDashboardPath(role));
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  function getDashboardPath(role) {
    if (role === ROLES.EMPLEADO) return "/empleado/dashboard";
    if (role === ROLES.ADMIN) return "/admin";
    return "/dashboard";
  }

  return (
    <AuthLayout
      title="Bienvenido de nuevo"
      subtitle="Ingresa tus credenciales para acceder a tu finca digital"
      backgroundImage="/coffee-tech/login-fondo.webp"
    >
      <form onSubmit={submit} className="grid gap-4">
        <label className="grid gap-1.5 text-sm font-semibold text-coffee">
          Correo Electrónico
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="min-h-[46px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-semibold text-coffee">
          Contraseña
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            className="min-h-[46px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20"
          />
        </label>

        <section className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted">
            <input type="checkbox" className="h-4 w-4" /> Recordarme
          </label>
          <Link
            href="/recuperar-contrasena"
            className="font-semibold text-green hover:text-green-deep"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </section>

        {error && <p role="alert" className="text-sm font-semibold text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 min-h-[46px] rounded-lg bg-green font-bold text-white hover:bg-green-deep disabled:opacity-60"
        >
          {loading ? "Ingresando…" : "Iniciar sesión"}
        </button>

        <footer className="text-center text-sm text-muted">
          <p>
            ¿Aún no tienes cuenta? <Link href="/registro" className="font-semibold text-green">Regístrate aquí</Link>
          </p>
        </footer>
      </form>
    </AuthLayout>
  );
}
