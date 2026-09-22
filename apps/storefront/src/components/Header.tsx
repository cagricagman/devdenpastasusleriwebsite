'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Heart, Crown, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-[#ECE0DD] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#554244] hover:text-[#9C3A50] transition"
          aria-label="Menü"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9C3A50] to-[#7A2B3C] flex items-center justify-center shadow-md group-hover:scale-105 transition duration-300">
            <Crown className="w-5 h-5 text-[#FDC979]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-title text-xl md:text-2xl font-bold tracking-tight text-[#201A19] group-hover:text-[#9C3A50] transition">
              Wakko
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#78530A] -mt-1">
              Pasta Süsleri
            </span>
          </div>
        </Link>

        {/* Search Input */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pasta süsü, mum, topper veya ekipman ara..."
            className="w-full pl-4 pr-12 py-2.5 bg-white border border-[#DBC0C3] rounded-full text-sm focus:outline-none focus:border-[#9C3A50] focus:ring-2 focus:ring-[#9C3A50]/20 transition shadow-inner"
          />
          <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#9C3A50] text-white rounded-full flex items-center justify-center hover:bg-[#7A2B3C] transition">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Actions (Wishlist, Account, Cart) */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          <Link
            href="/favoriler"
            className="hidden sm:flex items-center space-x-1.5 text-[#554244] hover:text-[#9C3A50] transition p-2 rounded-lg hover:bg-[#FFF0F2]"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden lg:inline text-xs font-semibold">Favoriler</span>
          </Link>

          <Link
            href="/hesabim"
            className="flex items-center space-x-1.5 text-[#554244] hover:text-[#9C3A50] transition p-2 rounded-lg hover:bg-[#FFF0F2]"
          >
            <User className="w-5 h-5" />
            <span className="hidden lg:inline text-xs font-semibold">Giriş Yap</span>
          </Link>

          <Link
            href="/sepet"
            className="flex items-center space-x-2 bg-[#9C3A50] text-white px-4 py-2 rounded-full hover:bg-[#7A2B3C] transition shadow-md hover:shadow-lg"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-[#FDC979] text-[#78530A] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                2
              </span>
            </div>
            <span className="hidden sm:inline text-xs font-bold pl-1">Sepetim</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
