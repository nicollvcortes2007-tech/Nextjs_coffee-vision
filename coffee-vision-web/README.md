# Coffee+Vision - Frontend (Next.js)

Frontend de Coffee+Vision con Next.js (App Router), TypeScript y Tailwind CSS.
El backend (FastAPI) va en un repositorio aparte.

## Roles
- caficultor
- empleado (acceso a la finca del caficultor, dashboard reducido)
- administrador

El registro distingue entre caficultor y empleado. El formulario envía nombre, correo,
teléfono, contraseña y rol; para caficultores también finca y ubicación, y para empleados
`codigo_vinculacion`. La API debe validar el código y asignar el rol y la finca desde el servidor;
el frontend nunca debe conceder acceso a una finca basándose solo en el código enviado.

## Contrato de API pendiente

La rama no incluye el repositorio FastAPI ni su esquema OpenAPI. El formulario usa
`POST /auth/login` (JSON `{ email, password, rol }`) y `POST /auth/register` (JSON con
`nombre`, `email`, `telefono`, `password`, `rol` y, para empleados, `codigo_vinculacion`). El login
espera `{ access_token, rol }`. Ajusta esos nombres/rutas al contrato real del backend
antes de desplegar. El chat, las métricas, los lotes y el historial de actividades
actualmente usan vista previa o estado local y deben conectarse a endpoints reales.

La autorización de cada endpoint y recurso debe verificarse en FastAPI. El middleware
de Next.js solo ayuda a dirigir la navegación; no debe ser la única barrera de seguridad.

Los paneles y formularios ya están conectados a estos recursos REST esperados: `GET
/dashboard/caficultor`, `GET /dashboard/empleado`, `GET /admin/dashboard`, `GET|POST
/cultivos`, `GET|PUT|DELETE /cultivos/{id}`, `GET|POST /actividades`, `GET|POST
/empleados/invitaciones`, `GET /empleados`, `GET /contenidos`, `GET /notificaciones`,
`POST /chatbot/chat`, `GET /reportes/resumen`, `GET /admin/usuarios`, `PATCH|DELETE
/admin/usuarios/{id}`, `GET|POST /admin/contenidos` y `POST /plagas-ia/analizar`.
Las respuestas de panel devuelven agregados por rol; las listas devuelven una lista o
`{ items: [...] }`. Confirma y adapta los paths/campos a OpenAPI de FastAPI antes de
desplegar. Los endpoints de empleado deben limitar automáticamente lotes, historial,
avisos y conversación a la finca vinculada al usuario autenticado.

## Estructura
- `src/app`: solo rutas. Grupos `(auth)`, `(caficultor)`, `(empleado)` y `(admin)`
- `src/features`: la lógica por módulo (components, hooks, services, types, index.ts)
- `src/components`: componentes compartidos (ui y layout)
- `src/lib`: api, auth y permisos por rol
- `src/constants`: roles
- `src/middleware.ts`: protege las rutas según login y rol

## Cómo correrlo
```bash
npm install
cp .env.example .env.local
npm run dev
```

Al ejecutar `npm run dev`, el formulario de acceso habilita el modo de demostración:
elige cualquier rol, escribe un correo con formato válido y una contraseña no vacía. Las
sesiones de demostración usan indicadores ficticios y solo se habilitan en desarrollo;
al ejecutar `npm run build` o desplegar la aplicación, el acceso vuelve a requerir FastAPI.
