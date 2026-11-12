import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PlantillaPrincipal from '@/plantillas/PlantillaPrincipal';

import cafe from '@/assets/imagenes/Cafe.webp';
import cosecha from '@/assets/imagenes/cosecha.webp';
import caficultor from '@/assets/imagenes/caficultor.jpg';
import broca from '@/assets/imagenes/Broca.jpg';

const iniciales = [
  {
    id: 1,
    lote: 'El Paraíso',
    variedad: 'Castillo',
    ha: 8.5,
    edad: '3 años',
    fase: 'Producción',
    clima: 'Templado',
    estado: 'Buen estado',
    foto: cafe,
  },
  {
    id: 2,
    lote: 'La Esperanza',
    variedad: 'Castillo',
    ha: 7.2,
    edad: '5 años',
    fase: 'Producción',
    clima: 'Templado',
    estado: 'En observación',
    foto: cosecha,
  },
  {
    id: 3,
    lote: 'Lote Central',
    variedad: 'Castillo',
    ha: 5.8,
    edad: '2 años',
    fase: 'Crecimiento',
    clima: 'Húmedo',
    estado: 'Buen estado',
    foto: caficultor,
  },
  {
    id: 4,
    lote: 'El Roble',
    variedad: 'Castillo',
    ha: 3,
    edad: '1 año',
    fase: 'Crecimiento',
    clima: 'Templado',
    estado: 'Buen estado',
    foto: broca,
  },
];

