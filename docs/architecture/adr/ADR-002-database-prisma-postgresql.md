# ADR-002: Veritabanı ve ORM Seçimi (PostgreSQL & Prisma)

## Durum
Kabul Edildi (Accepted)

## Bağlam (Context)
Sipariş, ürün varyasyonları, stok hareketleri ve müşteri verilerinin tutarlılığı (ACID) kritik önem taşımaktadır. Ayrıca dinamik SEO slug'ları ve geçmiş sipariş verilerinin korunması (snapshotting) gerekmektedir.

## Karar (Decision)
1. Veritabanı motoru olarak **PostgreSQL** seçilmiştir.
2. ORM katmanı olarak **Prisma ORM** kullanılacaktır.
3. Schema değişiklikleri sürüm kontrollü `prisma migrate` ile yönetilecektir.
4. Ürün fiyatı veya adı gelecekte değişse dahi, eski siparişlerin etkilenmemesi için `OrderItem` tablosunda snapshot alanları (`productNameSnapshot`, `unitPriceSnapshot`) tutulacaktır.

## Sonuçlar (Consequences)
- **Olumlu:** %100 tip güvenliği, güvenli veri ilişkileri ve hızlı migration süreci sağlanır.
- **Olumsuz:** Şema değişikliklerinde migration dosyalarının dikkatle yönetilmesi gerekir.
