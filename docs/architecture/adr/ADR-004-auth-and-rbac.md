# ADR-004: Kimlik Doğrulama ve Rol Tabanlı Yetkilendirme (Auth & RBAC)

## Durum
Kabul Edildi (Accepted)

## Bağlam (Context)
Storefront tarafında müşteri girişi ile Admin panel yönetici girişi mantıksal olarak ayrılmalı, Admin tarafında detaylı yetkilendirme (Role-Based Access Control / Granular Permissions) uygulanmalıdır.

## Karar (Decision)
1. JWT (JSON Web Token) tabanlı authentication mekanizması kullanılacaktır.
2. Müşteri ve Admin token'ları ayrıştırılacaktır.
3. Admin kullanıcılarına roller (örn: Admin, Editör, Stok Yöneticisi) ve detaylı izinler (örn: `product.create`, `order.update`, `user.manage`) atanacaktır.
4. Yetki kontrolleri hem NestJS Guard'larında (Backend) hem de Admin UI tarafında (Frontend) çift taraflı uygulanacaktır.

## Sonuçlar (Consequences)
- **Olumlu:** Yüksek güvenlik, roller bazında dinamik yetkilendirme ve güvenli API erişimi sağlanır.
