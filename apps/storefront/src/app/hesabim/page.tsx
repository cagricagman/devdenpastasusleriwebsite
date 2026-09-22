import React from 'react';
import Link from 'next/link';
import { User, Lock, Mail, ArrowRight, Crown } from 'lucide-react';

export default function AccountPage(): React.JSX.Element {
  return (
    <div className="bg-[#FFF8F6] min-h-screen py-14 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-[#ECE0DD] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#9C3A50] text-[#FDC979] mx-auto flex items-center justify-center shadow-md">
            <Crown className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-serif-title text-2xl font-bold text-[#201A19]">Müşteri Girişi</h1>
            <p className="text-xs text-[#554244] mt-1">Wakko Pasta Süsleri hesabınıza giriş yapın</p>
          </div>

          <form className="space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-[#201A19] block mb-1">E-Posta Adresi</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="musteri@wakkopastasusleri.local"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
                />
                <Mail className="w-4 h-4 text-[#554244] absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#201A19] block mb-1">Şifre</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FFF8F6] border border-[#ECE0DD] rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
                />
                <Lock className="w-4 h-4 text-[#554244] absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs py-3.5 rounded-full shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>Giriş Yap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#ECE0DD] text-xs text-[#554244]">
            <span>Hesabınız yok mu? </span>
            <button className="font-bold text-[#9C3A50] hover:underline">Hemen Kayıt Olun</button>
          </div>
        </div>
      </div>
    </div>
  );
}
