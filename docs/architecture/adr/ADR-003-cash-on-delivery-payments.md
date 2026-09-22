# ADR-003: Kapıda Ödeme (CASH_ON_DELIVERY) ve Ödeme Abstraction'ı

## Durum
Kabul Edildi (Accepted)

## Bağlam (Context)
İlk aşamada sanal pos entegrasyonu (Iyzico, PayTR, Stripe vb.) istenmemekte, yalnızca Kapıda Ödeme (`CASH_ON_DELIVERY`) seçeneğinin aktif olması hedeflenmektedir. Ancak sistem gelecekte online ödeme sağlayıcılarına açık olmalıdır.

## Karar (Decision)
1. Ödeme sistemi domain kodundan bağımsız bir `PaymentMethod` interface'i arkasına gizlenecektir (Strategy Pattern).
2. İlk sürümde tek provider `CashOnDeliveryPaymentProvider` olacaktır.
3. Checkout akışında müşteri "Kapıda Ödeme"yi seçer ve sipariş `PENDING_PAYMENT` / `PROCESSING` durumuna geçer.

## Sonuçlar (Consequences)
- **Olumlu:** İlk sürüm hızlıca canlıya alınır ve gelecekte yeni ödeme sağlayıcısı eklendiğinde checkout kodunda değişiklik gerekmez.
