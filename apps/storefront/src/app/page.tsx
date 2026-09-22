import React from 'react';
import { HeroBanner } from '@/components/HeroBanner';
import { CategoryGrid } from '@/components/CategoryGrid';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { TrustBadges } from '@/components/TrustBadges';

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBadges />
    </>
  );
}
