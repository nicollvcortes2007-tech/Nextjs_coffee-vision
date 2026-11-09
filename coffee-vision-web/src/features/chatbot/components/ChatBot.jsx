"use client";

import { useRef, useState } from "react";

const SUGERENCIAS = [
  { icono: "fa-bug", texto: "Ayuda con una plaga" },
  { icono: "fa-image", texto: "Analizar una imagen" },
  { icono: "fa-seedling", texto: "Consejos para mi cultivo" },
];

export default function ChatBot() {
  const [consulta, setConsulta] = useState("");
  const [archivo, setArchivo] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const inputArchivo = useRef(null);

  function enviarConsulta(event) {
    event.preventDefault();
    const texto = consulta.trim();
    if (!texto && !archivo) return;

    setMensajes((actuales) => [
      ...actuales,
      { autor: "usuario", texto: texto || `Imagen adjunta: ${archivo}` },
      { autor: "asistente", texto: "Recibí tu consulta. El asistente está en modo demostración y aún no genera respuestas automáticas." },
    ]);
    setConsulta("");
    setArchivo("");
    if (inputArchivo.current) inputArchivo.current.value = "";
  }

  function usarSugerencia(texto) {
    setConsulta(texto);
    document.getElementById("consulta-chat")?.focus();
  }

  return (
    <section className="flex h-full min-h-[calc(100vh-170px)] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-panel">
      <header className="flex items-center gap-3 border-b border-line bg-white px-5 py-4 sm:px-7">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-green-soft text-xl text-green">
          <i className="fa-solid fa-robot" aria-hidden="true"></i>
        </span>
        <hgroup className="flex-1">
          <h2 className="font-bold">Asistente Coffee+Visión</h2>
          <p className="mt-0.5 text-xs text-muted">Consultas sobre tu cultivo de café</p>
        </hgroup>
        <span className="rounded-full bg-[#fff4d6] px-3 py-1.5 text-xs font-bold text-[#8a5a00]">Modo demostración</span>
      </header>

      <main className="flex flex-1 flex-col overflow-y-auto bg-[#fbfaf7] p-5 sm:p-8">
        {mensajes.length === 0 ? (
          <article className="m-auto flex w-full max-w-3xl flex-col items-center py-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-green-soft text-3xl text-green">
              <i className="fa-solid fa-seedling" aria-hidden="true"></i>
            </span>
            <h3 className="mt-5 text-2xl font-bold sm:text-3xl">Bienvenido al chat de Coffee+Visión</h3>
            <p className="mt-2 max-w-xl text-muted">¿Qué necesitas saber hoy? Pregúntame sobre el cuidado de tus cultivos, plagas o cosecha.</p>
            <nav aria-label="Sugerencias rápidas" className="mt-7 flex flex-wrap justify-center gap-3">
              {SUGERENCIAS.map((sugerencia) => (
                <button
                  key={sugerencia.texto}
                  type="button"
                  onClick={() => usarSugerencia(sugerencia.texto)}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-semibold text-coffee shadow-sm transition hover:border-green hover:bg-green-soft"
                >
                  <i className={`fa-solid ${sugerencia.icono} text-green`} aria-hidden="true"></i>
                  {sugerencia.texto}
                </button>
              ))}
            </nav>
          </article>
        ) : (
          <ol className="mx-auto flex w-full max-w-4xl flex-col gap-4">
            {mensajes.map((mensaje, index) => (
              <li key={`${mensaje.autor}-${index}`} className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${mensaje.autor === "usuario" ? "ml-auto bg-coffee text-white" : "mr-auto border border-line bg-white text-ink"}`}>
                <p className="mb-1 text-xs font-bold uppercase opacity-70">{mensaje.autor === "usuario" ? "Tú" : "Asistente"}</p>
                <p className="text-sm leading-relaxed">{mensaje.texto}</p>
              </li>
            ))}
          </ol>
        )}
      </main>

      <footer className="border-t border-line bg-white p-4 sm:p-5">
        <form onSubmit={enviarConsulta}>
          {archivo && (
            <p className="mb-2 flex items-center gap-2 text-sm text-muted">
              <i className="fa-solid fa-paperclip text-green" aria-hidden="true"></i>
              {archivo}
              <button
                type="button"
                onClick={() => { setArchivo(""); if (inputArchivo.current) inputArchivo.current.value = ""; }}
                className="ml-1 font-bold text-danger"
                aria-label="Quitar archivo"
              >
                ×
              </button>
            </p>
          )}
          <label htmlFor="consulta-chat" className="sr-only">Escribe tu consulta</label>
          <textarea
            id="consulta-chat"
            rows="2"
            value={consulta}
            onChange={(event) => setConsulta(event.target.value)}
            placeholder="¿Qué deseas saber hoy?"
            className="w-full resize-y rounded-xl border border-line bg-white p-3 text-ink outline-none placeholder:text-muted focus:border-green focus:ring-2 focus:ring-green/20"
          />
          <fieldset className="mt-3 flex items-center justify-between gap-3 border-0 p-0 m-0">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-muted transition hover:bg-green-soft hover:text-coffee">
              <i className="fa-solid fa-paperclip text-green" aria-hidden="true"></i>Adjuntar imagen
              <input ref={inputArchivo} type="file" accept="image/*" className="sr-only" onChange={(event) => setArchivo(event.target.files?.[0]?.name || "")} />
            </label>
            <button
              type="submit"
              disabled={!consulta.trim() && !archivo}
              className="inline-flex items-center gap-2 rounded-xl bg-green px-5 py-3 font-bold text-white transition hover:bg-green-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane" aria-hidden="true"></i>Enviar
            </button>
          </fieldset>
        </form>
      </footer>
    </section>
  );
}
