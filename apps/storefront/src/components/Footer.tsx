'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Phone, Mail, MapPin, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#201A19] text-white pt-14 pb-8 border-t-4 border-[#9C3A50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#9C3A50] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#FDC979]" />
              </div>
              <span className="font-serif-title text-2xl font-bold tracking-tight text-white">
                Wakko <span className="text-[#FDC979] text-sm uppercase block font-sans">Pasta Süsleri</span>
              </span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              Wakko Pasta Süsleri, doğum günü, nişan, düğün ve özel kutlamalarınız için lüks pleksi topperlar, yenebilir dekorasyonlar, mumlar ve profesyonel pastacılık ekipmanları sunar.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9C3A50] flex items-center justify-center text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#9C3A50] flex items-center justify-center text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.592 9 4.889V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-title text-sm font-bold text-[#FDC979] uppercase tracking-wider mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/urunler" className="hover:text-[#FDC979] transition">Tüm Ürünler</Link></li>
              <li><Link href="/kategori/pasta-susleri" className="hover:text-[#FDC979] transition">Pasta Süsleri & Topperlar</Link></li>
              <li><Link href="/kategori/standli-pasta-susleri" className="hover:text-[#FDC979] transition">Standlı Süsler</Link></li>
              <li><Link href="/kategori/pasta-mumlari" className="hover:text-[#FDC979] transition">Doğum Günü Mumları</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-[#FDC979] transition">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-serif-title text-sm font-bold text-[#FDC979] uppercase tracking-wider mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li><Link href="/siparis-takibi" className="hover:text-[#FDC979] transition">Sipariş Takibi</Link></li>
              <li><Link href="/teslimat-ve-kargo" className="hover:text-[#FDC979] transition">Teslimat & Kargo</Link></li>
              <li><Link href="/iade-kosullari" className="hover:text-[#FDC979] transition">İade & Değişim</Link></li>
              <li><Link href="/sss" className="hover:text-[#FDC979] transition">Sıkça Sorulan Sorular</Link></li>
              <li><Link href="/iletisim" className="hover:text-[#FDC979] transition">İletişim</Link></li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div>
            <h4 className="font-serif-title text-sm font-bold text-[#FDC979] uppercase tracking-wider mb-4">İletişim & Bülten</h4>
            <ul className="space-y-2 text-xs text-white/80 mb-4">
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#FDC979]" />
                <span>+90 (532) 330 07 02</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#FDC979]" />
                <span>info@wakkopastasusleri.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#FDC979] shrink-0 mt-0.5" />
                <span>İstoç 15. Ada No: 44, Bağcılar / İstanbul</span>
              </li>
            </ul>

            <div className="relative">
              <input
                type="email"
                placeholder="E-posta adresiniz..."
                className="w-full pl-3 pr-10 py-2 bg-white/10 border border-white/20 rounded-lg text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#9C3A50]"
              />
              <button className="absolute right-1 top-1 bottom-1 px-3 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white rounded-md transition flex items-center justify-center">
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 Wakko Pasta Süsleri. Tüm Hakları Saklıdır.</p>
          <div className="flex space-x-4">
            <span>Gizlilik Politikası</span>
            <span>Kullanım Koşulları</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
