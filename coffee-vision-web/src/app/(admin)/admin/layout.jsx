import React from 'react';
import SidebarAdmin from '@/components/layout/SidebarAdmin';

export default function AdminLayout({ children }) {
  return (
    <section style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f0', margin: 0, padding: 0 }}>
      <SidebarAdmin rutaActual="inicio" />
      {children}
    </section>
  );
}