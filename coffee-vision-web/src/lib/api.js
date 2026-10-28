// cliente simple para consumir la API de FastAPI
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(ruta, opciones = {}) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });
  if (!respuesta.ok) throw new Error("Error en la petición");
  return respuesta.json();
}
