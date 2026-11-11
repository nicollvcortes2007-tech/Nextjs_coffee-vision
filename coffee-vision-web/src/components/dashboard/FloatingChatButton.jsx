"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingChatButton() {
  const pathname = usePathname();
  const href = pathname.startsWith("/empleado")
    ? "/empleado/chatbot"
    : pathname.startsWith("/admin")
      ? "/admin/plagas-ia"
      : "/chatbot";

  return (
    <Link
      href={href}
      aria-label="Abrir chatbot"
      title="Abrir chatbot"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-green text-2xl text-white shadow-hero transition-transform hover:-translate-y-1 hover:bg-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green"
    >
      <i className="fa-solid fa-robot" aria-hidden="true" />
    </Link>
  );
}
