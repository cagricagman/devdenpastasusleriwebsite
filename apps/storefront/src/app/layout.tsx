import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { CategoryNav } from '@/components/CategoryNav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Wakko Pasta Süsleri — Lüks Pasta Dekorasyonu & Aksesuarları',
  description: 'Doğum günü, nişan ve özel kutlamalarınız için lüks pleksi pasta süsleri, topperlar, mumlar, yenebilir inciler ve pastacılık aksesuarları.',
  keywords: 'pasta süsü, pasta topper, happy birthday topper, doğum günü mumu, pleksi süs, pastacılık malzemeleri, wakko pasta süsleri',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#FFF8F6]" suppressHydrationWarning>
        <AnnouncementBar />
        <Header />
        <CategoryNav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
