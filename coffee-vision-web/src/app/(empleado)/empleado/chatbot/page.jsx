"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { chatbotApi } from "@/features/chatbot";

const suggestions = ["¿Cómo identifico la roya?", "Ayuda con una labor", "¿Cómo cuidar el suelo?"];

export default function ChatbotEmpleadoPage() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function ask(event) {
    event.preventDefault();
    const prompt = question.trim();
    if (!prompt || pending) return;
    setMessages((current) => [...current, { role: "user", content: prompt }]); setQuestion(""); setPending(true); setError("");
    try {
      const result = await chatbotApi.ask(prompt, { rol: "empleado" });
      setMessages((current) => [...current, { role: "assistant", content: result.respuesta ?? result.answer }]);
    } catch (requestError) { setError(requestError.message); }
    finally { setPending(false); }
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Asistente inteligente" title="Chat de IA" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <section className="grid min-h-[calc(100vh-180px)] flex-1 gap-5 rounded-lg border border-line bg-white/95 p-6 shadow-panel">
      {messages.length === 0 ? <article className="grid place-content-center justify-items-center gap-4 py-10 text-center"><h3 className="text-xl">Bienvenido al Chat de Coffee+Vision</h3><p className="text-muted">Resuelve tus dudas durante el trabajo en campo</p><nav className="flex flex-wrap justify-center gap-3">{suggestions.map((item) => <button key={item} type="button" onClick={() => setQuestion(item)} className="rounded-lg border border-line px-4 py-2 text-sm font-bold text-coffee hover:border-green hover:text-green">{item}</button>)}</nav></article> : <ol className="grid content-start gap-3 overflow-y-auto" aria-live="polite">{messages.map((message, index) => <li key={index} className={`max-w-[75%] rounded-lg p-3 text-sm ${message.role === "assistant" ? "justify-self-start bg-green-soft text-ink" : "justify-self-end bg-coffee text-white"}`}>{message.content}</li>)}{pending && <li className="justify-self-start rounded-lg bg-green-soft p-3 text-sm text-muted">Consultando al asistente…</li>}</ol>}
      {error && <p className="text-sm text-danger" role="alert">{error}</p>}
      <form onSubmit={ask} className="mt-auto grid gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3"><textarea rows={2} placeholder="¿Qué deseas saber hoy?" value={question} onChange={(event) => setQuestion(event.target.value)} className="resize-none rounded-lg border border-line bg-white px-3 py-2 focus:border-green focus:outline-none"/><nav className="flex items-center justify-between"><button type="button" className="text-sm font-bold text-muted hover:text-coffee"><i className="fa-solid fa-paperclip mr-1.5"/>Adjuntar</button><button type="submit" disabled={pending} className="rounded-lg bg-green px-5 py-2 font-bold text-white hover:bg-green-deep disabled:opacity-60">{pending ? "Enviando…" : "Enviar"}</button></nav></form>
    </section>
  </section>;
}
