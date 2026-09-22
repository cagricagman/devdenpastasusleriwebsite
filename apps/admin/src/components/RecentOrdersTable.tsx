'use client';

import React, { useState } from 'react';
import { Eye, CheckCircle2, Clock, Truck, AlertCircle } from 'lucide-react';

const mockOrders = [
  {
    id: '1',
    orderNumber: 'WAKKO-2026-00001',
    customerName: 'Ayşe Yılmaz',
    email: 'ayse@example.com',
    date: '24 Ağu 2026',
    itemsCount: 3,
    total: 184.70,
    paymentMethod: 'Kapıda Ödeme',
    status: 'DELIVERED',
  },
  {
    id: '2',
    orderNumber: 'WAKKO-2026-00002',
    customerName: 'Mehmet Demir',
    email: 'mehmet@example.com',
    date: '24 Ağu 2026',
    itemsCount: 1,
    total: 219.00,
    paymentMethod: 'Kapıda Ödeme',
    status: 'PROCESSING',
  },
  {
    id: '3',
    orderNumber: 'WAKKO-2026-00003',
    customerName: 'Zeynep Kaya',
    email: 'zeynep@example.com',
    date: '23 Ağu 2026',
    itemsCount: 4,
    total: 345.50,
    paymentMethod: 'Kredi Kartı',
    status: 'SHIPPED',
  },
  {
    id: '4',
    orderNumber: 'WAKKO-2026-00004',
    customerName: 'Can Öztürk',
    email: 'can@example.com',
    date: '23 Ağu 2026',
    itemsCount: 2,
    total: 119.90,
    paymentMethod: 'Kapıda Ödeme',
    status: 'PENDING',
  },
];

const getStatusBadge = (status: string) => {
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

export const RecentOrdersTable: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Son Siparişler</h2>
          <p className="text-xs text-slate-500">Müşterilerden gelen gerçek zamanlı sipariş akışı.</p>
        </div>
        <button className="text-xs font-bold text-[#9C3A50] hover:text-[#7A2B3C] border border-[#FFD9DE] bg-[#FFF0F2] px-3.5 py-1.5 rounded-xl transition">
          Tüm Siparişleri Gör ({orders.length})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-700 uppercase font-bold text-[11px] border-y border-slate-200">
            <tr>
              <th className="py-3 px-4">Sipariş No</th>
              <th className="py-3 px-4">Müşteri</th>
              <th className="py-3 px-4">Tarih</th>
              <th className="py-3 px-4">Tutar</th>
              <th className="py-3 px-4">Ödeme</th>
              <th className="py-3 px-4">Durum</th>
              <th className="py-3 px-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 px-4 font-extrabold text-slate-900">
                  {order.orderNumber}
                </td>
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{order.customerName}</div>
                  <div className="text-[11px] text-slate-400">{order.email}</div>
                </td>
                <td className="py-3.5 px-4 font-medium">{order.date}</td>
                <td className="py-3.5 px-4 font-extrabold text-slate-900">
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
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none"
                    >
                      <option value="PENDING">Onay Bekliyor</option>
                      <option value="PROCESSING">Hazırlanıyor</option>
                      <option value="SHIPPED">Kargoda</option>
                      <option value="DELIVERED">Teslim Edildi</option>
                    </select>

                    <button title="Detay İncele" className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
