'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Layers,
  Edit2,
  Check,
  AlertCircle,
  RefreshCw,
  X,
  Upload,
  RotateCcw,
  Search,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface Booth {
  id: string;
  boothNumber: string;
  tier: 'PLATINUM' | 'GOLD' | 'SILVER';
  positionZone: 'TOP' | 'BOTTOM' | 'LEFT';
  status: 'AVAILABLE' | 'RESERVED' | 'BOOKED';
  sponsorId?: string | null;
  sponsorName?: string | null;
  logoUrl?: string | null;
  description?: string | null;
  displayOrder: number;
}

interface ExistingSponsor {
  id: string;
  companyName: string;
  tier: string;
  logoUrl: string;
}

export default function AdminBoothsTab() {
  const [booths, setBooths] = useState<Booth[]>([]);
  const [sponsors, setSponsors] = useState<ExistingSponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Edit Modal State
  const [editingBooth, setEditingBooth] = useState<Booth | null>(null);
  const [editStatus, setEditStatus] = useState<'AVAILABLE' | 'RESERVED' | 'BOOKED'>('AVAILABLE');
  const [editSponsorName, setEditSponsorName] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [selectedExistingSponsorId, setSelectedExistingSponsorId] = useState('');

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notification Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchBooths = async () => {
    setLoading(true);
    try {
      const [resBooths, resSponsors] = await Promise.all([
        fetch('/api/booths'),
        fetch('/api/sponsors'),
      ]);

      if (resBooths.ok) {
        const data = await resBooths.json();
        setBooths(data);
      }
      if (resSponsors.ok) {
        const spData = await resSponsors.json();
        setSponsors(spData);
      }
    } catch (err) {
      console.error('Error fetching booths:', err);
      showToast('error', 'Gagal memuat data booth.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooths();
  }, []);

  // Filtered Booths
  const filteredBooths = useMemo(() => {
    return booths.filter((b) => {
      if (filterTier !== 'ALL' && b.tier !== filterTier) return false;
      if (filterStatus !== 'ALL' && b.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNum = b.boothNumber.toLowerCase().includes(q);
        const matchName = b.sponsorName?.toLowerCase().includes(q) || false;
        if (!matchNum && !matchName) return false;
      }
      return true;
    });
  }, [booths, filterTier, filterStatus, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const total = booths.length;
    const booked = booths.filter((b) => b.status === 'BOOKED').length;
    const available = booths.filter((b) => b.status === 'AVAILABLE').length;
    const reserved = booths.filter((b) => b.status === 'RESERVED').length;
    return { total, booked, available, reserved };
  }, [booths]);

  // Open Edit Modal
  const handleOpenEdit = (booth: Booth) => {
    setEditingBooth(booth);
    setEditStatus(booth.status);
    setEditSponsorName(booth.sponsorName || '');
    setEditLogoUrl(booth.logoUrl || '');
    setEditDescription(booth.description || '');
    setSelectedExistingSponsorId('');
    setUploadError('');
  };

  // Sponsor selection from existing
  const handleSelectExistingSponsor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const spId = e.target.value;
    setSelectedExistingSponsorId(spId);
    if (!spId) return;

    const found = sponsors.find((s) => s.id === spId);
    if (found) {
      setEditSponsorName(found.companyName);
      if (editingBooth?.tier !== 'SILVER') {
        setEditLogoUrl(found.logoUrl);
      } else {
        setEditLogoUrl('');
      }
      if (editStatus === 'AVAILABLE') {
        setEditStatus('BOOKED');
      }
    }
  };

  // Upload Logo Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    // Client-side validations
    const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setUploadError('Format tidak didukung. Harap pilih PNG, JPG, WEBP, atau SVG.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Ukuran file melebihi batas maksimal 2MB.');
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'booths');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setEditLogoUrl(data.url);
        showToast('success', 'Logo berhasil diunggah.');
      } else {
        setUploadError(data.error || 'Gagal mengunggah logo');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError('Terjadi kesalahan saat mengunggah file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Reset Booth Handler
  const handleResetBooth = async (booth: Booth) => {
    if (!confirm(`Kosongkan data booth ${booth.boothNumber} kembali ke status Tersedia?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/booths/${booth.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'AVAILABLE',
          sponsorId: null,
          sponsorName: null,
          logoUrl: null,
          description: null,
        }),
      });

      if (res.ok) {
        showToast('success', `Booth ${booth.boothNumber} berhasil di-reset.`);
        fetchBooths();
      } else {
        showToast('error', 'Gagal mereset booth.');
      }
    } catch {
      showToast('error', 'Terjadi kesalahan sistem.');
    }
  };

  // Save Edit Handler
  const handleSaveEdit = async () => {
    if (!editingBooth) return;

    setSaving(true);
    try {
      const payloadLogoUrl = editingBooth.tier === 'SILVER' ? null : (editLogoUrl.trim() || null);
      const res = await fetch(`/api/booths/${editingBooth.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          sponsorName: editSponsorName.trim() || null,
          logoUrl: payloadLogoUrl,
          description: editDescription.trim() || null,
          sponsorId: selectedExistingSponsorId || null,
        }),
      });

      if (res.ok) {
        showToast('success', `Data Booth ${editingBooth.boothNumber} berhasil disimpan.`);
        setEditingBooth(null);
        fetchBooths();
      } else {
        const errData = await res.json();
        showToast('error', errData.error || 'Gagal menyimpan perubahan booth.');
      }
    } catch {
      showToast('error', 'Terjadi kesalahan jaringan.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 text-sm font-semibold transition-all ${
            toast.type === 'success' ? 'bg-[#0D2B6B] text-white border border-[#0066E0]' : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? <Check className="w-5 h-5 text-[#22C55E]" /> : <AlertCircle className="w-5 h-5 text-white" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header & Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E6E9F2] shadow-xs">
          <div className="text-[11px] font-bold text-[#75829C] uppercase tracking-wider">Total Kapasitas</div>
          <div className="text-2xl font-heading font-extrabold text-[#0D2B6B] mt-1">24 Booth</div>
          <div className="text-[11px] text-[#75829C] mt-0.5">6 Platinum, 12 Gold, 6 Silver</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6E9F2] shadow-xs">
          <div className="text-[11px] font-bold text-[#22C55E] uppercase tracking-wider">Booth Terisi (Booked)</div>
          <div className="text-2xl font-heading font-extrabold text-[#0D2B6B] mt-1">{stats.booked}</div>
          <div className="text-[11px] text-[#22C55E] mt-0.5">{Math.round((stats.booked / 24) * 100)}% Terisi</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6E9F2] shadow-xs">
          <div className="text-[11px] font-bold text-[#0066E0] uppercase tracking-wider">Booth Tersedia</div>
          <div className="text-2xl font-heading font-extrabold text-[#0D2B6B] mt-1">{stats.available}</div>
          <div className="text-[11px] text-[#0066E0] mt-0.5">Siap Dipesan</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#E6E9F2] shadow-xs">
          <div className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider">Reserved (Hold)</div>
          <div className="text-2xl font-heading font-extrabold text-[#0D2B6B] mt-1">{stats.reserved}</div>
          <div className="text-[11px] text-[#F59E0B] mt-0.5">Menunggu Konfirmasi</div>
        </div>
      </div>

      {/* Controls & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6E9F2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tier Filters */}
          <div className="flex items-center rounded-xl bg-[#F5F7FA] p-1 border border-[#E6E9F2]">
            {(['ALL', 'PLATINUM', 'GOLD', 'SILVER'] as const).map((tier) => (
              <button
                key={tier}
                onClick={() => setFilterTier(tier)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  filterTier === tier
                    ? 'bg-[#0D2B6B] text-white shadow-xs'
                    : 'text-[#75829C] hover:text-[#0D2B6B]'
                }`}
              >
                {tier === 'ALL' ? 'Semua Tier' : tier}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl px-3 py-2 text-[#0D2B6B] font-medium focus:outline-none focus:border-[#0066E0]"
          >
            <option value="ALL">Semua Status</option>
            <option value="AVAILABLE">Tersedia</option>
            <option value="BOOKED">Terisi (Booked)</option>
            <option value="RESERVED">Reserved</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#75829C] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nomor atau nama sponsor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl text-[#0D2B6B] placeholder-[#75829C] focus:outline-none focus:border-[#0066E0]"
            />
          </div>

          <button
            onClick={fetchBooths}
            className="p-2 text-[#75829C] hover:text-[#0D2B6B] hover:bg-[#F5F7FA] rounded-xl border border-[#E6E9F2] transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Booths Grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-[#75829C] bg-white rounded-2xl border border-[#E6E9F2]">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#0066E0] mb-2" />
          <span>Memuat data booth ballroom...</span>
        </div>
      ) : filteredBooths.length === 0 ? (
        <div className="py-16 text-center text-sm text-[#75829C] bg-white rounded-2xl border border-[#E6E9F2]">
          Tidak ada booth yang sesuai dengan filter pencarian.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredBooths.map((booth) => {
            const isBooked = booth.status === 'BOOKED';
            const isReserved = booth.status === 'RESERVED';
            const tierBadgeColor =
              booth.tier === 'PLATINUM'
                ? 'bg-[#E3062E]/10 text-[#E3062E] border-[#E3062E]/20'
                : booth.tier === 'GOLD'
                ? 'bg-[#0066E0]/10 text-[#0066E0] border-[#0066E0]/20'
                : 'bg-slate-100 text-slate-700 border-slate-200';

            const zoneLabel =
              booth.positionZone === 'TOP'
                ? 'Sayap Atas (Kanan)'
                : booth.positionZone === 'BOTTOM'
                ? 'Sayap Bawah (Kanan)'
                : 'Dinding Belakang (Kiri)';

            return (
              <div
                key={booth.id}
                className="bg-white rounded-2xl border border-[#E6E9F2] shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Booth Number & Tier */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading font-black text-lg text-[#0D2B6B] tracking-tight">
                      {booth.boothNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tierBadgeColor}`}>
                      {booth.tier}
                    </span>
                  </div>

                  {/* Booth Card Box: Logo Preview for Platinum/Gold, Text Box for Silver */}
                  {booth.tier === 'SILVER' ? (
                    <div className="h-24 w-full bg-[#F5F7FA] rounded-xl border border-[#E6E9F2] flex flex-col items-center justify-center p-3 relative overflow-hidden mb-3">
                      <span className="text-[10px] font-bold text-[#75829C] uppercase tracking-wider block mb-1">
                        Booth Silver
                      </span>
                      <span className="text-xs font-heading font-extrabold text-[#0D2B6B] text-center line-clamp-2 px-1">
                        {booth.sponsorName || 'Slot Tersedia'}
                      </span>
                      <span className="text-[9px] text-[#75829C] mt-1">Meja Promosi (Tanpa Logo)</span>

                      {/* Status Badge Tag */}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isBooked
                              ? 'bg-[#22C55E]/15 text-[#16A34A] border border-[#22C55E]/30'
                              : isReserved
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {isBooked ? 'Terisi' : isReserved ? 'Reserved' : 'Tersedia'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 w-full bg-[#F5F7FA] rounded-xl border border-dashed border-[#CBD5E1] flex items-center justify-center p-3 relative overflow-hidden mb-3">
                      {booth.logoUrl ? (
                        <img
                          src={booth.logoUrl}
                          alt={booth.sponsorName || booth.boothNumber}
                          className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                        />
                      ) : (
                        <div className="text-center text-[#75829C]">
                          <Layers className="w-5 h-5 mx-auto mb-1 opacity-40" />
                          <span className="text-[10px] font-medium block">Belum ada logo</span>
                        </div>
                      )}

                      {/* Status Badge Tag */}
                      <div className="absolute top-2 right-2">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isBooked
                              ? 'bg-[#22C55E]/15 text-[#16A34A] border border-[#22C55E]/30'
                              : isReserved
                              ? 'bg-amber-100 text-amber-700 border border-amber-300'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {isBooked ? 'Terisi' : isReserved ? 'Reserved' : 'Tersedia'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Sponsor Name & Zone Detail */}
                  <div className="space-y-1 mb-4">
                    <div className="text-xs font-bold text-[#0D2B6B] truncate">
                      {booth.sponsorName || <span className="text-[#75829C] font-normal italic">Slot Tersedia</span>}
                    </div>
                    <div className="text-[11px] text-[#75829C] flex items-center gap-1">
                      <span>Posisi:</span>
                      <span className="font-medium text-[#0D2B6B]">{zoneLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E6E9F2] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEdit(booth)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-heading font-bold text-white bg-[#0066E0] hover:bg-[#0052B8] rounded-xl transition-all shadow-xs"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Kelola</span>
                  </button>

                  {(isBooked || isReserved) && (
                    <button
                      onClick={() => handleResetBooth(booth)}
                      className="p-2 text-[#75829C] hover:text-[#E3062E] hover:bg-red-50 rounded-xl transition-colors border border-[#E6E9F2]"
                      title="Reset ke Tersedia"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Assign Modal */}
      {editingBooth && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#E6E9F2] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-[#071A42] to-[#0D2B6B] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-heading font-extrabold">{editingBooth.boothNumber}</span>
                <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-bold">
                  {editingBooth.tier}
                </span>
              </div>
              <button
                onClick={() => setEditingBooth(null)}
                className="text-white/70 hover:text-white p-1 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-[#0D2B6B] uppercase tracking-wider mb-1.5">
                  Status Booth
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['AVAILABLE', 'RESERVED', 'BOOKED'] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setEditStatus(st)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        editStatus === st
                          ? st === 'BOOKED'
                            ? 'bg-[#22C55E] text-white border-[#22C55E]'
                            : st === 'RESERVED'
                            ? 'bg-amber-500 text-white border-amber-500'
                            : 'bg-[#0066E0] text-white border-[#0066E0]'
                          : 'bg-[#F5F7FA] text-[#75829C] border-[#E6E9F2] hover:bg-gray-100'
                      }`}
                    >
                      {st === 'BOOKED' ? 'Terisi (Booked)' : st === 'RESERVED' ? 'Reserved' : 'Tersedia'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Select from Existing Sponsors */}
              {sponsors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold text-[#0D2B6B] uppercase tracking-wider mb-1.5">
                    Pilih Dari Sponsor Terdaftar (Opsional)
                  </label>
                  <select
                    value={selectedExistingSponsorId}
                    onChange={handleSelectExistingSponsor}
                    className="w-full p-2.5 text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl text-[#0D2B6B] font-medium focus:outline-none focus:border-[#0066E0]"
                  >
                    <option value="">-- Pilih sponsor untuk auto-fill --</option>
                    {sponsors.map((sp) => (
                      <option key={sp.id} value={sp.id}>
                        {sp.companyName} ({sp.tier})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Sponsor Name Input */}
              <div>
                <label className="block text-xs font-bold text-[#0D2B6B] uppercase tracking-wider mb-1.5">
                  Nama Perusahaan / Sponsor
                </label>
                <input
                  type="text"
                  placeholder="Contoh: PT Solusi Industri Digital"
                  value={editSponsorName}
                  onChange={(e) => setEditSponsorName(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl text-[#0D2B6B] placeholder-[#75829C] focus:outline-none focus:border-[#0066E0]"
                />
              </div>

              {/* Logo Management: Only for Platinum and Gold (Silver has NO logo) */}
              {editingBooth.tier !== 'SILVER' ? (
                <div>
                  <label className="block text-xs font-bold text-[#0D2B6B] uppercase tracking-wider mb-1.5">
                    Logo Sponsor Booth
                  </label>

                  {/* Logo Preview */}
                  <div className="h-20 w-full bg-[#F5F7FA] rounded-xl border border-dashed border-[#CBD5E1] flex items-center justify-center p-2 mb-2 relative">
                    {editLogoUrl ? (
                      <img
                        src={editLogoUrl}
                        alt="Preview"
                        className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                      />
                    ) : (
                      <span className="text-xs text-[#75829C]">Belum ada logo terpilih</span>
                    )}
                    {editLogoUrl && (
                      <button
                        type="button"
                        onClick={() => setEditLogoUrl('')}
                        className="absolute top-1 right-1 p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Hapus Logo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".png,.jpg,.jpeg,.webp,.svg"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#0D2B6B] bg-[#F5F7FA] hover:bg-gray-100 border border-[#E6E9F2] rounded-xl transition-all"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#0066E0]" />
                      <span>{isUploading ? 'Mengunggah...' : 'Unggah File Logo Baru (Max 2MB)'}</span>
                    </button>
                  </div>
                  {uploadError && <p className="text-[11px] text-red-600 mt-1">{uploadError}</p>}

                  {/* Or Direct URL Input */}
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Atau masukkan URL / path logo langsung..."
                      value={editLogoUrl}
                      onChange={(e) => setEditLogoUrl(e.target.value)}
                      className="w-full p-2 text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl text-[#0D2B6B] font-mono text-[11px] focus:outline-none focus:border-[#0066E0]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#75829C]">
                  <span className="font-bold text-[#0D2B6B] block mb-0.5">Ketentuan Booth Silver:</span>
                  Sesuai ketentuan paket Silver, booth ini berupa meja promosi tanpa penayangan logo. Cukup tetapkan status dan nama perusahaan/sponsor.
                </div>
              )}

              {/* Description / Notes */}
              <div>
                <label className="block text-xs font-bold text-[#0D2B6B] uppercase tracking-wider mb-1.5">
                  Catatan / Keterangan Booth (Opsional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Keterangan tambahan penempatan..."
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2.5 text-xs bg-[#F5F7FA] border border-[#E6E9F2] rounded-xl text-[#0D2B6B] placeholder-[#75829C] focus:outline-none focus:border-[#0066E0]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#F5F7FA] border-t border-[#E6E9F2] flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setEditingBooth(null)}
                className="px-4 py-2 text-xs font-bold text-[#75829C] hover:text-[#0D2B6B] transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={saving}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 text-xs font-heading font-bold text-white bg-[#0066E0] hover:bg-[#0052B8] rounded-xl shadow-xs transition-all disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Simpan Perubahan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
