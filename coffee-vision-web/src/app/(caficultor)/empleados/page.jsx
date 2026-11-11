import ApiCollection from "@/components/ui/ApiCollection";

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "email", label: "Correo" },
  { key: "estado", label: "Estado" },
  { key: "fecha_vinculacion", label: "Vinculado desde" },
];

export default function EmpleadosPage() {
  return <ApiCollection eyebrow="EQUIPO DE FINCA" title="Mi equipo" description="Gestiona las personas vinculadas a tu finca." endpoint="/empleados" columns={columns} createHref="/empleados/nuevo" empty="Aún no has vinculado empleados a tu finca." />;
}
