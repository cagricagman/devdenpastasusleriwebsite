'use client';

import React from 'react';
import { Instagram, Facebook, Phone, Sparkles } from 'lucide-react';

interface TopAnnouncementBarProps {
  announcementText?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  whatsappNumber?: string;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({
  announcementText = '✨ 300 TL Üzeri Siparişlerde Ücretsiz Kargo & Aynı Gün Teslimat!',
  instagramUrl = 'https://instagram.com/wakkopastasusleri',
  facebookUrl = 'https://facebook.com/wakkopastasusleri',
  whatsappNumber = '05559255000',
}) => {
  return (
    <div className="bg-[#201A19] text-[#FFF8F6] text-[11px] py-2 px-4 border-b border-[#332A2C]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left Announcement Text managed from Admin Settings */}
        <div className="flex items-center space-x-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#FDC979] animate-pulse" />
          <span>{announcementText}</span>
        </div>

        {/* Right Social Media & WhatsApp Links managed from Admin Settings */}
        <div className="flex items-center space-x-4">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-[#FDC979] transition"
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Instagram</span>
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-[#FDC979] transition"
          >
            <Facebook className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Facebook</span>
          </a>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 font-bold transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Destek</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
