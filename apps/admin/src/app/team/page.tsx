'use client';

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  CheckCircle,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Edit,
  Trash2,
  AlertCircle,
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Super Admin' | 'Depo Sorumlusu' | 'Müşteri Temsilcisi' | 'Ürün Yöneticisi';
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin: string;
  avatar: string;
}

const initialTeam: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Çağrı Çağman',
    email: 'cagri@wakkopastasusleri.com',
    phone: '0532 999 88 77',
    role: 'Super Admin',
    status: 'ACTIVE',
    lastLogin: 'Bugün, 22:15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
  },
  {
    id: 'usr-2',
    name: 'Zeynep Aksoy',
    email: 'zeynep@wakkopastasusleri.com',
    phone: '0544 111 22 33',
    role: 'Ürün Yöneticisi',
    status: 'ACTIVE',
    lastLogin: 'Bugün, 19:40',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
  },
  {
    id: 'usr-3',
    name: 'Burak Yılmaz',
    email: 'burak@wakkopastasusleri.com',
    phone: '0555 333 44 55',
    role: 'Depo Sorumlusu',
    status: 'ACTIVE',
    lastLogin: 'Dün, 18:20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  },
  {
    id: 'usr-4',
    name: 'Elif Kaya',
    email: 'elif@wakkopastasusleri.com',
    phone: '0533 444 55 66',
    role: 'Müşteri Temsilcisi',
    status: 'ACTIVE',
    lastLogin: '23 Ağu 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
  },
  {
    id: 'usr-5',
    name: 'Can Kaan',
    email: 'can@wakkopastasusleri.com',
    phone: '0542 555 66 77',
    role: 'Müşteri Temsilcisi',
    status: 'INACTIVE',
    lastLogin: '15 Ağu 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
  },
];

export default function AdminTeamPage(): React.JSX.Element {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<TeamMember | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Müşteri Temsilcisi');

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newMember: TeamMember = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '0555 000 00 00',
      role,
      status: 'ACTIVE',
      lastLogin: 'Henüz giriş yapmadı',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    };

    setTeam([newMember, ...team]);
    showNotification(`Yeni ekip üyesi "${name}" eklendi ve davet gönderildi!`);
    setIsAddModalOpen(false);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleDeleteMember = () => {
    if (!deletingUser) return;
    setTeam(team.filter((u) => u.id !== deletingUser.id));
    showNotification(`"${deletingUser.name}" ekipten çıkarıldı.`);
    setDeletingUser(null);
  };

  const filteredTeam = team.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredTeam.length / itemsPerPage) || 1;
  const paginatedTeam = filteredTeam.slice(
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
            <Users className="w-4 h-4" />
            <span>Kullanıcı Yetkileri</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Ekip & Yönetici Kadrosu ({team.length} Personel)
          </h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Yeni Ekip Üyesi Ekle</span>
        </button>
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
            placeholder="İsim, e-posta veya rol ile ekip üyesi ara..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#9C3A50]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tüm Rolleri Göster</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Ürün Yöneticisi">Ürün Yöneticisi</option>
            <option value="Depo Sorumlusu">Depo Sorumlusu</option>
            <option value="Müşteri Temsilcisi">Müşteri Temsilcisi</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ekip Üyesi</th>
                <th className="py-3.5 px-4">İletişim</th>
                <th className="py-3.5 px-4">Rol & Yetki</th>
                <th className="py-3.5 px-4">Son Giriş</th>
                <th className="py-3.5 px-4">Durum</th>
                <th className="py-3.5 px-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedTeam.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center space-x-3">
                    <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover border border-slate-200" />
                    <div>
                      <span className="block font-semibold text-slate-900">{member.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{member.id}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5 text-slate-700">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{member.email}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-slate-400 text-[11px] mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{member.phone}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      <Shield className="w-3 h-3 text-[#9C3A50]" />
                      <span>{member.role}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">{member.lastLogin}</td>
                  <td className="py-3.5 px-4">
                    {member.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        <span>Aktif</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                        <span>Pasif</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setDeletingUser(member)}
                        title="Ekipten Çıkar"
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
            Toplam <strong className="text-slate-800">{filteredTeam.length}</strong> ekip üyesinden{' '}
            <strong className="text-slate-800">
              {filteredTeam.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
              {Math.min(currentPage * itemsPerPage, filteredTeam.length)}
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

      {/* Add Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="font-extrabold text-lg text-slate-900 flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-[#9C3A50]" />
                <span>Yeni Ekip Üyesi Davet Et</span>
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-700 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Burak Yılmaz"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">E-Posta Adresi *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="burak@wakkopastasusleri.com"
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

              <div>
                <label className="font-bold text-slate-700 block mb-1">Erişim Rolü & Yetki</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as TeamMember['role'])}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#9C3A50]"
                >
                  <option value="Super Admin">Super Admin (Tam Yetki)</option>
                  <option value="Ürün Yöneticisi">Ürün Yöneticisi (Katalog & Fiyat)</option>
                  <option value="Depo Sorumlusu">Depo Sorumlusu (Stok & Sevkiyat)</option>
                  <option value="Müşteri Temsilcisi">Müşteri Temsilcisi (Siparişler)</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#9C3A50] hover:bg-[#7A2B3C] text-white font-bold rounded-xl shadow-md transition flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Daveti Gönder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingUser && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 mx-auto flex items-center justify-center">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Kullanıcıyı Ekipten Çıkarmak İstediğinize Emin Misiniz?</h3>
              <p className="text-xs text-slate-500 mt-1">
                <strong className="text-slate-800">"{deletingUser.name}"</strong> kullanıcısının yönetim paneli erişim yetkisi iptal edilecektir.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDeleteMember}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Evet, Çıkar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
