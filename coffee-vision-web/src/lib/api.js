const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const item = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  return item ? decodeURIComponent(item.slice(name.length + 1)) : "";
}

export function isDemoSession() {
  return getCookie("token").startsWith("demo-session:");
}

const demoSeeds = {
  "/cultivos": [
    { id: 1, nombre: "La Esperanza", variedad: "Castillo", estado: "Producción", area_hectareas: 1.8 },
    { id: 2, nombre: "El Mirador", variedad: "Caturra", estado: "Floración", area_hectareas: 1.2 },
    { id: 3, nombre: "Los Pinos", variedad: "Colombia", estado: "Crecimiento", area_hectareas: 0.9 },
  ],
  "/actividades": [
    { id: 1, tipo: "Monitoreo de broca", cultivo_nombre: "La Esperanza", fecha: "2026-11-08", notas: "Sin afectación crítica" },
    { id: 2, tipo: "Fertilización", cultivo_nombre: "El Mirador", fecha: "2026-11-06", notas: "Abono orgánico" },
  ],
  "/contenidos": [
    { id: 1, titulo: "Germinación y trasplante", categoria: "Ciclo de vida del cultivo", duracion_minutos: 8, actualizado_en: "2026-10-20" },
    { id: 2, titulo: "Desarrollo vegetativo", categoria: "Ciclo de vida del cultivo", duracion_minutos: 6, actualizado_en: "2026-10-15" },
    { id: 3, titulo: "Floración", categoria: "Ciclo de vida del cultivo", duracion_minutos: 5, actualizado_en: "2026-10-09" },
    { id: 4, titulo: "Formación del grano", categoria: "Ciclo de vida del cultivo", duracion_minutos: 7, actualizado_en: "2026-10-02" },
    { id: 5, titulo: "Maduración y cosecha", categoria: "Ciclo de vida del cultivo", duracion_minutos: 10, actualizado_en: "2026-09-25" },
    { id: 6, titulo: "Manejo integrado de plagas", categoria: "Plagas", duracion_minutos: 8, actualizado_en: "2026-09-20" },
    { id: 7, titulo: "Nutrición del cultivo", categoria: "Nutrición", duracion_minutos: 6, actualizado_en: "2026-09-15" },
  ],
  "/notificaciones": [
    { id: 1, titulo: "Alerta de Plaga Detectada", mensaje: "El sistema de IA detectó un posible brote de Roya en el Lote 3. Se recomienda inspección inmediata.", creada_en: "Hace 15 minutos", leida: false, critica: true, icon: "🚨" },
    { id: 2, titulo: "Alerta Meteorológica: Lluvias Fuertes", mensaje: "Se pronostican precipitaciones altas en Popayán para las próximas 48 horas.", creada_en: "Hace 2 horas", leida: false, icon: "🌧️" },
    { id: 3, titulo: "Reporte Mensual Generado", mensaje: "El informe de rendimiento y estadísticas de cosecha ya está disponible.", creada_en: "Ayer", leida: true, icon: "📊" },
    { id: 4, titulo: "Sugerencia de Fertilización", mensaje: "La humedad del suelo indica que es buen momento para aplicar el abonado programado.", creada_en: "Hace 3 días", leida: true, icon: "🌱" },
  ],
  "/recomendaciones": [
    { id: 1, titulo: "Monitorear frutos", lote: "La Esperanza", prioridad: "Alta", fecha: "2026-11-10" },
    { id: 2, titulo: "Revisar humedad del suelo", lote: "El Mirador", prioridad: "Media", fecha: "2026-11-11" },
  ],
  "/empleados": [
    { id: 1, nombre: "Juan Pérez", email: "empleado@finca.co", estado: "Activo", fecha_vinculacion: "2026-08-12" },
  ],
  "/admin/usuarios": [
    { id: 1, nombre: "María Gómez", email: "caficultor@finca.co", rol: "caficultor", estado: "Activo", creado_en: "2026-07-12" },
    { id: 2, nombre: "Juan Pérez", email: "empleado@finca.co", rol: "empleado", estado: "Activo", creado_en: "2026-08-12" },
  ],
  "/admin/contenidos": [],
  "/admin/plagas-ia": [],
};

function demoStoreKey(path) {
  return `coffee-vision-demo-v2:${path}`;
}

