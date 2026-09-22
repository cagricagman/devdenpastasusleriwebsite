import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Wakko Pasta Süsleri database...');

  // 1. Password Hashing
  const adminPasswordHash = await bcrypt.hash('Admin123!Pass', 10);
  const customerPasswordHash = await bcrypt.hash('Musteri123!Pass', 10);

  // 2. Users Seeding
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@wakkopastasusleri.local' },
    update: {},
    create: {
      email: 'admin@wakkopastasusleri.local',
      passwordHash: adminPasswordHash,
      firstName: 'Yönetici',
      lastName: 'Wakko',
      phone: '+90 532 000 0000',
      role: Role.SUPER_ADMIN,
      isEmailVerified: true,
    },
  });

  const editorUser = await prisma.user.upsert({
    where: { email: 'editor@wakkopastasusleri.local' },
    update: {},
    create: {
      email: 'editor@wakkopastasusleri.local',
      passwordHash: adminPasswordHash,
      firstName: 'Editör',
      lastName: 'Pastacı',
      phone: '+90 532 000 0001',
      role: Role.EDITOR,
      isEmailVerified: true,
    },
  });

  const mainCustomer = await prisma.user.upsert({
    where: { email: 'musteri@wakkopastasusleri.local' },
    update: {},
    create: {
      email: 'musteri@wakkopastasusleri.local',
      passwordHash: customerPasswordHash,
      firstName: 'Ayşe',
      lastName: 'Yılmaz',
      phone: '+90 555 123 4567',
      role: Role.CUSTOMER,
      isEmailVerified: true,
    },
  });

  console.log('✅ Users seeded successfully.');

  // 3. Permissions Seeding
  const permissions = [
    { role: Role.SUPER_ADMIN, permission: 'product.read' },
    { role: Role.SUPER_ADMIN, permission: 'product.create' },
    { role: Role.SUPER_ADMIN, permission: 'product.update' },
    { role: Role.SUPER_ADMIN, permission: 'product.delete' },
    { role: Role.SUPER_ADMIN, permission: 'inventory.read' },
    { role: Role.SUPER_ADMIN, permission: 'inventory.update' },
    { role: Role.SUPER_ADMIN, permission: 'order.read' },
    { role: Role.SUPER_ADMIN, permission: 'order.update' },
    { role: Role.SUPER_ADMIN, permission: 'team.manage' },
    { role: Role.SUPER_ADMIN, permission: 'settings.update' },
    { role: Role.EDITOR, permission: 'product.read' },
    { role: Role.EDITOR, permission: 'product.create' },
    { role: Role.EDITOR, permission: 'product.update' },
  ];

  for (const perm of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        role_permission: {
          role: perm.role,
          permission: perm.permission,
        },
      },
      update: {},
      create: perm,
    });
  }

  // 4. Categories Seeding
  const categoriesData = [
    {
      name: 'Pasta Süsleri',
      slug: 'pasta-susleri',
      description: 'Doğum günü, nişan ve özel günler için en şık pasta süsleri ve topper figürleri.',
      imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
      seoTitle: 'Pasta Süsleri ve Topper Modelleri | Wakko Pasta Süsleri',
      seoDescription: 'En kaliteli pasta süsleri, figürler ve topper çeşitleri uygun fiyatlarla Wakko Pasta Süsleri markasında!',
      sortOrder: 1,
    },
    {
      name: 'Standlı Pasta Süsleri',
      slug: 'standli-pasta-susleri',
      description: 'Lüks 3D standlı ve çubuklu özel tasarım pasta süsleri.',
      imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
      seoTitle: 'Standlı Pasta Süsleri ve Dekorasyonlar | Wakko Pasta Süsleri',
      seoDescription: 'Lüks standlı pasta süsleri ile kutlamalarınıza zarafet katın.',
      sortOrder: 2,
    },
    {
      name: 'Pasta Üstü Dekorasyonlar',
      slug: 'pasta-ustu-dekorasyonlar',
      description: 'Yenebilir figürler, inci boncuklar, kelebek ve çiçek süslemeleri.',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
      seoTitle: 'Pasta Üstü Dekorasyon Ürünleri | Wakko Pasta Süsleri',
      seoDescription: 'Yaratıcı pasta üstü süslemeleri ve figür detayları.',
      sortOrder: 3,
    },
    {
      name: 'Pasta Mumları',
      slug: 'pasta-mumlari',
      description: 'Rakamlı mumlar, simli uzun mumlar ve şampanya konfeti mumları.',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
      seoTitle: 'Doğum Günü Pasta Mumları | Wakko Pasta Süsleri',
      seoDescription: 'Özel tasarım doğum günü mumları ve konfeti mumlar.',
      sortOrder: 4,
    },
    {
      name: 'Taçlar ve Prenses Aksesuarları',
      slug: 'taclar-ve-prenses-aksesuarlari',
      description: 'Pasta üstüne koyulabilen mini metal taçlar ve prenses figürleri.',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
      seoTitle: 'Pasta Üstü Taç ve Aksesuarlar | Wakko Pasta Süsleri',
      seoDescription: 'Altın ve gümüş renkli lüks minyatür pasta taçları.',
      sortOrder: 5,
    },
    {
      name: 'Şekerlemeler & Inciler',
      slug: 'sekerlemeler-ve-inciler',
      description: 'Renkli drageler, yenebilir inciler ve süsleme şekerleri.',
      imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
      seoTitle: 'Yenebilir Pasta İncileri ve Şekerlemeler | Wakko Pasta Süsleri',
      seoDescription: 'Pastalarınızı süsleyecek yenebilir inciler ve renkli drageler.',
      sortOrder: 6,
    },
    {
      name: 'Pasta Ekipmanları & Duy Takımları',
      slug: 'pasta-ekipmanlari',
      description: 'Sıkma torbaları, paslanmaz duy uçları, krema spatulaları.',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600',
      seoTitle: 'Profesyonel Pastacılık Ekipmanları | Wakko Pasta Süsleri',
      seoDescription: 'Evde ve restoranda profesyonel pastacılık için ihtiyacınız olan her şey.',
      sortOrder: 7,
    },
    {
      name: 'Renkli Gıda Boyaları',
      slug: 'renkli-gida-boyalari',
      description: 'Jel gıda boyaları, tozu boyalar ve sprey sim süsler.',
      imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600',
      seoTitle: 'Pastacılık Jel ve Toz Gıda Boyası | Wakko Pasta Süsleri',
      seoDescription: 'Yoğun pigmente sahip kaliteli jel ve toz gıda boyaları.',
      sortOrder: 8,
    },
  ];

  const categories: Record<string, string> = {};
  for (const catData of categoriesData) {
    const cat = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {},
      create: catData,
    });
    categories[catData.slug] = cat.id;
  }

  console.log('✅ Categories seeded successfully.');

  // 5. Products & Orders (Left completely empty for clean real database testing)
  console.log('ℹ️ Clean database mode: No fake products or fake orders seeded.');

  // 6. Payment Methods Seeding
  await prisma.paymentMethodRecord.upsert({
    where: { code: 'CASH_ON_DELIVERY' },
    update: {},
    create: {
      code: 'CASH_ON_DELIVERY',
      title: 'Kapıda Nakit veya Kredi Kartı ile Ödeme',
      description: 'Siparişiniz kargo görevlisi tarafından teslim edilirken kapıda nakit veya pos cihazı ile ödeme yapabilirsiniz.',
      isActive: true,
      extraFee: 15.00,
    },
  });

  console.log('✅ Payment Methods seeded.');

  // 8. Company Settings
  const settings = [
    { key: 'site_title', value: 'Wakko Pasta Süsleri — Lüks Pasta Dekorasyonu & Aksesuarları', description: 'Site ana başlığı' },
    { key: 'contact_email', value: 'info@wakkopastasusleri.com', description: 'İletişim e-postası' },
    { key: 'contact_phone', value: '+90 (212) 555 9255', description: 'Müşteri hizmetleri telefonu' },
    { key: 'contact_address', value: 'İstoç Toptancılar Çarşısı 15. Ada No: 44, Bağcılar / İstanbul', description: 'Firma adresi' },
    { key: 'instagram_url', value: 'https://instagram.com/wakkopastasusleri', description: 'Instagram linki' },
    { key: 'facebook_url', value: 'https://facebook.com/wakkopastasusleri', description: 'Facebook linki' },
    { key: 'free_shipping_threshold', value: '300', description: 'Ücretsiz kargo alt limiti (TL)' },
  ];

  for (const s of settings) {
    await prisma.companySetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log('✅ Company Settings seeded.');

  // 9. FAQ Items
  const faqs = [
    { question: 'Siparişlerim ne zaman kargoya verilir?', answer: 'Hafta içi saat 15:00a kadar verilen siparişler aynı gün kargoya teslim edilmektedir.' },
    { question: 'Kapıda ödeme imkanı var mıdır?', answer: 'Evet! Kapıda ister nakit ister kredi kartınızla güvenle ödeme yapabilirsiniz.' },
    { question: 'Ürünlerin gıda ile teması uygun mudur?', answer: 'Tüm pleksi, ahşap ve metal pasta süslerimiz gıda ile temasa uygun sertifikalı malzemelerden üretilmektedir.' },
  ];

  for (const faq of faqs) {
    await prisma.faqItem.create({ data: faq });
  }

  console.log('✅ FAQ Items seeded.');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
