import './globals.css';
import ClientLayout from './client-layout';

export const metadata = {
  title: 'Uto Admin',
  description: 'UTO Advance Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