const actividadesIniciales = [
  {

    subtitulo: "Registro 1:",
    lote: "Lote: El placer",
    alerta: "Alerta de Broca",
    afectacion: "Media",
  }
];
const actividades = [
  {
    id: 1,
    fecha: '2026-10-12',
    actividad: 'Monitoreo sanitario',
    lote: 'El Paraíso',
    detalle: 'Revisión preventiva de hojas, frutos y presencia de broca.',
  },
  {
    id: 2,
    fecha: '2026-10-09',
    actividad: 'Fertilización',
    lote: 'La Esperanza',
    detalle: 'Labor registrada en el plan de manejo del lote.',
  },
  {
    id: 3,
    fecha: '2026-10-05',
    actividad: 'Control de malezas',
    lote: 'Lote Central',
    detalle: 'Limpieza de calles y plato del cafeto.',
  },
];
export default function Cultivos() {
  const [filtro, setFiltro] = useState('Todos');
  const [cultivos] = useState(iniciales);
  const [actividades, setActividades] = useState(actividadesIniciales);
  const [abierto, setAbierto] = useState(false);

  const [form, setForm] = useState({
    actividad: '',
    lote: 'El Paraíso',
    fecha: new Date().toISOString().slice(0, 10),
    detalle: '',
  });

  const visibles = useMemo(
    () =>
      cultivos.filter(
        c => filtro === 'Todos' || c.fase === filtro
      ),
    [cultivos, filtro]
  );

  const guardar = e => {
    e.preventDefault();

    setActividades(a => [
      { ...form, id: Date.now() },
      ...a,
    ]);

    setForm({
      actividad: '',
      lote: 'El Paraíso',
      fecha: new Date().toISOString().slice(0, 10),
      detalle: '',
    });

    setAbierto(false);
  };

  const ha = cultivos.reduce((s, c) => s + c.ha, 0);

  return (
    <PlantillaPrincipal>
      <main
        className="cv-cultivos"
        style={{
          backgroundColor: '#f8f7f2',
          minHeight: '100vh',
          color: '#253323',
        }}
      >
        {/* ENCABEZADO SIN FONDO VERDE */}

        <section
          className="cv-cultivo-hero"
          style={{
            background: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
            boxShadow: 'none',
            color: '#253323',
            border: 'none',
          }}
        >
          <div className="cv-hero-content">
            <span
              className="cv-eyebrow"
              style={{ color: '#719b43' }}
            >
              COFFEE+VISION · MI FINCA
            </span>

            <h1 style={{ color: '#253323' }}>
              Cultiva mejor.
              <br />
              <em style={{ color: '#83a94d' }}>
                Cosecha futuro.
              </em>
            </h1>

            <p style={{ color: '#4b5563' }}>
              Todo el seguimiento de tus lotes cafeteros
              en un solo lugar.
            </p>

            <button onClick={() => setAbierto(true)}>
              ＋ Registrar actividad
            </button>
          </div>
        </section>

        {/* INDICADORES DE LA FINCA */}

        <section className="cv-kpis">
          <article>
            <span
              className="cv-kpi-icon green"
              role="img"
              aria-label="Planta de café"
            >
              🌿
            </span>

            <div>
              <small>Lotes registrados</small>
              <strong>{cultivos.length}</strong>
              <small className="cv-muted">
                Cultivos activos
              </small>
            </div>
          </article>

          <article>
            <span
              className="cv-kpi-icon amber"
              role="img"
              aria-label="Granos de café y cultivo"
            >
              🫘
            </span>

            <div>
              <small>Área cultivada</small>
              <strong>{ha.toFixed(1)} ha</strong>
              <small className="cv-muted">
                En todos los lotes
              </small>
            </div>
          </article>

          <article>
            <span
              className="cv-kpi-icon rose"
              role="img"
              aria-label="Café"
            >
              ☕
            </span>

            <div>
              <small>Variedad principal</small>
              <strong>Castillo</strong>
              <small className="cv-muted">
                Variedad registrada
              </small>
            </div>
          </article>

          <article>
            <span
              className="cv-kpi-icon blue"
              role="img"
              aria-label="Cosecha de café"
            >
              🧺
            </span>

            <div>
              <small>Actividades</small>
              <strong>{actividades.length}</strong>
              <small className="cv-muted">
                En el historial
              </small>
            </div>
          </article>
        </section>

        {/* LISTA Y FILTRO DE CULTIVOS */}

        <section className="cv-section-head">
          <div>
            <span className="cv-eyebrow">
              TU PRODUCCIÓN
            </span>

            <h2>Explora tus lotes</h2>

            <p>
              Consulta rápidamente el estado y los datos
              principales de cada cultivo.
            </p>
          </div>

          <select
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            aria-label="Filtrar por fase"
          >
            <option>Todos</option>
            <option>Producción</option>
            <option>Crecimiento</option>
          </select>
        </section>

        {/* TARJETAS DE LOTES */}

        <section className="cv-lotes">
          {visibles.map(c => (
            <article className="cv-lote-card" key={c.id}>
              <div
                className="cv-lote-photo"
                style={{
                  backgroundImage: `url("${c.foto}")`,
                }}
              >
                <span
                  className={
                    c.estado === 'Buen estado'
                      ? 'cv-state-ok'
                      : 'cv-state-watch'
                  }
                >
                  ● {c.estado}
                </span>

                <b>{c.lote}</b>
              </div>

              <div className="cv-lote-body">
                <span className="cv-variety">
                  ☕ {c.variedad} · {c.fase}
                </span>

                <div className="cv-lote-facts">
                  <div>
                    <small>Área</small>
                    <strong>{c.ha} ha</strong>
                  </div>

                  <div>
                    <small>Edad</small>
                    <strong>{c.edad}</strong>
                  </div>

                  <div>
                    <small>Clima</small>
                    <strong>{c.clima}</strong>
                  </div>
                </div>

                <Link to="/caficultor/estadisticas">
                  Consultar estadísticas <span>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* ACTIVIDADES RECIENTES */}

        <section className="cv-activity-panel">
          <div className="cv-section-head">
            <div>
              <span className="cv-eyebrow">
                BITÁCORA DE CAMPO
              </span>

              <h2>Actividad reciente</h2>

              <p>
                Registra las labores para mantener el historial
                de tus lotes actualizado.
              </p>
            </div>

            <button
              className="cv-outline-btn"
              onClick={() => setAbierto(true)}
            >
              ＋ Nueva actividad
            </button>
          </div>

          <div className="cv-activity-list">
            {actividades.map(a => (
              <article key={a.id}>
                <span className="cv-activity-symbol">
                  ☕
                </span>

                <div className="cv-activity-copy">
                  <strong>{a.actividad}</strong>
                  <span>
                    {a.lote} · {a.fecha}
                  </span>

                  <p>
                    {a.detalle ||
                      'Actividad registrada por el caficultor.'}
                  </p>
                </div>

                <span className="cv-logged">
                  Registrada
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* FORMULARIO PARA AGREGAR ACTIVIDAD */}

        {abierto && (
          <div
            className="cv-modal-bg"
            onMouseDown={e =>
              e.target === e.currentTarget &&
              setAbierto(false)
            }
          >
            <form
              className="cv-modal"
              onSubmit={guardar}
            >
              <button
                type="button"
                className="cv-modal-close"
                onClick={() => setAbierto(false)}
              >
                ×
              </button>

              <span className="cv-eyebrow">
                BITÁCORA DE CAMPO
              </span>

              <h2>Agregar actividad</h2>

              <p>
                Completa los datos para guardarlos en la
                actividad reciente.
              </p>

              <label>
                Nombre de la actividad

                <input
                  required
                  value={form.actividad}
                  onChange={e =>
                    setForm({
                      ...form,
                      actividad: e.target.value,
                    })
                  }
                  placeholder="Ej. Poda, fertilización..."
                />
              </label>

              <div className="cv-form-row">
                <label>
                  Lote

                  <select
                    value={form.lote}
                    onChange={e =>
                      setForm({
                        ...form,
                        lote: e.target.value,
                      })
                    }
                  >
                    {cultivos.map(c => (
                      <option
                        key={c.id}
                        value={c.lote}
                      >
                        {c.lote}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Fecha

                  <input
                    required
                    type="date"
                    value={form.fecha}
                    onChange={e =>
                      setForm({
                        ...form,
                        fecha: e.target.value,
                      })
                    }
                  />
                </label>
              </div>

              <label>
                Detalle

                <textarea
                  rows="3"
                  value={form.detalle}
                  onChange={e =>
                    setForm({
                      ...form,
                      detalle: e.target.value,
                    })
                  }
                  placeholder="¿Qué trabajo realizaste?"
                />
              </label>

              <div className="cv-modal-actions">
                <button
                  type="button"
                  className="cv-cancel"
                  onClick={() => setAbierto(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="cv-save"
                >
                  Guardar actividad ✓
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </PlantillaPrincipal>
  );
}

