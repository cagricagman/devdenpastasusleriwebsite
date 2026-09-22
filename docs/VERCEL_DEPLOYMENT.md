# 🚀 Vercel Deployment Rehberi — Wakko Pasta Süsleri

Bu monorepo projesini Vercel üzerinde 1 dakika içinde canlıya alabilirsiniz.

---

## 🛍️ 1. Müşteri Sitesi (Storefront) Dağıtımı

1. [Vercel Dashboard](https://vercel.com/dashboard) sayfasına gidin ve **"Add New..." ➔ "Project"** seçin.
2. `devdenpastasusleriwebsite` GitHub reposunu seçin ve **"Import"** butonuna tıklayın.
3. **Project Name:** `wakko-pasta-susleri` (veya istediğiniz bir isim)
4. **Root Directory:** Edit butonuna basıp **`apps/storefront`** seçin.
5. **Build and Output Settings:** Vercel Next.js'i otomatik tanıyacaktır (Herhangi bir ayarı değiştirmeye gerek yoktur).
6. **Environment Variables:**
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `905323300702`
   - `NEXT_PUBLIC_API_URL`: (Backend API adresiniz, örn: `https://api.wakkopastasusleri.com/api/v1` veya test aşamasında yerel/staging URL'niz)
7. **"Deploy"** butonuna tıklayın. 

Tebrikler! Müşteri siteniz `wakko-pasta-susleri.vercel.app` üzerinden canlıya geçecektir.

---

## ⚙️ 2. Admin Yönetim Paneli Dağıtımı

1. Vercel Dashboard'da tekrar **"Add New..." ➔ "Project"** seçin.
2. Yine aynı `devdenpastasusleriwebsite` reposunu import edin.
3. **Project Name:** `wakko-admin`
4. **Root Directory:** **`apps/admin`** seçin.
5. **Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: (Backend API adresiniz)
6. **"Deploy"** butonuna tıklayın.

Admin paneliniz `wakko-admin.vercel.app` adresinde yayına girecektir.

---

## ⚡ Turborepo & Shared Paketler Notu
Vercel, Next.js ve Turborepo'yu varsayılan olarak destekler. `apps/storefront` veya `apps/admin` derlenirken ihtiyaç duyulan ortak `@wakko/ui`, `@wakko/types` ve `@wakko/design-tokens` paketleri Turborepo tarafından otomatik olarak önceden derlenip entegre edilir.
