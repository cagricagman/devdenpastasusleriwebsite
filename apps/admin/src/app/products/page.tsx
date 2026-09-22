'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  discountPrice?: number;
  stock: number;
  status: 'ACTIVE' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  image: string;
}

const initialProducts: ProductItem[] = [
  {
    id: 'prod-001',
    name: 'Gold Pleksi "Happy Birthday" Pasta Süsü',
    sku: 'GB-TOPPER-GLD-01',
    category: 'Pasta Süsleri & Topperlar',
    price: 49.90,
    discountPrice: 39.90,
    stock: 120,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=200',
  },
  {
    id: 'prod-002',
    name: 'Rose Gold "İyi Ki Doğdun" Pasta Topper',
    sku: 'GB-TOPPER-RG-02',
    category: 'Pasta Süsleri & Topperlar',
    price: 54.90,
    discountPrice: 44.90,
    stock: 85,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=200',
  },
  {
    id: 'prod-003',
    name: 'Altın Metal İncili Minyatür Pasta Tacı',
    sku: 'TAC-CROWN-GLD-01',
    category: 'Taçlar & Aksesuarlar',
    price: 89.90,
    discountPrice: 74.90,
    stock: 3,
    status: 'LOW_STOCK',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200',
  },
  {
    id: 'prod-004',
    name: '3D Maket Kelebek Seti (12 Parça - Rose Gold)',
    sku: 'DEC-BUTTERFLY-01',
    category: 'Pasta Üstü Dekorasyon',
    price: 34.90,
    stock: 45,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=200',
  },
  {
    id: 'prod-005',
    name: 'Altın Işıltılı Yenebilir Toz Sprey Sim (10g)',
    sku: 'GB-SPREY-GLD-02',
    category: 'Renkli Gıda Boyaları',
    price: 64.90,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200',
  },
  {
    id: 'prod-006',
    name: 'Şeffaf Akrilik Pasta Standı (3 Katlı)',
    sku: 'STD-ACRYLIC-03',
    category: 'Standlı Pasta Süsleri',
    price: 189.90,
    discountPrice: 159.90,
    stock: 12,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?w=200',
  },
];

export default function AdminProductsPage(): React.JSX.Element {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [deletingProduct, setDeletingProduct] = useState<ProductItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteConfirm = () => {
    if (!deletingProduct) return;
    setProducts(products.filter((p) => p.id !== deletingProduct.id));
    showNotification(`"${deletingProduct.name}" ürünü başarıyla silindi!`);
    setDeletingProduct(null);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#201A19] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#9C3A50]">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
            <Package className="w-4 h-4" />
            <span>Katalog Yönetimi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Ürün Listesi & Yönetimi ({products.length} Ürün)
          </h1>
        </div>

        <Link
          href="/products/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Ürün Ekle</span>
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Ürün adı veya SKU ile ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tüm Kategoriler</option>
            <option value="Pasta Süsleri & Topperlar">Pasta Süsleri & Topperlar</option>
            <option value="Taçlar & Aksesuarlar">Taçlar & Aksesuarlar</option>
            <option value="Pasta Üstü Dekorasyon">Pasta Üstü Dekorasyon</option>
            <option value="Renkli Gıda Boyaları">Renkli Gıda Boyaları</option>
            <option value="Standlı Pasta Süsleri">Standlı Pasta Süsleri</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ürün Bilgisi</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Fiyat</th>
                <th className="py-3.5 px-4">Stok Seviyesi</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-3">
                    <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                    <div>
                      <span className="block font-semibold text-slate-900">{product.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{product.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 font-semibold">{product.sku}</td>
                  <td className="py-3 px-4 text-slate-700 font-medium">{product.category}</td>
                  <td className="py-3 px-4">
                    {product.discountPrice ? (
                      <div>
                        <span className="font-extrabold text-[#9C3A50]">₺{product.discountPrice.toFixed(2)}</span>
                        <span className="text-[10px] text-slate-400 line-through block">₺{product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span className="font-extrabold text-slate-900">₺{product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{product.stock} Adet</td>
                  <td className="py-3 px-4">
                    {product.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        <span>Aktif</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Kritik Stok</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/products/${product.id}/edit`}
                        title="Düzenle"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-[#9C3A50] transition"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeletingProduct(product)}
                        title="Sil"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Toplam <strong className="text-slate-800">{filteredProducts.length}</strong> üründen{' '}
            <strong className="text-slate-800">
              {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)}
            </strong>{' '}
            arası gösteriliyor.
          </p>

          <div className="flex items-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Önceki</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition ${
                  currentPage === pageNum
                    ? 'bg-[#9C3A50] text-white shadow-xs'
                    : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 disabled:opacity-40 transition flex items-center space-x-1"
            >
              <span>Sonraki</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal Only */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Ürünü Silmek İstediğinize Emin Misiniz?</h3>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-slate-800">"{deletingProduct.name}"</strong> ürünü kalıcı olarak silinecektir. Bu işlem geri alınamaz.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Evet, Kesinlikle Sil</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
