"use client";

import { useState } from "react";
import Link from "next/link";
const logo = "/coffee-tech/logo2.png";
const cafe = "/coffee-tech/Cafe.webp";
const cosecha = "/coffee-tech/cosecha.webp";
const cafecito = "/coffee-tech/cafecito.webp";

const FUNCIONALIDADES = [
  { icon: "fa-mug-hot", titulo: "Gestión de Cultivos", texto: "Administra tus plantaciones de café con registro completo de variedades, ubicaciones y ciclos de producción." },
  { icon: "fa-bug", titulo: "Control de Plagas", texto: "Registra y monitorea plagas y enfermedades en tiempo real para tomar acciones preventivas." },
  { icon: "fa-droplet", titulo: "Manejo de Fertilizantes", texto: "Controla aplicaciones de fertilizantes, optimiza recursos y mejora la nutrición de tus cultivos." },
  { icon: "fa-leaf", titulo: "Monitoreo de Cosechas", texto: "Registra producción, calidad del grano y optimiza tus procesos de recolección." },
  { icon: "fa-database", titulo: "Base de Datos Agrícola", texto: "Almacena toda la información de tu finca en una plataforma segura y accesible desde cualquier lugar." },
  { icon: "fa-chart-line", titulo: "Reportes en Tiempo Real", texto: "Visualiza estadísticas, tendencias y métricas de producción con dashboards interactivos." },
];

const BENEFICIOS = [
  { titulo: "Toma Decisiones Informadas", texto: "Accede a datos en tiempo real sobre el estado de tus cultivos, clima y producción." },
  { titulo: "Mejora la Calidad del Café", texto: "Controla variables críticas que impactan directamente en el sabor y aroma de tu café." },
  { titulo: "Aumenta la Rentabilidad", texto: "Optimiza recursos, reduce pérdidas y maximiza el rendimiento de tus plantaciones." },
  { titulo: "Gestión Sostenible", texto: "Implementa prácticas agrícolas responsables con el medio ambiente." },
];

