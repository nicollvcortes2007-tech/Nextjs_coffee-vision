import { http, isDemoSession } from "@/lib/api";

const demoDashboards = {
  farmer: {
    finca_nombre: "Finca El Paraíso",
    salud_cultivo: 82,
    lotes_activos: 8,
    cultivos_en_floracion: 2,
    empleados_activos: 4,
    actividades_mes: 36,
    alertas_activas: 2,
    cosecha_estimada: "840 kg",
    labores_pendientes: 5,
    produccion_semana: "210 kg",
    variacion_produccion: "+14 % vs semana anterior",
    alertas_atendidas: 2,
    resumen_labores: "Riego, poda y control",
    actividad_semanal: [
      { semana: "Sem 1", total: 18 },
      { semana: "Sem 2", total: 25 },
      { semana: "Sem 3", total: 21 },
      { semana: "Sem 4", total: 32 },
      { semana: "Sem 5", total: 36 },
      { semana: "Sem 6", total: 29 },
    ],
    alertas: [
      { titulo: "Revisar humedad del suelo", lote: "Lote La Esperanza", prioridad: "media" },
      { titulo: "Monitoreo preventivo de roya", lote: "Lote El Mirador", prioridad: "alta" },
    ],
    recomendaciones: [
      { icon: "fa-bug", titulo: "Revisar frutos perforados", detalle: "Prioridad alta en lote 2." },
      { icon: "fa-droplet", titulo: "Fertilización balanceada", detalle: "Programada para final de mes." },
      { icon: "fa-cloud-sun", titulo: "Monitorear humedad", detalle: "Riesgo por lluvias frecuentes." },
    ],
    labores_proximas: [
      { actividad: "Revisión de broca", lote: "Lote 2", fecha: "Hoy", estado: "Pendiente" },
      { actividad: "Aplicación de fertilizante", lote: "Lote 4", fecha: "30 mayo", estado: "Programada" },
      { actividad: "Registro de cosecha", lote: "Lote 1", fecha: "2 junio", estado: "Lista" },
    ],
  },
  employee: {
    finca_nombre: "Finca El Paraíso",
    salud_cultivo: 82,
    lotes_asignados: 3,
    actividades_mes: 12,
    labores_pendientes: 2,
    proxima_actividad: { titulo: "Fertilización", lote: "El Mirador" },
    actividad_semanal: [
      { semana: "Sem 1", total: 3 },
      { semana: "Sem 2", total: 6 },
      { semana: "Sem 3", total: 4 },
      { semana: "Sem 4", total: 8 },
      { semana: "Sem 5", total: 7 },
      { semana: "Sem 6", total: 10 },
    ],
    tareas_hoy: [
      { titulo: "Revisar humedad", lote: "El Mirador", hora: "8:00 a. m." },
      { titulo: "Registrar cosecha", lote: "La Esperanza", hora: "2:00 p. m.", prioridad: "alta" },
    ],
  },
  admin: {
    usuarios_total: 248,
    fincas_total: 86,
    alertas_abiertas: 17,
    produccion_reportada: "18.4 t",
    fincas_activas: 86,
    consultas_ia_mes: 1320,
    disponibilidad: "99,8 %",
    actividad_reciente: [
      { tipo: "Registro", titulo: "Nuevo caficultor", usuario: "Finca El Porvenir", fecha: "Hoy" },
      { tipo: "Guía", titulo: "Guía de nutrición consultada", usuario: "Equipo de finca", fecha: "Hoy" },
      { tipo: "IA", titulo: "Análisis de cultivo completado", usuario: "Lote La Esperanza", fecha: "Ayer" },
    ],
    fincas_recientes: [
      { finca: "El Paraíso", caficultor: "Mariana Gómez", municipio: "Popayán", estado: "Activa", ultimo_reporte: "Hoy, 8:20 a. m." },
      { finca: "La Esperanza", caficultor: "Carlos Muñoz", municipio: "Cajibío", estado: "Revisión", ultimo_reporte: "Ayer, 4:10 p. m." },
      { finca: "Los Guaduales", caficultor: "Andrea Ruiz", municipio: "Timbío", estado: "Alerta", ultimo_reporte: "Hace 2 días" },
    ],
    alertas: [
      { icon: "fa-bug", titulo: "Broca detectada", detalle: "1 finca solicita revisión" },
      { icon: "fa-cloud-sun-rain", titulo: "Riesgo climático", detalle: "Lluvia alta en zona norte" },
      { icon: "fa-user-clock", titulo: "Usuarios pendientes", detalle: "5 cuentas por aprobar" },
    ],
    serie_diaria: [
      { fecha: "Lun", sesiones: 124 }, { fecha: "Mar", sesiones: 156 },
      { fecha: "Mié", sesiones: 141 }, { fecha: "Jue", sesiones: 188 },
      { fecha: "Vie", sesiones: 172 }, { fecha: "Sáb", sesiones: 205 },
      { fecha: "Dom", sesiones: 193 },
    ],
  },
};

const demoMetrics = {
  usuarios_activos: 184,
  consultas_chatbot: 1320,
  guias_consultadas: 462,
  actividades_registradas: 937,
  serie: [
    { fecha: "Lun", sesiones: 124, porcentaje: 58 },
    { fecha: "Mar", sesiones: 156, porcentaje: 72 },
    { fecha: "Mié", sesiones: 141, porcentaje: 65 },
    { fecha: "Jue", sesiones: 188, porcentaje: 87 },
    { fecha: "Vie", sesiones: 172, porcentaje: 80 },
    { fecha: "Sáb", sesiones: 205, porcentaje: 95 },
    { fecha: "Dom", sesiones: 193, porcentaje: 90 },
  ],
};

export const dashboardApi = {
  farmer: () => isDemoSession() ? Promise.resolve(demoDashboards.farmer) : http.get("/dashboard/caficultor"),
  employee: () => isDemoSession() ? Promise.resolve(demoDashboards.employee) : http.get("/dashboard/empleado"),
  admin: () => isDemoSession() ? Promise.resolve(demoDashboards.admin) : http.get("/admin/dashboard"),
  metrics: (period = "30d") => isDemoSession() ? Promise.resolve(demoMetrics) : http.get(`/admin/metricas?periodo=${period}`),
};
