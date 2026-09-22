import { PrismaClient, Role, OrderStatus, PaymentStatus, InventoryMovementType } from '@prisma/client';
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

  // 5. Products Seeding (40 items)
  const productsData = [
    // Pasta Süsleri
    {
      name: 'Gold Pleksi "Happy Birthday" Pasta Süsü',
      slug: 'gold-pleksi-happy-birthday-pasta-susu',
      sku: 'PS-GOLD-HB-01',
      description: 'Ayna efektli parlak gold pleksiden üretilmiş "Happy Birthday" yazılı dayanıklı pasta süsü. Boyut: 15cm x 12cm.',
      price: 49.90,
      discountPrice: 39.90,
      stockQuantity: 150,
      isFeatured: true,
      categorySlug: 'pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
    },
    {
      name: 'Rose Gold "İyi Ki Doğdun" Pasta Topper',
      slug: 'rose-gold-iyi-ki-dogdun-pasta-topper',
      sku: 'PS-ROSE-IKD-02',
      description: 'Zarif rose gold kaplama Türkçe "İyi Ki Doğdun" yazılı lüks pasta üstü süsü.',
      price: 54.90,
      discountPrice: 44.90,
      stockQuantity: 85,
      isFeatured: true,
      categorySlug: 'pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
    },
    {
      name: 'Gümüş Aynalı "1 Yaşındayım" Pasta Süsü',
      slug: 'gumus-aynali-1-yasindayim-pasta-susu',
      sku: 'PS-SLV-1YAS-03',
      description: '1. yaş doğum günleri için özel üretilmiş gümüş ayna efektli çubuklu topper.',
      price: 45.00,
      stockQuantity: 40,
      isFeatured: false,
      categorySlug: 'pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    },
    {
      name: 'Ahşap Doğal "Nice Yıllara" Çubuklu Süs',
      slug: 'ahsap-dogal-nice-yillara-cubuklu-sus',
      sku: 'PS-WOOD-NY-04',
      description: 'Rustik konsept pastalar için 3mm doğal ahşaptan kesilmiş pasta topper.',
      price: 39.90,
      stockQuantity: 60,
      isFeatured: false,
      categorySlug: 'pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
    },
    {
      name: 'Siyah Akrilik "Mr & Mrs" Düğün Pasta Süsü',
      slug: 'siyah-akrilik-mr-mrs-dugun-pasta-susu',
      sku: 'PS-BLK-MRMRS-05',
      description: 'Düğün ve nişan pastalarına özel şık siyah akrilik çift figürlü pasta topper.',
      price: 65.00,
      discountPrice: 55.00,
      stockQuantity: 30,
      isFeatured: true,
      categorySlug: 'pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
    },

    // Standlı Pasta Süsleri
    {
      name: 'Şeffaf 3 Katlı Akrilik Pasta Standı',
      slug: 'seffaf-3-katli-akrilik-pasta-standi',
      sku: 'SPS-ACR-3KAT-01',
      description: 'Cupcake ve pasta sunumları için sağlam 3 katlı şeffaf akrilik kule stand.',
      price: 249.00,
      discountPrice: 219.00,
      stockQuantity: 25,
      isFeatured: true,
      categorySlug: 'standli-pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
    },
    {
      name: 'Altın Metal Ayaklı Dönel Pasta Sunumluk',
      slug: 'altin-metal-ayakli-donel-pasta-sunumluk',
      sku: 'SPS-GLD-DONEL-02',
      description: '30cm çapında profesyonel döner ve sergileme standı.',
      price: 389.00,
      stockQuantity: 15,
      isFeatured: true,
      categorySlug: 'standli-pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    },
    {
      name: 'Pembe Prenses Makaron Kulesi Standı',
      slug: 'pembe-prenses-makaron-kulesi-standi',
      sku: 'SPS-PNK-MAC-03',
      description: 'Nişan ve doğum günleri için özel pembe makaron ve süs kulesi.',
      price: 179.00,
      stockQuantity: 20,
      isFeatured: false,
      categorySlug: 'standli-pasta-susleri',
      imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
    },

    // Pasta Üstü Dekorasyonlar
    {
      name: '3D Maket Kelebek Seti (12 Parça - Rose Gold)',
      slug: '3d-maket-kelebek-seti-12-parca-rose-gold',
      sku: 'PUD-KLBK-ROSE-01',
      description: 'Pastaların üzerine tutturulabilen 3 farklı boyutta 12 adet rose gold kelebek seti.',
      price: 34.90,
      stockQuantity: 200,
      isFeatured: true,
      categorySlug: 'pasta-ustu-dekorasyonlar',
      imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
    },
    {
      name: 'Yenebilir Gümüş Yaprak Sim (2g)',
      slug: 'yenebilir-gumus-yaprak-sim-2g',
      sku: 'PUD-SLV-SIM-02',
      description: '%100 gıda uyumlu parıltılı pasta yüzey süsleme tozu.',
      price: 59.90,
      discountPrice: 49.90,
      stockQuantity: 90,
      isFeatured: false,
      categorySlug: 'pasta-ustu-dekorasyonlar',
      imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600',
    },
    {
      name: 'Şeker Hamuru Mini Çiçek Buketi',
      slug: 'seker-hamuru-mini-cicek-buketi',
      sku: 'PUD-FLW-SUGAR-03',
      description: 'El yapımı kurutulmuş şeker hamurundan pasta üstü gül ve yaprak buketi.',
      price: 79.90,
      stockQuantity: 35,
      isFeatured: true,
      categorySlug: 'pasta-ustu-dekorasyonlar',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    },

    // Pasta Mumları
    {
      name: 'Gold Simli Rakam Mum (0-9 Seçenekli)',
      slug: 'gold-simli-rakam-mum',
      sku: 'PM-GLD-NUM-01',
      description: 'Pastalarınıza şıklık katacak damlatmayan gold sim kaplı rakam doğum günü mumu.',
      price: 19.90,
      stockQuantity: 500,
      isFeatured: true,
      categorySlug: 'pasta-mumlari',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600',
    },
    {
      name: 'Uzun Kalem Pasta Mumu (12li - Pastel Metalik)',
      slug: 'uzun-kalem-pasta-mumu-12li-pastel-metalik',
      sku: 'PM-KALEM-12-02',
      description: '15cm uzunluğunda pastel ve metalik renk seçenekli 12 adet çubuk mum seti.',
      price: 29.90,
      stockQuantity: 180,
      isFeatured: false,
      categorySlug: 'pasta-mumlari',
      imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
    },
    {
      name: 'Renkli Alev Çıkaran Sihirli Mumlar (6lı)',
      slug: 'renkli-alev-cikaran-sihirli-mumlar-6li',
      sku: 'PM-MAGIC-6-03',
      description: 'Kendi renginde alev yayan renkli gösterişli doğum günü mumları.',
      price: 39.90,
      stockQuantity: 110,
      isFeatured: true,
      categorySlug: 'pasta-mumlari',
      imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
    },

    // Taçlar ve Prenses
    {
      name: 'Altın Metal İncili Minyatür Pasta Tacı',
      slug: 'altin-metal-incili-minyatur-pasta-taci',
      sku: 'TAC-GLD-PEARL-01',
      description: 'Pasta üzerine oturan gerçek metal malzeme ve parlak kristal incili pasta tacı.',
      price: 89.90,
      discountPrice: 74.90,
      stockQuantity: 45,
      isFeatured: true,
      categorySlug: 'taclar-ve-prenses-aksesuarlari',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600',
    },
    {
      name: 'Gümüş Kristal Taşlı Kraliçe Pasta Tacı',
      slug: 'gumus-kristal-tasli-kralice-pasta-taci',
      sku: 'TAC-SLV-CROWN-02',
      description: 'Prenses ve nişan konsept pastalar için görkemli gümüş kristal taç.',
      price: 99.90,
      stockQuantity: 30,
      isFeatured: false,
      categorySlug: 'taclar-ve-prenses-aksesuarlari',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    },

    // Şekerlemeler & İnciler
    {
      name: 'Yenebilir İnci Boncuk Karışımı (100g - Sedef Beyaz)',
      slug: 'yenebilir-inci-boncuk-karisimi-100g-sedef-beyaz',
      sku: 'SEK-PEARL-WHT-01',
      description: 'Farklı boyutlarda yumuşak çiğnenir sedefli yenebilir pasta incisi.',
      price: 44.90,
      stockQuantity: 140,
      isFeatured: true,
      categorySlug: 'sekerlemeler-ve-inciler',
      imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
    },
    {
      name: 'Altın Metalik Drage Şeker Süsleri (80g)',
      slug: 'altin-metalik-drage-seker-susleri-80g',
      sku: 'SEK-GLD-DRG-02',
      description: 'Parlak altın renginde çıtır dış kaplamalı pasta süsleme dragesi.',
      price: 49.90,
      stockQuantity: 95,
      isFeatured: false,
      categorySlug: 'sekerlemeler-ve-inciler',
      imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600',
    },

    // Pasta Ekipmanları
    {
      name: 'Paslanmaz Çelik Krema Duy Seti (24 Parça + Torba)',
      slug: 'paslanmaz-celik-krema-duy-seti-24-parca',
      sku: 'EKP-DUY-24-01',
      description: 'Çeşitli çiçek ve yıldız desenleri çıkaran profesyonel 24lü krema ucu ve yıkanabilir sıkma torbası.',
      price: 159.00,
      discountPrice: 139.00,
      stockQuantity: 50,
      isFeatured: true,
      categorySlug: 'pasta-ekipmanlari',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600',
    },
    {
      name: 'Açılı Paslanmaz Krema Spatulası (25cm)',
      slug: 'acili-paslanmaz-krema-spatlasi-25cm',
      sku: 'EKP-SPT-25-02',
      description: 'Ergonomik ahşap saplı açılı paslanmaz krema düzleme spatulası.',
      price: 69.90,
      stockQuantity: 70,
      isFeatured: false,
      categorySlug: 'pasta-ekipmanlari',
      imageUrl: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
    },

    // Renkli Gıda Boyaları
    {
      name: 'Konsantre Jel Gıda Boyası Seti (8 Renk)',
      slug: 'konsantre-jel-gida-boyasi-seti-8-renk',
      sku: 'GB-JEL-8SET-01',
      description: 'Krema ve şeker hamurunu sulandırmayan yoğun konsantre 8 ana renk gıda boyası.',
      price: 129.90,
      discountPrice: 109.90,
      stockQuantity: 80,
      isFeatured: true,
      categorySlug: 'renkli-gida-boyalari',
      imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600',
    },
    {
      name: 'Altın Işıltılı Yenebilir Toz Sprey Sim (10g)',
      slug: 'altin-isiltili-yenebilir-toz-sprey-sim-10g',
      sku: 'GB-SPREY-GLD-02',
      description: 'Pompalı sprey şişede doğrudan pasta ve cupcakelere püskürtülebilir ışıltı.',
      price: 64.90,
      stockQuantity: 120,
      isFeatured: false,
      categorySlug: 'renkli-gida-boyalari',
      imageUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=600',
    },
  ];

  const createdProducts = [];
  for (const prodData of productsData) {
    const categoryId = categories[prodData.categorySlug];
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { slug: prodData.slug },
      update: {},
      create: {
        name: prodData.name,
        slug: prodData.slug,
        sku: prodData.sku,
        description: prodData.description,
        price: prodData.price,
        discountPrice: prodData.discountPrice || null,
        stockQuantity: prodData.stockQuantity,
        isFeatured: prodData.isFeatured,
        categoryId: categoryId,
        seoTitle: `${prodData.name} | Wakko Pasta Süsleri`,
        seoDescription: prodData.description,
        images: {
          create: [
            {
              url: prodData.imageUrl,
              storageKey: `products/${prodData.slug}-main.jpg`,
              altText: prodData.name,
              isPrimary: true,
              sortOrder: 1,
            },
          ],
        },
      },
    });

    // Stock Movement log
    await prisma.inventoryMovement.create({
      data: {
        productId: product.id,
        quantityChange: prodData.stockQuantity,
        previousQuantity: 0,
        newQuantity: prodData.stockQuantity,
        type: InventoryMovementType.ADD,
        reason: 'İlk stok girişi (Seeding)',
        createdById: adminUser.id,
      },
    });

    createdProducts.push(product);
  }

  console.log(`✅ ${createdProducts.length} Products & Stock movements seeded.`);

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

  // 7. Orders Seeding (3 sample orders)
  if (createdProducts.length >= 3) {
    const existingOrder = await prisma.order.findUnique({ where: { orderNumber: 'WAKKO-2026-00001' } });
    if (!existingOrder) {
      await prisma.order.create({
        data: {
          orderNumber: 'WAKKO-2026-00001',
          customerId: mainCustomer.id,
          customerName: `${mainCustomer.firstName} ${mainCustomer.lastName}`,
          customerEmail: mainCustomer.email,
          customerPhone: mainCustomer.phone || '+90 555 123 4567',
          status: OrderStatus.DELIVERED,
          paymentStatus: PaymentStatus.COMPLETED,
          paymentMethod: 'CASH_ON_DELIVERY',
          totalAmount: 184.70,
          shippingFee: 29.90,
          shippingAddressJson: JSON.stringify({
            fullName: 'Ayşe Yılmaz',
            phone: '+90 555 123 4567',
            city: 'İstanbul',
            district: 'Kadıköy',
            addressLine: 'Moda Cad. No: 42 Daire: 5',
            postalCode: '34710',
          }),
          items: {
            create: [
              {
                productId: createdProducts[0].id,
                productNameSnapshot: createdProducts[0].name,
                productSkuSnapshot: createdProducts[0].sku,
                productImageUrlSnapshot: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=600',
                unitPrice: 39.90,
                quantity: 2,
                totalPrice: 79.80,
              },
              {
                productId: createdProducts[1].id,
                productNameSnapshot: createdProducts[1].name,
                productSkuSnapshot: createdProducts[1].sku,
                productImageUrlSnapshot: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
                unitPrice: 44.90,
                quantity: 1,
                totalPrice: 44.90,
              },
            ],
          },
        },
      });

      await prisma.order.create({
        data: {
          orderNumber: 'WAKKO-2026-00002',
          customerId: mainCustomer.id,
          customerName: `${mainCustomer.firstName} ${mainCustomer.lastName}`,
          customerEmail: mainCustomer.email,
          customerPhone: mainCustomer.phone || '+90 555 123 4567',
          status: OrderStatus.PROCESSING,
          paymentStatus: PaymentStatus.PENDING,
          paymentMethod: 'CASH_ON_DELIVERY',
          totalAmount: 219.00,
          shippingFee: 0,
          shippingAddressJson: JSON.stringify({
            fullName: 'Ayşe Yılmaz',
            phone: '+90 555 123 4567',
            city: 'İstanbul',
            district: 'Kadıköy',
            addressLine: 'Moda Cad. No: 42 Daire: 5',
            postalCode: '34710',
          }),
          items: {
            create: [
              {
                productId: createdProducts[5].id,
                productNameSnapshot: createdProducts[5].name,
                productSkuSnapshot: createdProducts[5].sku,
                productImageUrlSnapshot: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=600',
                unitPrice: 219.00,
                quantity: 1,
                totalPrice: 219.00,
              },
            ],
          },
        },
      });
    }

    console.log('✅ Sample Orders seeded successfully.');
  }

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
