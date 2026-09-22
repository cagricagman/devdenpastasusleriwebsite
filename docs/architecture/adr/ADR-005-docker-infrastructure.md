# ADR-005: Docker ve Yerel Geliştirme Altyapısı

## Durum
Kabul Edildi (Accepted)

## Bağlam (Context)
Geliştirme ortamında PostgreSQL veritabanı, Redis önbelleği ve MinIO nesne depolama servislerinin ortam bağımsız ve tek komutla ayağa kaldırılabilmesi gerekmektedir. Kullanıcının bilgisayarında Docker kuruludur.

## Karar (Decision)
1. `infra/docker/docker-compose.yml` dosyası tanımlanarak:
   - PostgreSQL (port 5432)
   - Redis (port 6379)
   - MinIO (port 9000 & 9001 - S3-compatible storage)
   servisleri tek komutla başlatılacaktır.
2. Tüm uygulamaların production build `Dockerfile` yapılandırmaları yazılacaktır.

## Sonuçlar (Consequences)
- **Olumlu:** Yerel bağımlılıklar izole edilir, geliştirme ve canlıya alma süreçleri kolaylaşır.
