# Coffee+Vision - Frontend (Next.js)

Frontend de Coffee+Vision con Next.js (App Router), TypeScript y Tailwind CSS.
El backend (FastAPI) va en un repositorio aparte.

## Roles
- caficultor
- empleado (acceso a la finca del caficultor, dashboard reducido)
- administrador

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
