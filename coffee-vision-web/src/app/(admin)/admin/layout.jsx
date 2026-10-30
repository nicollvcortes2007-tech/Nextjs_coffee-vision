import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <section style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f7f0', margin: 0, padding: 0, width: '100%' }}>
      {children}
    </section>
  );
}