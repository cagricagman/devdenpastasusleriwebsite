'use client';

import React from 'react';
import { Phone, Instagram, Facebook, Sparkles } from 'lucide-react';

interface AnnouncementBarProps {
  leftText?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  phone?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  leftText = '✨ 300 TL Üzeri Siparişlerde Ücretsiz Kargo & Aynı Gün Teslimat!',
  instagramUrl = 'https://instagram.com/wakkopastasusleri',
  facebookUrl = 'https://facebook.com/wakkopastasusleri',
  phone = '+90 (532) 330 07 02',
}) => {
  return (
    <div className="bg-[#201A19] text-white text-xs font-medium py-2 px-4 border-b border-[#332A2C]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Section: Social Icons + Admin Managed Text */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-[#FDC979]">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              title="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-white/30">|</span>

          <div className="flex items-center space-x-1.5 text-xs text-[#FFF8F6]">
            <Sparkles className="w-3.5 h-3.5 text-[#FDC979] animate-pulse" />
            <span>{leftText}</span>
          </div>
        </div>

        {/* Right Section: Customer Support Phone */}
        <div className="hidden sm:flex items-center space-x-4 text-[11px] text-white/80">
          <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="flex items-center space-x-1.5 hover:text-[#FDC979] transition">
            <Phone className="w-3.5 h-3.5 text-[#FDC979]" />
            <span>Destek: {phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
