export interface WhatsAppOrderDetails {
  orderNumber: string;
  fullName: string;
  phone: string;
  fullAddress: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  note?: string;
}

export function generateWhatsAppOrderMessage(order: WhatsAppOrderDetails): string {
  const itemsText = (order.items || [])
    .map(
      (item) =>
        `• ${item.quantity}x ${item.name} (₺${(item.price * item.quantity).toFixed(2)})`
    )
    .join('\n');

  return `🎂 *YENİ SİPARİŞ — WAKKO PASTA SÜSLERİ*
━━━━━━━━━━━━━━━━━━━━
📋 *Sipariş No:* #${order.orderNumber}
👤 *Müşteri:* ${order.fullName}
📞 *Telefon:* ${order.phone}
📍 *Teslimat Adresi:* ${order.fullAddress}

📦 *Sipariş Edilen Ürünler:*
${itemsText}

💵 *Ödeme Türü:* Kapıda Nakit Ödeme
💰 *Toplam Tutar:* ₺${order.total ? order.total.toFixed(2) : '0.00'}
📝 *Sipariş Notu:* ${order.note?.trim() || 'Belirtilmedi'}
━━━━━━━━━━━━━━━━━━━━
Siparişimin onaylanmasını ve hazırlanmasını rica ederim.`;
}

export function getWhatsAppUrl(order: WhatsAppOrderDetails, customPhone?: string): string {
  const phone = (customPhone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '905323300702').replace(/[^0-9]/g, '');
  const message = generateWhatsAppOrderMessage(order);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
