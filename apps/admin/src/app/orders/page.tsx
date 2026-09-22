'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Download,
  Plus,
  X,
  Check,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';

interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  itemsCount: number;
  total: number;
  paymentMethod: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
}

export default function AdminOrdersPage(): React.JSX.Element {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Load orders from localStorage
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('wakko_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Manual Order Form state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [total, setTotal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Kapıda Ödeme');

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !total) return;

    const newOrder: OrderItem = {
      id: `ord-${Date.now()}`,
      orderNumber: `WAKKO-MAN-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      email: email || 'musteri@wakkopastasusleri.com',
      phone: phone || '0555 000 00 00',
      date: 'Bugün',
      itemsCount: 1,
      total: parseFloat(total),
      paymentMethod,
      status: 'PENDING',
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem('wakko_orders', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }

    showNotification(`Manuel Sipariş ${newOrder.orderNumber} başarıyla oluşturuldu!`);
    setIsManualModalOpen(false);

    setCustomerName('');
    setEmail('');
    setPhone('');
    setTotal('');
  };

  const handleStatusChange = (id: string, newStatus: OrderItem['status']) => {
    const updated = orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o));
    setOrders(updated);
    try {
      localStorage.setItem('wakko_orders', JSON.stringify(updated));
    } catch (err) {
      // ignore
    }
    showNotification('Sipariş durumu güncellendi.');
  };

  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Teslim Edildi</span>
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600 animate-spin" />
            <span>Hazırlanıyor</span>
          </span>
        );
      case 'SHIPPED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Truck className="w-3 h-3 text-purple-600" />
            <span>Kargoda</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            <span>Onay Bekliyor</span>
          </span>
        );
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#201A19] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-3 border border-[#9C3A50]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-[#9C3A50]">
            <ShoppingCart className="w-4 h-4" />
            <span>Sipariş Yönetimi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Tüm Mağaza Siparişleri ({orders.length})
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition"
          >
            <Plus className="w-4 h-4" />
            <span>Manuel Sipariş Oluştur</span>
          </button>

          <button className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition">
            <Download className="w-4 h-4" />
            <span>Excel Raporu</span>
          </button>
        </div>
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
            placeholder="Sipariş no, müşteri adı veya e-posta ile ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="PENDING">Onay Bekliyor</option>
            <option value="PROCESSING">Hazırlanıyor</option>
            <option value="SHIPPED">Kargoda</option>
            <option value="DELIVERED">Teslim Edildi</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Sipariş No</th>
                <th className="py-3.5 px-4">Müşteri</th>
                <th className="py-3.5 px-4">Tarih</th>
                <th className="py-3.5 px-4">Tutar</th>
                <th className="py-3.5 px-4">Ödeme</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 text-[#9C3A50] mx-auto flex items-center justify-center mb-3">
                      <ShoppingCart className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">Henüz Kayıtlı Sipariş Yok</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Veritabanında henüz sipariş kaydı bulunmuyor. Müşteriler mağazadan sipariş verdikçe veya sağ üstten manuel sipariş eklediğinizde burada listelenecektir.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">
                    <Link href={`/orders/${order.id}`} className="hover:text-[#9C3A50]">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{order.customerName}</div>
                    <div className="text-[11px] text-slate-400">{order.email}</div>
                  </td>
                  <td className="py-3.5 px-4 font-medium">{order.date}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#9C3A50]">
                    ₺{order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderItem['status'])}
                        className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none"
                      >
                        <option value="PENDING">Onay Bekliyor</option>
                        <option value="PROCESSING">Hazırlanıyor</option>
                        <option value="SHIPPED">Kargoda</option>
                        <option value="DELIVERED">Teslim Edildi</option>
                      </select>

                      <Link
                        href={`/orders/${order.id}`}
                        title="Detay İncele"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Toplam <strong className="text-slate-800">{filteredOrders.length}</strong> siparişten{' '}
            <strong className="text-slate-800">
              {filteredOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
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

      {/* Create Manual Order Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-extrabold text-lg text-slate-900 flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-[#9C3A50]" />
                <span>Manuel Sipariş Oluştur</span>
              </h2>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Müşteri Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Örn: Ahmet Yılmaz"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">E-Posta Adresi</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmet@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Telefon Numarası</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0555 123 45 67"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Toplam Tutar (TL) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    placeholder="250.00"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ödeme Yöntemi</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                  >
                    <option value="Kapıda Ödeme">Kapıda Ödeme</option>
                    <option value="EFT / Havale">EFT / Havale</option>
                    <option value="Kredi Kartı">Kredi Kartı</option>
                    <option value="Nakit (Elden)">Nakit (Elden)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Siparişi Kaydet & Oluştur</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
