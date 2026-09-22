'use client';

import React from 'react';
import { Search, Bell, Sparkles } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      {/* Search Input */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Sipariş no, ürün adı veya müşteri ara..."
          className="w-full pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50] focus:ring-2 focus:ring-[#9C3A50]/20 transition"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Status Pill */}
        <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Sistem Aktif (API v1)</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#9C3A50] rounded-full" />
        </button>

        {/* System Info */}
        <div className="flex items-center space-x-2 border-l border-slate-200 pl-4 text-xs">
          <Sparkles className="w-4 h-4 text-[#9C3A50]" />
          <span className="font-semibold text-slate-700">Wakko Pasta Süsleri v1.0</span>
        </div>
      </div>
    </header>
  );
};
