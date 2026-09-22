'use client';

import React, { useState } from 'react';
import {
  FolderTree,
  Plus,
  Edit,
  Trash2,
  Layers,
  CheckCircle,
  X,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
  sortOrder: number;
}

const initialCategories: CategoryItem[] = [
  { id: 'cat-1', name: 'Pasta Süsleri & Topperlar', slug: 'pasta-susleri', productsCount: 120, sortOrder: 1 },
  { id: 'cat-2', name: 'Standlı Pasta Süsleri', slug: 'standli-pasta-susleri', productsCount: 45, sortOrder: 2 },
  { id: 'cat-3', name: 'Pasta Üstü Dekorasyon', slug: 'pasta-ustu-dekorasyon', productsCount: 38, sortOrder: 3 },
  { id: 'cat-4', name: 'Pasta Mumları', slug: 'pasta-mumlari', productsCount: 80, sortOrder: 4 },
  { id: 'cat-5', name: 'Taçlar & Aksesuarlar', slug: 'taclar-ve-aksesuarlar', productsCount: 25, sortOrder: 5 },
  { id: 'cat-6', name: 'Şekerlemeler & İnciler', slug: 'sekerlemeler-ve-inciler', productsCount: 60, sortOrder: 6 },
  { id: 'cat-7', name: 'Pastacılık Ekipmanları', slug: 'pastacilik-ekipmanlari', productsCount: 50, sortOrder: 7 },
  { id: 'cat-8', name: 'Renkli Gıda Boyaları', slug: 'renkli-gida-boyalari', productsCount: 30, sortOrder: 8 },
];

export default function AdminCategoriesPage(): React.JSX.Element {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<CategoryItem | null>(null);

  // Toast
  const [notification, setNotification] = useState<string | null>(null);
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const openAddModal = () => {
    setName('');
    setSlug('');
    setSortOrder((categories.length + 1).toString());
    setIsAddModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setSortOrder(cat.sortOrder.toString());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const generatedSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const orderNum = parseInt(sortOrder) || categories.length + 1;

    if (editingCategory) {
      setCategories(
        categories.map((c) =>
          c.id === editingCategory.id
            ? { ...c, name, slug: generatedSlug, sortOrder: orderNum }
            : c
        )
      );
      showNotification(`"${name}" kategorisi başarıyla güncellendi!`);
      setEditingCategory(null);
    } else {
      const newCat: CategoryItem = {
        id: `cat-${Date.now()}`,
        name,
        slug: generatedSlug,
        productsCount: 0,
        sortOrder: orderNum,
      };
      setCategories([...categories, newCat]);
      showNotification(`Yeni kategori "${name}" eklendi!`);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deletingCategory) return;
    setCategories(categories.filter((c) => c.id !== deletingCategory.id));
    showNotification(`"${deletingCategory.name}" kategorisi silindi!`);
    setDeletingCategory(null);
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage) || 1;
  const paginatedCategories = filteredCategories.slice(
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
            <FolderTree className="w-4 h-4" />
            <span>Kategori Ağacı</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Kategori Yönetimi ({categories.length} Kategori)
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Kategori Ekle</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Kategori adı veya slug ile ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Sıra</th>
              <th className="py-3.5 px-4">Kategori Adı</th>
              <th className="py-3.5 px-4">Slug (URL)</th>
              <th className="py-3.5 px-4">Bağlı Ürün Sayısı</th>
              <th className="py-3.5 px-4">Durum</th>
              <th className="py-3.5 px-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-bold text-slate-400">#{cat.sortOrder}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#9C3A50]" />
                  <span>{cat.name}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{cat.slug}</td>
                <td className="py-3.5 px-4 font-bold text-slate-800">{cat.productsCount} Ürün</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    <span>Aktif</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      title="Düzenle"
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-[#9C3A50] transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCategory(cat)}
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

        {/* Pagination Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Toplam <strong className="text-slate-800">{filteredCategories.length}</strong> kategoriden{' '}
            <strong className="text-slate-800">
              {filteredCategories.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredCategories.length)}
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

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingCategory) && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-extrabold text-lg text-slate-900 flex items-center space-x-2">
                <FolderTree className="w-5 h-5 text-[#9C3A50]" />
                <span>{editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}</span>
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Kategori Adı *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Özel Tasarım Pleksi Süsler"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL Slug (İsteğe Bağlı)</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="ozel-tasarim-pleksi-susler"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Görüntülenme Sırası</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingCategory ? 'Kaydet' : 'Kategoriyi Ekle'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Kategoriyi Silmek İstediğinize Emin Misiniz?</h3>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-slate-800">"{deletingCategory.name}"</strong> kategorisi silinecektir.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingCategory(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Evet, Sil</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
