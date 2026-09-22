'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingBag, Package, AlertTriangle, TrendingUp } from 'lucide-react';

export const StatsCards: React.FC = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [activeProductsCount, setActiveProductsCount] = useState(0);
  const [criticalStockCount, setCriticalStockCount] = useState(0);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('wakko_orders');
      if (savedOrders) {
        const orders = JSON.parse(savedOrders);
        if (Array.isArray(orders)) {
          const sales = orders
            .filter((o) => o.status === 'DELIVERED' || o.status === 'PROCESSING' || o.status === 'SHIPPED')
            .reduce((sum, o) => sum + (Number(o.total) || 0), 0);
          setTotalSales(sales);

          const pending = orders.filter((o) => o.status === 'PENDING').length;
          setPendingOrdersCount(pending);
        }
      }

      const savedProducts = localStorage.getItem('wakko_admin_products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        if (Array.isArray(products)) {
          setActiveProductsCount(products.length);
          const critical = products.filter((p) => Number(p.stock) <= 5).length;
          setCriticalStockCount(critical);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const stats = [
    {
      title: 'Toplam Satış Hacmi',
      value: `₺${totalSales.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: totalSales > 0 ? 'Gerçekleşen siparişler' : 'Henüz satış gerçekleşmedi',
      icon: DollarSign,
      bgColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Bekleyen Siparişler',
      value: `${pendingOrdersCount} Sipariş`,
      change: pendingOrdersCount > 0 ? `${pendingOrdersCount} sipariş onay bekliyor` : 'Onay bekleyen sipariş yok',
      icon: ShoppingBag,
      bgColor: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Aktif Ürün Sayısı',
      value: `${activeProductsCount} Çeşit`,
      change: activeProductsCount > 0 ? 'Mağazada yayında' : 'Henüz ürün eklenmedi',
      icon: Package,
      bgColor: 'bg-[#FFF0F2] text-[#9C3A50] border-[#FFD9DE]',
    },
    {
      title: 'Kritik Stok Uyarısı',
      value: `${criticalStockCount} Ürün`,
      change: criticalStockCount > 0 ? 'Minimum seviyenin altında' : 'Tüm stoklar güvenli',
      icon: AlertTriangle,
      bgColor: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {item.title}
              </span>
              <div className={`p-2.5 rounded-xl border ${item.bgColor}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h3>
              <div className="flex items-center space-x-1 mt-1 text-xs text-slate-500">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                <span>{item.change}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
