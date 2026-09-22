import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { AdminLayoutShell } from '@/components/AdminLayoutShell';

export const metadata: Metadata = {
  title: 'Wakko Pasta Süsleri — Yönetim Paneli',
  description: 'Wakko Pasta Süsleri e-ticaret yönetim paneli, sipariş takibi, ürün ve stok yönetimi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" suppressHydrationWarning>
        <AdminLayoutShell>{children}</AdminLayoutShell>
      </body>
    </html>
  );
}