export default function Home() {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-30 flex w-full flex-wrap items-center justify-between gap-2 border-b border-line/80 bg-white/90 px-3 py-1 shadow-sm backdrop-blur-xl sm:gap-3 sm:px-6">
        <a href="#inicio" className="flex items-center">
          <img src={logo} alt="Coffee+visión Logo" className="h-16 w-auto object-contain sm:h-20" />
        </a>

        <nav className={`${menuMovilAbierto ? "block" : "hidden"} order-3 w-full md:order-0 md:block md:w-auto`}>
          <ul className="flex flex-col gap-1 py-2 font-semibold text-ink md:flex-row md:gap-8 md:py-0">
            <li><a href="#inicio" className="transition-colors hover:text-green">Inicio</a></li>
            <li><a href="#servicios" className="transition-colors hover:text-green">Servicios</a></li>
            <li><a href="#contacto" className="transition-colors hover:text-green">Contacto</a></li>
            <li><a href="#nosotros" className="transition-colors hover:text-green">Sobre Nosotros</a></li>
          </ul>
        </nav>

        <aside className="flex items-center gap-4">
          <Link href="/login" className="font-semibold text-white transition-colors hover:text-green">Iniciar Sesión</Link>
          <Link href="/registro" className="rounded-xl bg-green px-5 py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-green-deep">
            Registro
          </Link>
        </aside>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-line text-coffee md:hidden" aria-label={menuMovilAbierto ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuMovilAbierto} onClick={() => setMenuMovilAbierto((abierto) => !abierto)}>
          <i className={`fa-solid ${menuMovilAbierto ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
        </button>
      </header>

      <main>
        <section id="inicio" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <article className="py-2">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-green/15 bg-green-soft px-4 py-2 text-sm font-bold tracking-wide text-green-deep">
              <i className="fa-solid fa-leaf" aria-hidden="true"></i>
              Tecnología Agrícola Premium
            </span>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-coffee sm:text-6xl">
              Tecnología Inteligente para la Producción Cafetera
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Monitorea cultivos de café, registra plagas y optimiza tu producción mediante herramientas
              digitales avanzadas diseñadas para el campo.
            </p>
            <section className="mt-9 flex flex-wrap gap-3">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-green px-6 py-3.5 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-deep hover:shadow-lg">
                Comenzar →
              </Link>
              <a href="#servicios" className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-6 py-3.5 font-bold text-coffee transition hover:border-green hover:bg-green-soft/50">
                Explorar
              </a>
            </section>
          </article>

          <figure className="relative overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl ring-1 ring-coffee/5 m-0">
            <img src={cafe} alt="Cultivo de café" className="aspect-[4/3] h-full w-full object-cover transition duration-700 hover:scale-[1.03]" />
          </figure>
        </section>

        <section id="servicios" className="bg-white px-6 py-20 sm:px-10 lg:py-24">
          <header className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow">Coffee+Visión</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Funcionalidades Principales</h2>
            <p className="mt-4 text-lg leading-7 text-muted">
              Herramientas diseñadas específicamente para optimizar la gestión de tus cultivos de café
            </p>
          </header>

          <section className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FUNCIONALIDADES.map((f) => (
              <article key={f.titulo} className="group/card rounded-2xl border border-line bg-[#fffefa] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-grey/40 hover:shadow-xl sm:p-7">
                <figure className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-green-soft text-xl text-black transition-colors duration-300 group-hover/card:bg-green group-hover/card:text-black m-0">
                  <i className={`fa-solid ${f.icon}`}></i>
                </figure>
                <h3 className="text-lg font-bold tracking-tight">{f.titulo}</h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">{f.texto}</p>
              </article>
            ))}
          </section>
        </section>

        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <figure className="overflow-hidden rounded-[2rem] shadow-hero ring-1 ring-coffee/10 m-0">
            <img src={cosecha} alt="Optimiza tu Producción Cafetera" className="aspect-[4/3] h-full w-full object-cover" />
          </figure>

          <article>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Optimiza tu Producción Cafetera</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Coffee+Visión ayuda a los caficultores a transformar sus procesos tradicionales en operaciones
              modernas y eficientes mediante tecnología de punta.
            </p>

            <ul className="mt-8 grid gap-5 list-none p-0">
              {BENEFICIOS.map((b) => (
                <li key={b.titulo} className="flex gap-3.5">
                  <i className="fa-solid fa-circle-check mt-1 text-lg text-green"></i>
                  <span>
                    <strong className="block font-bold text-coffee">{b.titulo}</strong>
                    <p className="mt-1 text-sm leading-6 text-muted">{b.texto}</p>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section id="nosotros" className="grid items-center gap-12 bg-white px-6 py-20 sm:px-10 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <article>
            <header className="mb-4">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Nuestra Misión</h2>
              <p className="mt-1 text-muted">Impulsando la caficultura desde la formación y la innovación</p>
            </header>

            <p className="text-lg leading-8 text-muted">
              <strong className="text-coffee">Coffee+visión</strong> es un proyecto tecnológico nacido en el{" "}
              <strong className="text-coffee">SENA</strong>, diseñado por aprendices apasionados por
              transformar el campo colombiano. Nuestra meta es cerrar la brecha digital en la agricultura,
              ofreciendo herramientas de visión artificial y análisis de datos que antes eran inalcanzables
              para el pequeño productor.
            </p>

            <ul className="mt-8 grid gap-5 list-none p-0">
              <li className="flex gap-3">
                <i className="fa-solid fa-graduation-cap mt-1 text-green"></i>
                <span>
                  <strong className="block text-coffee">Talento SENA</strong>
                  <p className="text-sm text-muted">Desarrollado con el respaldo académico y técnico del Servicio Nacional de Aprendizaje.</p>
                </span>
              </li>
              <li className="flex gap-3">
                <i className="fa-solid fa-users-gear mt-1 text-green"></i>
                <span>
                  <strong className="block text-coffee">Hecho para Caficultores</strong>
                  <p className="text-sm text-muted">Creamos soluciones reales para los desafíos diarios de las fincas cafeteras.</p>
                </span>
              </li>
            </ul>
          </article>

          <figure className="overflow-hidden rounded-[2rem] shadow-hero ring-1 ring-coffee/10 m-0">
            <img src={cafecito} alt="Desarrollo tecnológico SENA" className="aspect-[4/3] h-full w-full object-cover" />
          </figure>
        </section>

        <section id="contacto" className="bg-white px-6 py-20 sm:px-10 lg:py-24">
          <section aria-label="Información de contacto" className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-white p-8 shadow-hero ring-1 ring-coffee/5 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
            <article>
              <p className="eyebrow">Estamos para ayudarte</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-coffee sm:text-4xl">Conectemos para impulsar tu cultivo</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                ¿Tienes preguntas sobre Coffee+Visión o quieres conocer cómo puede ayudarte nuestra plataforma? Escríbenos y conversemos.
              </p>
              <a href="mailto:Coffee+Visión@gmail.com" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-green px-6 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-green-deep">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                Contáctanos
              </a>
            </article>

            <address className="grid gap-4 not-italic">
              <a href="mailto:Coffee+Visión@gmail.com" className="flex items-center gap-4 rounded-2xl bg-[#fffefa] p-5 transition hover:bg-green-soft/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-soft text-green-deep"><i className="fa-solid fa-envelope" aria-hidden="true"></i></span>
                <span><strong className="block text-coffee">Correo electrónico</strong><span className="text-sm text-muted">Coffee+Visión@gmail.com</span></span>
              </a>
              <a href="tel:+573001234567" className="flex items-center gap-4 rounded-2xl bg-[#fffefa] p-5 transition hover:bg-green-soft/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-soft text-green-deep"><i className="fa-solid fa-phone" aria-hidden="true"></i></span>
                <span><strong className="block text-coffee">Llámanos</strong><span className="text-sm text-muted">+57 300 123 4567</span></span>
              </a>
              <p className="m-0 flex items-center gap-4 rounded-2xl bg-[#fffefa] p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-green-soft text-green-deep"><i className="fa-solid fa-location-dot" aria-hidden="true"></i></span>
                <span><strong className="block text-coffee">Visítanos</strong><span className="text-sm text-muted">Popayán, Cauca · SENA</span></span>
              </p>
            </address>
          </section>
        </section>
      </main>

      <footer className="bg-[#2c1a10] px-6 py-14 text-white/80 sm:px-10">
        <section className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <article>
            <p className="mb-2 flex items-center gap-2 text-lg font-extrabold text-white">
              <i className="fa-solid fa-mug-hot text-gold"></i>
              <span>Coffee+Visión</span>
            </p>
            <p className="text-sm">Tecnología inteligente para la producción cafetera sostenible y eficiente.</p>
            <nav className="mt-4 flex gap-4 text-lg">
              <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
              <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
            </nav>
          </article>

          <nav>
            <h3 className="mb-3 font-bold text-white">Plataforma</h3>
            <ul className="grid gap-2 text-sm list-none p-0">
              <li><a href="#" className="hover:text-white">Dashboard</a></li>
              <li><a href="#" className="hover:text-white">Gestión de Cultivos</a></li>
              <li><a href="#" className="hover:text-white">Control de Plagas</a></li>
              <li><a href="#" className="hover:text-white">Reportes</a></li>
            </ul>
          </nav>

          <nav>
            <h3 className="mb-3 font-bold text-white">Recursos</h3>
            <ul className="grid gap-2 text-sm list-none p-0">
              <li><a href="#" className="hover:text-white">Documentación</a></li>
              <li><a href="#" className="hover:text-white">Tutoriales</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Soporte</a></li>
            </ul>
          </nav>

          <article>
            <h3 className="mb-3 font-bold text-white">Contacto</h3>
            <p className="text-sm">Coffee+Visión@gmail.com</p>
            <p className="text-sm">+57 300 123 4567</p>
            <p className="text-sm">Popayán, Cauca - SENA</p>
            <p className="text-sm">Lun - Vie: 8am - 6pm</p>
          </article>
        </section>

        <aside className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-6 text-center text-xs text-white/60">
          <p>&copy; 2026 Coffee+Visión. Todos los derechos reservados. Diseñado con tecnología para el café colombiano.</p>
        </aside>
      </footer>
    </>
  );
}

