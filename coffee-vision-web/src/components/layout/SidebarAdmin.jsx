"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, FileText, BarChart2, AlertTriangle } from 'lucide-react';

export default function SidebarAdmin() {
  const pathname = usePathname();

  const menuItems = [
    { id: 'inicio', label: 'Inicio', href: '/admin', icon: Home },
    { id: 'usuarios', label: 'Usuarios', href: '/admin/usuarios', icon: Users },
    { id: 'reportes', label: 'Reportes', href: '/admin/metricas', icon: FileText },
    { id: 'estadisticas', label: 'Estadísticas', href: '/admin/plagas-ia', icon: BarChart2 },
  ];

  return (
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
      fontFamily: 'sans-serif',
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
            const activo = pathname === item.href;
            return (
              <li key={item.id} style={{ width: '100%', display: 'flex' }}>
                <Link
                  href={item.href}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    backgroundColor: activo ? '#eaf4e0' : 'transparent',
                    color: activo ? '#2e4a19' : '#4a5568',
                    fontWeight: activo ? '700' : '600',
                    fontSize: '15px'
                  }}
                >
                  <IconComponent size={20} color={activo ? '#2e4a19' : '#718096'} />
                  {item.label}
                </Link>
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
  );
}