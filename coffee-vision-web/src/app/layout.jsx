import "./globals.css";

export const metadata = {
  title: "Coffee+Vision",
  description: "Plataforma de apoyo para caficultores del Cauca",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
