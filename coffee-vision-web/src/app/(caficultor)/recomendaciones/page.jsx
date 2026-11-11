import ApiCollection from "@/components/ui/ApiCollection";

const columns = [
  { key: "titulo", label: "Recomendación" },
  { key: "lote", label: "Lote" },
  { key: "prioridad", label: "Prioridad" },
  { key: "fecha", label: "Fecha" },
];

export default function RecomendacionesPage() {
  return <ApiCollection eyebrow="ASISTENCIA TÉCNICA" title="Recomendaciones" description="Sugerencias para atender tus cultivos a tiempo." endpoint="/recomendaciones" columns={columns} empty="No hay recomendaciones pendientes." />;
}
