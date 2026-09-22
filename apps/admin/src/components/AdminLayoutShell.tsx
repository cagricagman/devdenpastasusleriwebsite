'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Crown,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Boxes,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Search,
  Bell,
  Sparkles,
} from 'lucide-react';

const navItems = [
  { name: 'Özet Tablo (Dashboard)', href: '/', icon: LayoutDashboard },
  { name: 'Ürün Yönetimi', href: '/products', icon: Package },
  { name: 'Kategoriler', href: '/categories', icon: FolderTree },
  { name: 'Siparişler', href: '/orders', icon: ShoppingCart },
  { name: 'Stok & Depo', href: '/inventory', icon: Boxes },
  { name: 'Ekip Yönetimi', href: '/team', icon: Users },
  { name: 'Mağaza Ayarları', href: '/settings', icon: Settings },
];

export const AdminLayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 w-full relative">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex w-64 bg-[#1E191A] text-white flex-col h-screen sticky top-0 border-r border-[#332A2C] shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#332A2C] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9C3A50] to-[#7A2B3C] flex items-center justify-center shadow-md">
              <Crown className="w-5 h-5 text-[#FDC979]" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-tight text-white block">
                Wakko Admin
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#FDC979] block -mt-1 font-semibold">
                Yönetim Paneli
              </span>
            </div>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-3 mb-2">
            Ana Menü
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-[#9C3A50] text-white shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDC979]' : 'text-white/60'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Link & User Profile */}
        <div className="p-4 border-t border-[#332A2C] space-y-2">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition"
          >
            <span>Mağazaya Git</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FDC979]" />
          </a>

          <div className="pt-2 flex items-center justify-between px-3 text-xs text-white/60">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-[#9C3A50] flex items-center justify-center font-bold text-white text-[11px]">
                Y
              </div>
              <div>
                <p className="font-bold text-white text-[11px]">Yönetici Wakko</p>
                <p className="text-[10px] text-white/40">Super Admin</p>
              </div>
            </div>
            <button title="Çıkış Yap" className="text-white/40 hover:text-red-400 transition">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Overlay when open) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Sidebar */}
          <aside className="relative w-72 bg-[#1E191A] text-white flex flex-col h-full z-10 shadow-2xl border-r border-[#332A2C]">
            <div className="p-5 border-b border-[#332A2C] flex items-center justify-between">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#9C3A50] to-[#7A2B3C] flex items-center justify-center shadow-md">
                  <Crown className="w-5 h-5 text-[#FDC979]" />
                </div>
                <div>
                  <span className="font-serif text-lg font-bold tracking-tight text-white block">
                    Wakko Admin
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#FDC979] block -mt-1 font-semibold">
                    Yönetim Paneli
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-3 mb-2">
                Ana Menü
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition ${
                      isActive
                        ? 'bg-[#9C3A50] text-white shadow-md'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#FDC979]' : 'text-white/60'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#332A2C] space-y-3">
              <a
                href="http://localhost:3000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold transition"
              >
                <span>Mağazaya Git</span>
                <ExternalLink className="w-4 h-4 text-[#FDC979]" />
              </a>

              <div className="flex items-center justify-between px-3 text-xs text-white/60 pt-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#9C3A50] flex items-center justify-center font-bold text-white text-xs">
                    Y
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs">Yönetici Wakko</p>
                    <p className="text-[10px] text-white/40">Super Admin</p>
                  </div>
                </div>
                <button title="Çıkış Yap" className="text-white/40 hover:text-red-400 transition p-1">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header with Mobile Hamburger Menu */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
          <div className="flex items-center space-x-3">
            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Menüyü Aç"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Header Brand or Search */}
            <div className="relative w-44 sm:w-80">
              <input
                type="text"
                placeholder="Ara..."
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
              />
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-2.5 sm:left-3 top-2 sm:top-2.5" />
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="hidden lg:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Sistem Aktif</span>
            </div>

            <button className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#9C3A50] rounded-full" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 border-l border-slate-200 pl-4 text-xs">
              <Sparkles className="w-4 h-4 text-[#9C3A50]" />
              <span className="font-semibold text-slate-700">Wakko Admin v1.0</span>
            </div>
          </div>
        </header>

        {/* Page Body with Responsive Padding */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
