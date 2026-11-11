/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/dashboard/caficultor", destination: "/dashboard", permanent: false },
      { source: "/dashboard/administrador", destination: "/admin", permanent: false },
      { source: "/registrar-labor", destination: "/actividades", permanent: false },
      { source: "/estadisticas", destination: "/reportes", permanent: false },
      { source: "/guias", destination: "/contenidos", permanent: false },
      { source: "/admin/plagas", destination: "/admin/plagas-ia", permanent: false },
    ];
  },
};

export default nextConfig;
