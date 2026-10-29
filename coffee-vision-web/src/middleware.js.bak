import { NextResponse } from "next/server";

// Protege rutas según login y rol. Las cookies "token" y "rol" las define el login.
export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const rol = req.cookies.get("rol")?.value;
  const ruta = req.nextUrl.pathname;

  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  if (ruta.startsWith("/admin") && rol !== "administrador")
    return NextResponse.redirect(new URL("/login", req.url));

  if (ruta.startsWith("/empleado") && rol !== "empleado")
    return NextResponse.redirect(new URL("/login", req.url));

  const rutasCaficultor = ["/dashboard", "/cultivos", "/chatbot", "/notificaciones",
    "/recomendaciones", "/reportes", "/contenidos", "/empleados", "/perfil"];
  if (rutasCaficultor.some((r) => ruta.startsWith(r)) && rol !== "caficultor")
    return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/cultivos/:path*", "/chatbot/:path*",
    "/notificaciones/:path*", "/recomendaciones/:path*", "/reportes/:path*",
    "/contenidos/:path*", "/empleados/:path*", "/perfil/:path*",
    "/empleado/:path*", "/admin/:path*"],
};
