# ADR-001: Monorepo Mimarisi ve Teknoloji Yığını Seçimi

## Durum
Kabul Edildi (Accepted)

## Bağlam (Context)
Birlik Pastacılık e-ticaret projesi, son kullanıcılar için bir Storefront ve yöneticiler için bir Admin Panel olmak üzere iki ayrı ön yüz uygulamasının yanı sıra merkezi bir REST API gerektirmektedir. Kod tekrarını önlemek, tasarım sistemini ve tipleri tek merkezden yönetmek gerekmektedir.

## Karar (Decision)
1. **Monorepo Altyapısı:** `pnpm` workspaces ve `Turborepo` kullanılacaktır.
2. **Frontend:** Next.js (App Router), React, TypeScript ve Tailwind CSS kullanılacaktır.
3. **Design System:** `@sweetdecor/ui` ve `@sweetdecor/design-tokens` paketleri monorepo içerisinde ortak kütüphane olarak geliştirilecektir.
4. **Backend:** NestJS (TypeScript, REST API) kullanılacaktır. Modüler monolit yapısı tercih edilecektir.

## Sonuçlar (Consequences)
- **Olumlu:** Tipler, tasarım token'ları ve ortak UI bileşenleri iki frontend arasında tek noktadan paylaşılır. Tek komutla build ve lint çalıştırılabilir.
- **Olumsuz:** Monorepo araçlarının ilk yapılandırma maliyeti vardır.
