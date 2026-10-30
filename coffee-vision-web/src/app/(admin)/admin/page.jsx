"use client";

import React, { useState } from 'react';
import { UserPlus, Users, Package, Bug, FileText, ShieldAlert, Bell, Home, BarChart2, AlertTriangle } from 'lucide-react';

export default function AdminDashboardPage() {
  const [vistaActual, setVistaActual] = useState('inicio');
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Carlos Pérez', rol: 'Caficultor', estado: 'Activo' },
    { id: 2, nombre: 'Maria Gómez', rol: 'Administrador', estado: 'Activo' }
  ]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoRol, setNuevoRol] = useState('caficultor');

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'usuarios', label: 'Usuarios', icon: Users },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'estadisticas', label: 'Estadísticas', icon: BarChart2 },
  ];

  const estadisticasGeneralesLocales = [
    { etiqueta: 'Usuarios activos', porcentaje: 80 },
    { etiqueta: 'Producción mensual', porcentaje: 60 },
    { etiqueta: 'Alertas resueltas', porcentaje: 70 }
  ];

  const estadisticasPlagasLocales = [
    { etiqueta: 'Roya', porcentaje: 65 },
    { etiqueta: 'Broca', porcentaje: 45 },
    { etiqueta: 'Ojo de Gallo', porcentaje: 35 }
  ];

  const handleAgregarUsuario = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    const nuevoUsuario = {
      id: Date.now(),
      nombre: nuevoNombre,
      rol: nuevoRol === 'caficultor' ? 'Caficultor' : 'Administrador',
      estado: 'Activo'
    };

    setUsuarios([...usuarios, nuevoUsuario]);
    setNuevoNombre('');
  };

  const handleEliminarUsuario = (id, nombre) => {
    const c1 = window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${nombre}?`);
    if (!c1) return;

    const c2 = window.confirm(`¡ADVERTENCIA! Esta acción no se puede deshacer. ¿Deseas continuar eliminando a ${nombre}?`);
    if (!c2) return;

    const c3 = window.confirm(`Confirmación final: ¿Realmente quieres proceder a eliminar a ${nombre}?`);
    if (!c3) return;

    setUsuarios(usuarios.filter((usr) => usr.id !== id));
    alert(`El usuario ${nombre} ha sido eliminado exitosamente.`);
  };

  return (
    <section style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f0', margin: 0, padding: 0, width: '100%', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      {/* MENÚ LATERAL ÚNICO */}
      <aside style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 16px',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0
      }}>
        <nav style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <header style={{ textAlign: 'center', marginBottom: '28px', display: 'flex', justifyContent: 'center' }}>
            <img src="/imagenes/logo2.png" alt="Coffee+Vision" style={{ width: '120px', objectFit: 'contain', display: 'block' }} />
          </header>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const activo = vistaActual === item.id;
              return (
                <li key={item.id} style={{ width: '100%', display: 'flex' }}>
                  <button
                    onClick={() => setVistaActual(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      backgroundColor: activo ? '#eaf4e0' : 'transparent',
                      color: activo ? '#2e4a19' : '#4a5568',
                      fontWeight: activo ? '700' : '600',
                      fontSize: '15px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <IconComponent size={20} color={activo ? '#2e4a19' : '#718096'} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ALERTA CRÍTICA INFERIOR */}
        <footer style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <article style={{
            backgroundColor: '#53382c',
            color: '#ffffff',
            padding: '16px',
            borderRadius: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <AlertTriangle size={18} color="#facc15" />
              <small style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: '700', color: '#facc15' }}>
                Alerta Crítica
              </small>
            </span>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', lineHeight: '1.3' }}>
              Lote 2 - Presencia de Broca
            </p>
          </article>
        </footer>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ flex: 1, padding: '24px 36px', fontFamily: 'sans-serif', boxSizing: 'border-box', overflowY: 'auto' }}>
        
        {/* ENCABEZADO SUPERIOR */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <article>
            <span style={{ fontSize: '12px', color: '#658210', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              BIENVENIDO
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#3c2a21', margin: '2px 0 0 0' }}>
              Panel de administración
            </h1>
          </article>

          <section style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button style={{
              position: 'relative',
              backgroundColor: '#ffffff',
              border: 'none',
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              cursor: 'pointer'
            }}>
              <Bell size={19} color="#3c2a21" />
              <span style={{
                position: 'absolute',
                top: '9px',
                right: '9px',
                width: '8px',
                height: '8px',
                backgroundColor: '#dc2626',
                borderRadius: '50%'
              }}></span>
            </button>

            <article style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#ffffff',
              padding: '6px 20px 6px 8px',
              borderRadius: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <img 
                src="/imagenes/persona.jpg" 
                alt="Julio" 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #b4c878'
                }} 
              />
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <strong style={{ fontSize: '15px', fontWeight: '700', color: '#1a202c', lineHeight: '1.2' }}>
                  Julio
                </strong>
                <small style={{ fontSize: '12px', color: '#718096', lineHeight: '1.2' }}>
                  Administrador
                </small>
              </span>
            </article>
          </section>
        </header>

        {/* VISTA 1: INICIO COMPLETO */}
        {vistaActual === 'inicio' && (
          <>
            <section 
              style={{ 
                backgroundImage: `linear-gradient(rgba(45, 30, 20, 0.65), rgba(30, 20, 12, 0.8)), url('/imagenes/Cafe.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                padding: '36px 40px',
                color: '#fff',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}
            >
              <header>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#facc15', fontWeight: '700' }}>
                  PANEL ADMINISTRADOR
                </span>
                <h2 style={{ fontSize: '32px', margin: '8px 0 8px 0', fontWeight: '800', color: '#ffffff' }}>
                  Coffee + Vision Control
                </h2>
                <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#e2e8f0', maxWidth: '480px', lineHeight: '1.4' }}>
                  Supervisa las cuentas de usuario, revisa reportes de plagas y administra la plataforma cafetera de manera eficiente.
                </p>
                <button 
                  onClick={() => setVistaActual('usuarios')}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  + Registrar labor
                </button>
              </header>

              <article style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                padding: '20px 24px',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '200px'
              }}>
                <small style={{ fontSize: '12px', color: '#e2e8f0', display: 'block', marginBottom: '4px' }}>Salud del sistema</small>
                <strong style={{ fontSize: '36px', fontWeight: '800', color: '#ffffff', display: 'block', lineHeight: '1' }}>94%</strong>
                <small style={{ fontSize: '11px', color: '#cbd5e1', display: 'block', marginTop: '6px' }}>Plataforma operando con total normalidad.</small>
              </article>
            </section>

            {/* KPIS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px', marginBottom: '24px' }}>
              <article style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <small style={{ fontSize: '12px', color: '#4a5568', fontWeight: '600', display: 'block' }}>Usuarios activos</small>
                  <strong style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '4px 0 0 0', display: 'block' }}>{usuarios.length}</strong>
                </span>
                <span style={{ background: '#eaf4e0', padding: '10px', borderRadius: '12px', color: '#4a6b22', display: 'flex' }}>
                  <Users size={22} />
                </span>
              </article>

              <article style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <small style={{ fontSize: '12px', color: '#4a5568', fontWeight: '600', display: 'block' }}>Cultivos monitoreados</small>
                  <strong style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '4px 0 0 0', display: 'block' }}>85</strong>
                </span>
                <span style={{ background: '#eaf4e0', padding: '10px', borderRadius: '12px', color: '#4a6b22', display: 'flex' }}>
                  <Package size={22} />
                </span>
              </article>

              <article style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <small style={{ fontSize: '12px', color: '#4a5568', fontWeight: '600', display: 'block' }}>Alertas de plagas</small>
                  <strong style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '4px 0 0 0', display: 'block' }}>12</strong>
                </span>
                <span style={{ background: '#eaf4e0', padding: '10px', borderRadius: '12px', color: '#4a6b22', display: 'flex' }}>
                  <Bug size={22} />
                </span>
              </article>

              <article style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <small style={{ fontSize: '12px', color: '#4a5568', fontWeight: '600', display: 'block' }}>Reportes generados</small>
                  <strong style={{ fontSize: '28px', fontWeight: '800', color: '#2d3748', margin: '4px 0 0 0', display: 'block' }}>34</strong>
                </span>
                <span style={{ background: '#eaf4e0', padding: '10px', borderRadius: '12px', color: '#4a6b22', display: 'flex' }}>
                  <FileText size={22} />
                </span>
              </article>
            </section>

            {/* FORMULARIO AGREGAR USUARIO */}
            <section style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <UserPlus size={18} color="#2e4a19" /> Agregar usuario
              </h2>
              <form onSubmit={handleAgregarUsuario} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  style={{ padding: '12px 16px', flex: 1, border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '14px' }}
                  required
                />
                <select
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', outline: 'none', fontSize: '14px', color: '#334155' }}
                >
                  <option value="caficultor">Caficultor</option>
                  <option value="administrador">Administrador</option>
                </select>
                <button type="submit" style={{ padding: '12px 28px', background: '#2e4a19', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  Guardar
                </button>
              </form>
            </section>

            {/* TABLA DE USUARIOS REGISTRADOS */}
            <section style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px', overflow: 'hidden' }}>
              <header style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                <h2 style={{ fontSize: '16px', color: '#2d3748', margin: 0, fontWeight: '700' }}>Usuarios Registrados</h2>
              </header>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#718096', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '14px 24px' }}>NOMBRE</th>
                    <th style={{ padding: '14px 24px' }}>ROL</th>
                    <th style={{ padding: '14px 24px' }}>ESTADO</th>
                    <th style={{ padding: '14px 24px', textAlign: 'right' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usr) => (
                    <tr key={usr.id} style={{ borderTop: '1px solid #f1f5f9', fontSize: '14px', color: '#2d3748' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600' }}>{usr.nombre}</td>
                      <td style={{ padding: '16px 24px', color: '#718096' }}>{usr.rol}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ background: '#eaf4e0', color: '#2e4a19', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                          {usr.estado}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleEliminarUsuario(usr.id, usr.nombre)}
                          style={{ padding: '6px 14px', background: '#edf2f7', color: '#718096', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ESTADÍSTICAS Y PLAGAS */}
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
              <article style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '20px', fontWeight: '700' }}>Estadísticas Generales</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {estadisticasGeneralesLocales.map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#2d3748' }}>
                        <span style={{ fontWeight: '500' }}>{item.etiqueta}</span>
                        <strong style={{ fontWeight: '700' }}>{item.porcentaje}%</strong>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.porcentaje}%`, background: '#2e4a19', height: '100%', borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                  <ShieldAlert size={18} color="#2e4a19" /> Estadísticas de Plagas
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {estadisticasPlagasLocales.map((item, idx) => (
                    <div key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#2d3748' }}>
                        <span style={{ fontWeight: '500' }}>{item.etiqueta}</span>
                        <strong style={{ fontWeight: '700' }}>{item.porcentaje}%</strong>
                      </div>
                      <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${item.porcentaje}%`, background: '#2e4a19', height: '100%', borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          </>
        )}

        {/* VISTA 2: USUARIOS */}
        {vistaActual === 'usuarios' && (
          <>
            <section style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <UserPlus size={18} color="#2e4a19" /> Agregar usuario
              </h2>
              <form onSubmit={handleAgregarUsuario} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  style={{ padding: '12px 16px', flex: 1, border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontSize: '14px' }}
                  required
                />
                <select
                  value={nuevoRol}
                  onChange={(e) => setNuevoRol(e.target.value)}
                  style={{ padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: '12px', background: '#fff', outline: 'none', fontSize: '14px', color: '#334155' }}
                >
                  <option value="caficultor">Caficultor</option>
                  <option value="administrador">Administrador</option>
                </select>
                <button type="submit" style={{ padding: '12px 28px', background: '#2e4a19', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}>
                  Guardar
                </button>
              </form>
            </section>

            <section style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px', overflow: 'hidden' }}>
              <header style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9' }}>
                <h2 style={{ fontSize: '16px', color: '#2d3748', margin: 0, fontWeight: '700' }}>Usuarios Registrados</h2>
              </header>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', color: '#718096', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '14px 24px' }}>NOMBRE</th>
                    <th style={{ padding: '14px 24px' }}>ROL</th>
                    <th style={{ padding: '14px 24px' }}>ESTADO</th>
                    <th style={{ padding: '14px 24px', textAlign: 'right' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usr) => (
                    <tr key={usr.id} style={{ borderTop: '1px solid #f1f5f9', fontSize: '14px', color: '#2d3748' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600' }}>{usr.nombre}</td>
                      <td style={{ padding: '16px 24px', color: '#718096' }}>{usr.rol}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ background: '#eaf4e0', color: '#2e4a19', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                          {usr.estado}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleEliminarUsuario(usr.id, usr.nombre)}
                          style={{ padding: '6px 14px', background: '#edf2f7', color: '#718096', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* VISTA 3: REPORTES */}
        {vistaActual === 'reportes' && (
          <section style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', color: '#2d3748', marginBottom: '8px', fontWeight: '700' }}>Reportes del Sistema</h2>
            <p style={{ color: '#718096', margin: 0, fontSize: '14px' }}>Módulo de auditoría, métricas y descargas de reportes generales del sistema.</p>
          </section>
        )}

        {/* VISTA 4: ESTADÍSTICAS */}
        {vistaActual === 'estadisticas' && (
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            
            <article style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '20px', fontWeight: '700' }}>Estadísticas Generales</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {estadisticasGeneralesLocales.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#2d3748' }}>
                      <span style={{ fontWeight: '500' }}>{item.etiqueta}</span>
                      <strong style={{ fontWeight: '700' }}>{item.porcentaje}%</strong>
                    </div>
                    <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.porcentaje}%`, background: '#2e4a19', height: '100%', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '16px', color: '#2d3748', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <ShieldAlert size={18} color="#2e4a19" /> Estadísticas de Plagas
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {estadisticasPlagasLocales.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: '#2d3748' }}>
                      <span style={{ fontWeight: '500' }}>{item.etiqueta}</span>
                      <strong style={{ fontWeight: '700' }}>{item.porcentaje}%</strong>
                    </div>
                    <div style={{ background: '#f1f5f9', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.porcentaje}%`, background: '#2e4a19', height: '100%', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </article>

          </section>
        )}

      </main>
    </section>
  );
}