function readDemoCollection(path) {
  if (typeof window === "undefined") return demoSeeds[path] ?? [];
  try {
    const stored = window.localStorage.getItem(demoStoreKey(path));
    return stored ? JSON.parse(stored) : demoSeeds[path] ?? [];
  } catch {
    return demoSeeds[path] ?? [];
  }
}

function writeDemoCollection(path, rows) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(demoStoreKey(path), JSON.stringify(rows));
  }
}

function demoApi(path, options = {}) {
  const url = new URL(path, "http://coffee-vision.local");
  const pathname = url.pathname.replace(/\/$/, "") || "/";
  const method = (options.method ?? "GET").toUpperCase();
  const body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
  const collectionPath = pathname.match(/^\/(?:cultivos|actividades|contenidos|notificaciones|recomendaciones|empleados)(?=\/|$)/)?.[0]
    ?? pathname.match(/^\/admin\/(?:usuarios|contenidos|plagas-ia)(?=\/|$)/)?.[0];

  if (pathname === "/plagas-ia/analizar") return { estado: "Recibida para análisis", diagnostico: "Muestra cargada", recomendacion: "Revisa el resultado con un técnico agrícola." };
  if (pathname.startsWith("/chatbot/")) {
    const question = body?.pregunta ?? "";
    return { respuesta: `Gracias por tu consulta${question ? ` sobre “${question}”` : ""}. En el modo local, revisa el lote y registra cualquier cambio para dar seguimiento.` };
  }
  if (pathname === "/reportes/resumen") {
    return { actividades_total: 36, cosecha_kg: 840, lotes_atendidos: 3, alertas_resueltas: 5, produccion: [{ periodo: "Sem 1", kilogramos: 150 }, { periodo: "Sem 2", kilogramos: 185 }, { periodo: "Sem 3", kilogramos: 210 }, { periodo: "Sem 4", kilogramos: 195 }] };
  }
  if (pathname === "/reportes/exportar") return "fecha,actividad,lote\n2026-11-08,Monitoreo de broca,La Esperanza";
  if (pathname === "/auth/me") return { nombre: "Usuario Coffee Vision", email: "usuario@finca.co", rol: getCookie("rol") };
  if (pathname === "/admin/dashboard") return { usuarios_total: 248, fincas_total: 86, alertas_abiertas: 17, produccion_reportada: "18.4 t", actividad_reciente: [], fincas_recientes: [], alertas: [] };

  if (collectionPath) {
    const rows = readDemoCollection(collectionPath);
    const idMatch = pathname.match(new RegExp(`^${collectionPath}/([^/]+)$`));
    if (method === "GET") {
      if (idMatch) return rows.find((row) => String(row.id) === idMatch[1]) ?? rows[0] ?? null;
      return rows;
    }
    if (method === "POST") {
      const created = { id: Date.now(), ...body, estado: body?.estado ?? "Activo" };
      const updated = [...rows, created];
      writeDemoCollection(collectionPath, updated);
      return created;
    }
    if (method === "PUT" || method === "PATCH") {
      const updated = rows.map((row) => String(row.id) === idMatch?.[1] ? { ...row, ...body } : row);
      writeDemoCollection(collectionPath, updated);
      return updated.find((row) => String(row.id) === idMatch?.[1]) ?? body;
    }
    if (method === "DELETE") {
      writeDemoCollection(collectionPath, rows.filter((row) => String(row.id) !== idMatch?.[1]));
      return { success: true };
    }
  }

  return method === "GET" ? [] : { success: true };
}

export async function api(path, options = {}) {
  if (!API_URL) {
    if (process.env.NODE_ENV === "development") return demoApi(path, options);
    throw new Error("Falta NEXT_PUBLIC_API_URL. Configura la URL de FastAPI en .env.local.");
  }

  const token = getCookie("token");
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") return demoApi(path, options);
    throw error;
  }

  const contentType = response.headers.get("content-type") || "";
  const result = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof result === "object" ? result.detail || result.message : result;
    throw new Error(message || `La solicitud falló (${response.status}).`);
  }

  return result;
}

export const http = {
  get: (path) => api(path),
  post: (path, body) => api(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => api(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => api(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => api(path, { method: "DELETE" }),
};
