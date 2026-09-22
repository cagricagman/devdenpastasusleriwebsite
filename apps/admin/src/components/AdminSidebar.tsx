'use client';

import React from 'react';
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
  ExternalLink
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

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1E191A] text-white flex flex-col h-screen sticky top-0 border-r border-[#332A2C]">
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

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-3 mb-2">
          Ana Menü
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

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

      {/* Quick Link to Storefront & Logout */}
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
  );
};
