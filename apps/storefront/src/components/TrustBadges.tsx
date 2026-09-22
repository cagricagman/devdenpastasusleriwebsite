'use client';

import React from 'react';
import { Truck, ShieldCheck, CreditCard, Headphones } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Hızlı & Ücretsiz Kargo',
    desc: '300 TL üzeri siparişlerde aynı gün ücretsiz kargo imkanı.',
  },
  {
    icon: ShieldCheck,
    title: '%100 Gıda Uyumlu',
    desc: 'Sertifikalı, sağlığa uygun ve kaliteli süsleme malzemeleri.',
  },
  {
    icon: CreditCard,
    title: 'Kapıda Ödeme Kolaylığı',
    desc: 'İster nakit ister kredi kartınızla kapıda güvenle ödeyin.',
  },
  {
    icon: Headphones,
    title: '7/24 Müşteri Desteği',
    desc: 'Özel sipariş ve sorularınız için her zaman yanınızdayız.',
  },
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-10 bg-[#FFF0F2]/50 border-b border-[#ECE0DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="flex items-start space-x-3.5 p-3 rounded-xl bg-white/60 backdrop-blur-xs border border-[#FFD9DE]/60">
                <div className="p-3 bg-[#9C3A50] text-white rounded-full shadow-sm shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-title text-sm font-bold text-[#201A19]">{b.title}</h4>
                  <p className="text-xs text-[#554244] mt-0.5 leading-snug">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
