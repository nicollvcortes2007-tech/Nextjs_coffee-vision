"use client";

import Link from "next/link";
import { useState } from "react";
import { ROLES } from "@/constants/roles";
import AuthLayout from "@/components/auth/AuthLayout";

const initialForm = {
  nombre: "",
  email: "",
  telefono: "",
  finca: "",
  ubicacion: "",
  codigo_vinculacion: "",
  password: "",
  confirmPassword: "",
};

const inputClass = "min-h-[46px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20";
const labelClass = "grid gap-1.5 text-sm font-semibold text-coffee";

export default function RegistroPage() {
  const [form, setForm] = useState(initialForm);
  const [isEmployee, setIsEmployee] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setError("¡Ups! Las contraseñas no coinciden. Por favor, verifícalas.");
      return;
    }

    setLoading(true);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      if (!base) throw new Error("Configura NEXT_PUBLIC_API_URL para conectar con el servidor.");

      const account = { ...form, rol: isEmployee ? ROLES.EMPLEADO : ROLES.CAFICULTOR };
      delete account.confirmPassword;
      if (isEmployee) {
        delete account.finca;
        delete account.ubicacion;
      } else {
        delete account.codigo_vinculacion;
      }
      const response = await fetch(`${base}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "No se pudo completar el registro.");
      setMessage("¡Cuenta creada! Ya puedes iniciar sesión.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Crear Cuenta" subtitle="Completa tus datos para comenzar con CoffeeTech" backgroundImage="/coffee-tech/registro-fondo.webp">
      <form onSubmit={submit} className="grid gap-4">
        <label className={labelClass}>
          Nombre Completo
          <input type="text" required autoComplete="name" placeholder="Tu nombre" value={form.nombre} onChange={(event) => updateField("nombre", event.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Correo Electrónico
          <input type="email" required autoComplete="email" placeholder="ejemplo@correo.com" value={form.email} onChange={(event) => updateField("email", event.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Teléfono
          <input type="tel" required autoComplete="tel" placeholder="+57 300 123 4567" value={form.telefono} onChange={(event) => updateField("telefono", event.target.value)} className={inputClass} />
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3 text-sm font-semibold text-coffee">
          <input type="checkbox" checked={isEmployee} onChange={(event) => setIsEmployee(event.target.checked)} className="h-4 w-4 accent-[#769f1a]" />
          ¿Eres empleado? Regístrate con el código de tu finca.
        </label>

        {!isEmployee && (
          <>
            <label className={labelClass}>
              Nombre de la Finca
              <input type="text" required placeholder="Ej: Finca El Paraíso" value={form.finca} onChange={(event) => updateField("finca", event.target.value)} className={inputClass} />
            </label>
            <label className={labelClass}>
              Ubicación
              <input type="text" required placeholder="Huila, Colombia" value={form.ubicacion} onChange={(event) => updateField("ubicacion", event.target.value)} className={inputClass} />
            </label>
          </>
        )}

        {isEmployee && (
          <label className={labelClass}>
            Código de invitación de tu finca
            <input type="text" required autoComplete="off" placeholder="Pídele el código al caficultor" value={form.codigo_vinculacion} onChange={(event) => updateField("codigo_vinculacion", event.target.value.trim())} className={inputClass} />
            <span className="text-xs font-normal text-muted">El código te vincula únicamente con la finca que te invitó.</span>
          </label>
        )}

        <label className={labelClass}>
          Contraseña
          <input type="password" required minLength={8} autoComplete="new-password" placeholder="Mínimo 8 caracteres" value={form.password} onChange={(event) => updateField("password", event.target.value)} className={inputClass} />
        </label>

        <label className={labelClass}>
          Confirmar Contraseña
          <input type="password" required autoComplete="new-password" placeholder="Repite tu contraseña" value={form.confirmPassword} onChange={(event) => updateField("confirmPassword", event.target.value)} className={inputClass} />
        </label>

        {error && <p role="alert" className="text-sm font-semibold text-danger">{error}</p>}
        {message && <p role="status" className="text-sm font-semibold text-green-deep">{message} <Link href="/login" className="underline">Iniciar sesión</Link></p>}

        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" required className="mt-1 h-4 w-4" />
          Acepto los términos y condiciones y la política de privacidad
        </label>

        <button type="submit" disabled={loading} className="mt-1 min-h-[46px] rounded-lg bg-green font-bold text-white transition-colors hover:bg-green-deep disabled:opacity-60">
          {loading ? "Creando cuenta…" : "Crear Cuenta"}
        </button>

        <footer className="text-center text-sm text-muted">
          <p>¿Ya tienes cuenta? <Link href="/login" className="font-semibold text-green">Inicia Sesión</Link></p>
        </footer>
      </form>
    </AuthLayout>
  );
}
