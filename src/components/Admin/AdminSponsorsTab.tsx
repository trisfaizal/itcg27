'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Upload,
  ExternalLink,
  Check,
  AlertCircle,
  RefreshCw,
  X,
  AlertTriangle,
} from 'lucide-react';

interface Sponsor {
  id: string;
  companyName: string;
  tier: string;
  status: string;
  category: string;
  logoUrl: string;
  websiteUrl: string | null;
  shortDescription: string | null;
  displayOrder: number;
}

export default function AdminSponsorsTab() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTier, setFilterTier] = useState<string>('ALL');

  // Multi-selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  // Toast notification state
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Form modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Form inputs
  const [formData, setFormData] = useState({
    companyName: '',
    tier: 'PLATINUM',
    status: 'CONFIRMED',
    category: 'AI & Data',
    logoUrl: '',
    websiteUrl: '',
    shortDescription: '',
    displayOrder: 1,
  });

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sponsors');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSponsors(data);
        // Preserve selected IDs that still exist in the newly fetched dataset
        const validIds = new Set(data.map((s: Sponsor) => s.id));
        setSelectedIds((prev) => {
          const next = new Set<string>();
          prev.forEach((id) => {
            if (validIds.has(id)) next.add(id);
          });
          return next;
        });
      }
    } catch (err) {
      console.error('Error fetching sponsors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const openCreateModal = () => {
    setEditingSponsor(null);
    setFormData({
      companyName: '',
      tier: 'PLATINUM',
      status: 'CONFIRMED',
      category: 'AI & Data',
      logoUrl: '',
      websiteUrl: '',
      shortDescription: '',
      displayOrder: sponsors.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: Sponsor) => {
    setEditingSponsor(s);
    setFormData({
      companyName: s.companyName,
      tier: s.tier,
      status: s.status,
      category: s.category,
      logoUrl: s.logoUrl,
      websiteUrl: s.websiteUrl || '',
      shortDescription: s.shortDescription || '',
      displayOrder: s.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    const body = new FormData();
    body.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData((prev) => ({ ...prev, logoUrl: data.url }));
        setToast({
          type: 'success',
          message: 'Logo berhasil diunggah',
        });
      } else {
        setToast({
          type: 'error',
          message: data.error || 'Gagal mengunggah logo',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Terjadi kesalahan saat upload file',
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.logoUrl) {
      setToast({
        type: 'error',
        message: 'Nama perusahaan dan logo URL wajib diisi',
      });
      return;
    }

    try {
      if (editingSponsor) {
        // Update
        const res = await fetch(`/api/sponsors/${editingSponsor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          await fetchSponsors();
          setToast({
            type: 'success',
            message: `Sponsor "${formData.companyName}" berhasil diperbarui`,
          });
        } else {
          const err = await res.json();
          setToast({
            type: 'error',
            message: err.error || 'Gagal update sponsor',
          });
        }
      } else {
        // Create
        const res = await fetch('/api/sponsors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          await fetchSponsors();
          setToast({
            type: 'success',
            message: `Sponsor "${formData.companyName}" berhasil ditambahkan`,
          });
        } else {
          const err = await res.json();
          setToast({
            type: 'error',
            message: err.error || 'Gagal menambah sponsor',
          });
        }
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Terjadi kesalahan koneksi',
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus sponsor "${name}"?`)) return;

    try {
      const res = await fetch(`/api/sponsors/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        await fetchSponsors();
        setToast({
          type: 'success',
          message: `Sponsor "${name}" berhasil dihapus`,
        });
      } else {
        const err = await res.json().catch(() => ({}));
        setToast({
          type: 'error',
          message: err.error || 'Gagal menghapus sponsor',
        });
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Terjadi kesalahan koneksi saat menghapus sponsor',
      });
    }
  };

  const tierWeight: Record<string, number> = {
    PLATINUM: 1,
    GOLD: 2,
    SILVER: 3,
  };

  const getTierCount = (t: string) => {
    if (t === 'ALL') return sponsors.length;
    return sponsors.filter((s) => (s.tier || '').toUpperCase() === t.toUpperCase()).length;
  };

  const filtered = useMemo(() => {
    const list =
      filterTier === 'ALL'
        ? [...sponsors]
        : sponsors.filter((s) => (s.tier || '').toUpperCase() === filterTier.toUpperCase());

    if (filterTier === 'ALL') {
      list.sort((a, b) => {
        const weightA = tierWeight[(a.tier || '').toUpperCase()] ?? 99;
        const weightB = tierWeight[(b.tier || '').toUpperCase()] ?? 99;
        if (weightA !== weightB) {
          return weightA - weightB;
        }
        return (a.displayOrder ?? 0) - (b.displayOrder ?? 0);
      });
    } else {
      list.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    }

    return list;
  }, [sponsors, filterTier]);

  // Selection calculations relative to visible items
  const isAllVisibleSelected =
    filtered.length > 0 && filtered.every((s) => selectedIds.has(s.id));
  const isPartiallySelected =
    filtered.some((s) => selectedIds.has(s.id)) && !isAllVisibleSelected;

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = isPartiallySelected;
    }
  }, [isPartiallySelected]);

  // Toggle selection for all currently visible sponsors under the active filter
  const handleToggleSelectAllVisible = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (isAllVisibleSelected) {
        // Deselect only the currently visible sponsors
        filtered.forEach((s) => next.delete(s.id));
      } else {
        // Select all currently visible sponsors
        filtered.forEach((s) => next.add(s.id));
      }
      return next;
    });
  };

  // Toggle individual row selection
  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Clear all selections
  const handleCancelSelection = () => {
    setSelectedIds(new Set());
  };

  // Selected sponsors list for confirmation modal
  const selectedSponsorsList = useMemo(() => {
    return sponsors.filter((s) => selectedIds.has(s.id));
  }, [sponsors, selectedIds]);

  // Execute bulk deletion
  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.size === 0) return;
    setIsBulkDeleting(true);

    try {
      const res = await fetch('/api/sponsors/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const deletedCount = data.count || selectedIds.size;
        setIsConfirmModalOpen(false);
        setSelectedIds(new Set());
        await fetchSponsors();
        setToast({
          type: 'success',
          message: `${deletedCount} sponsor berhasil dihapus dari sistem`,
        });
      } else {
        // Keep selection and keep modal open on failure
        setToast({
          type: 'error',
          message: data.error || 'Gagal menghapus sponsor terpilih',
        });
      }
    } catch (err) {
      console.error('Bulk delete network error:', err);
      setToast({
        type: 'error',
        message: 'Terjadi kesalahan koneksi saat menghapus data sponsor',
      });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-xl shadow-xl border animate-in fade-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-itcg-navy text-white border-itcg-blue shadow-itcg-navy/20'
              : 'bg-itcg-red text-white border-red-700 shadow-itcg-red/20'
          }`}
        >
          {toast.type === 'success' ? (
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white flex-shrink-0" />
          )}
          <span className="text-xs font-heading font-bold">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-white/70 hover:text-white p-1 ml-2 transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-itcg-gray shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-heading font-bold text-itcg-navy uppercase">
            Filter Tier:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {['ALL', 'PLATINUM', 'GOLD', 'SILVER'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilterTier(t)}
                className={`px-3 py-1.5 text-xs font-heading font-bold rounded-md transition-all ${
                  filterTier === t
                    ? 'bg-itcg-navy text-white shadow-xs'
                    : 'bg-itcg-gray-light text-itcg-navy hover:bg-itcg-gray'
                }`}
              >
                {t} ({getTierCount(t)})
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchSponsors}
            className="p-2 text-itcg-navy hover:text-itcg-blue rounded-md border border-itcg-gray hover:bg-itcg-gray-light"
            title="Refresh Data"
            aria-label="Refresh data sponsor"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 text-xs font-heading font-bold text-white bg-itcg-blue hover:bg-itcg-blue-hover rounded-md shadow-xs transition-all"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Sponsor Baru</span>
          </button>
        </div>
      </div>

      {/* Bulk Action Toolbar */}
      {selectedIds.size > 0 && (
        <div
          data-testid="bulk-toolbar"
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-itcg-navy text-white px-4 py-3 rounded-xl shadow-md border-l-4 border-itcg-blue animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-itcg-blue text-xs font-mono font-bold text-white">
              {selectedIds.size}
            </span>
            <span className="text-xs sm:text-sm font-heading font-bold text-white">
              {selectedIds.size} sponsor dipilih
            </span>
            {filterTier !== 'ALL' && (
              <span className="text-[11px] text-itcg-gray bg-white/10 px-2 py-0.5 rounded font-mono">
                Filter: {filterTier}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleCancelSelection}
              disabled={isBulkDeleting}
              className="px-3 py-1.5 text-xs font-heading font-semibold text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors disabled:opacity-50"
            >
              Batal Pilih
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isBulkDeleting}
              className="inline-flex items-center px-3.5 py-1.5 text-xs font-heading font-bold text-white bg-itcg-red hover:bg-itcg-red-hover rounded-md shadow-xs transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" />
              <span>Hapus Terpilih ({selectedIds.size})</span>
            </button>
          </div>
        </div>
      )}

      {/* Sponsors Table */}
      <div className="bg-white rounded-xl border border-itcg-gray shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-itcg-gray">
            <thead className="bg-itcg-gray-light text-[11px] font-heading font-bold text-itcg-navy uppercase tracking-wider">
              <tr>
                <th className="w-10 px-4 py-3 text-center">
                  <input
                    ref={headerCheckboxRef}
                    type="checkbox"
                    checked={isAllVisibleSelected}
                    onChange={handleToggleSelectAllVisible}
                    aria-label="Pilih semua sponsor yang tampil"
                    className="w-4 h-4 text-itcg-blue rounded border-itcg-gray focus:ring-itcg-blue cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left">Urutan</th>
                <th className="px-4 py-3 text-left">Logo</th>
                <th className="px-4 py-3 text-left">Perusahaan</th>
                <th className="px-4 py-3 text-left">Tier</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-itcg-gray text-xs">
              {filtered.map((s) => {
                const isSelected = selectedIds.has(s.id);
                return (
                  <tr
                    key={s.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 border-l-4 border-l-itcg-blue'
                        : 'hover:bg-itcg-gray-light/50 border-l-4 border-l-transparent'
                    }`}
                  >
                    <td className="w-10 px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelectRow(s.id)}
                        aria-label={`Pilih sponsor ${s.companyName}`}
                        className="w-4 h-4 text-itcg-blue rounded border-itcg-gray focus:ring-itcg-blue cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-itcg-navy">
                      #{s.displayOrder}
                    </td>
                    <td className="px-4 py-3">
                      <div className="h-9 w-20 bg-gray-50 border border-gray-200 rounded flex items-center justify-center p-1">
                        <img
                          src={s.logoUrl}
                          alt={s.companyName}
                          className="max-h-7 max-w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-heading font-bold text-itcg-navy">
                      <div>{s.companyName}</div>
                      {s.websiteUrl && (
                        <a
                          href={s.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-itcg-blue hover:underline inline-flex items-center mt-0.5"
                        >
                          <span>{s.websiteUrl}</span>
                          <ExternalLink className="w-2.5 h-2.5 ml-1" />
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-heading font-extrabold ${
                          s.tier === 'PLATINUM'
                            ? 'bg-itcg-navy text-white'
                            : s.tier === 'GOLD'
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {s.tier}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-heading font-bold ${
                          s.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-itcg-navy/80">
                      {s.category}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-1.5 text-itcg-navy hover:text-itcg-blue hover:bg-itcg-blue-light rounded transition-colors"
                        title="Edit"
                        aria-label={`Edit ${s.companyName}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.companyName)}
                        className="p-1.5 text-itcg-red hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                        title="Hapus"
                        aria-label={`Hapus ${s.companyName}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && !loading && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-itcg-gray-dark">
                    Tidak ada data sponsor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk Delete Confirmation Modal */}
      {isConfirmModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={(e) => {
            // Prevent accidental deletion through backdrop clicks: clicking outside cancels
            if (e.target === e.currentTarget && !isBulkDeleting) {
              setIsConfirmModalOpen(false);
            }
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-itcg-navy relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bulk-delete-title"
          >
            <div className="flex items-start space-x-3 pb-3 border-b border-itcg-gray">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-itcg-red">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3
                  id="bulk-delete-title"
                  className="text-base font-heading font-extrabold text-itcg-navy"
                >
                  Hapus Sponsor Terpilih?
                </h3>
                <p className="text-xs text-itcg-gray-dark mt-0.5">
                  Anda akan menghapus {selectedSponsorsList.length} mitra sponsor secara permanen.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-xs font-heading font-bold text-itcg-navy">
                Daftar sponsor yang akan dihapus:
              </div>

              <div className="max-h-48 overflow-y-auto divide-y divide-gray-100 bg-gray-50 rounded-xl p-3 border border-itcg-gray text-xs space-y-1">
                {selectedSponsorsList.map((s) => (
                  <div key={s.id} className="py-1.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2 truncate mr-2">
                      <span className="font-mono text-[11px] text-gray-500 font-bold">
                        #{s.displayOrder}
                      </span>
                      <span className="font-heading font-bold text-itcg-navy truncate">
                        {s.companyName}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-heading font-extrabold flex-shrink-0 ${
                        s.tier === 'PLATINUM'
                          ? 'bg-itcg-navy text-white'
                          : s.tier === 'GOLD'
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      {s.tier}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-itcg-red text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Peringatan: Tindakan ini bersifat permanen dan tidak dapat dibatalkan. Seluruh data sponsor yang dipilih akan dihapus dari sistem.
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-itcg-gray flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                disabled={isBulkDeleting}
                className="px-4 py-2 text-xs font-heading font-semibold text-itcg-navy bg-itcg-gray-light hover:bg-itcg-gray rounded-lg transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleBulkDeleteConfirm}
                disabled={isBulkDeleting}
                className="inline-flex items-center px-4 py-2 text-xs font-heading font-bold text-white bg-itcg-red hover:bg-itcg-red-hover rounded-lg transition-colors shadow-xs disabled:opacity-50"
              >
                {isBulkDeleting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                    <span>Ya, Hapus Sponsor</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-itcg-navy relative animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-heading font-extrabold text-itcg-navy pb-3 border-b border-itcg-gray">
              {editingSponsor ? 'Edit Data Sponsor' : 'Tambah Mitra Sponsor Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Nama Perusahaan *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="PT Solusi Industri..."
                  className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Tingkat Tier *
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue font-bold"
                  >
                    <option value="PLATINUM">PLATINUM</option>
                    <option value="GOLD">GOLD</option>
                    <option value="SILVER">SILVER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Status Slot *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue font-bold"
                  >
                    <option value="CONFIRMED">CONFIRMED (Terkonfirmasi)</option>
                    <option value="RESERVED">RESERVED (Menunggu)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Kategori Industri *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="AI & Data / Industrial IoT"
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Urutan Tampil (Order)
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Logo File Upload & URL */}
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Logo Sponsor (Upload ke /public/uploads/sponsors/ atau Masukkan URL) *
                </label>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    required
                    value={formData.logoUrl}
                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    placeholder="/images/sponsors/xxx.svg atau /uploads/sponsors/xxx.png"
                    className="flex-1 px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue font-mono"
                  />

                  <label className="cursor-pointer inline-flex items-center px-3 py-2 text-xs font-heading font-bold text-white bg-itcg-navy hover:bg-itcg-navy-light rounded-lg transition-colors">
                    <Upload className="w-3.5 h-3.5 mr-1" />
                    <span>{uploadingLogo ? '...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*,.svg"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploadingLogo}
                    />
                  </label>
                </div>

                {formData.logoUrl && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-[10px] text-itcg-gray-dark">Preview:</span>
                    <div className="h-8 w-20 bg-gray-50 border p-1 rounded flex items-center justify-center">
                      <img
                        src={formData.logoUrl}
                        alt="Preview"
                        className="max-h-6 max-w-full object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://perusahaan.co.id"
                  className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Deskripsi Singkat
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Solusi teknologi yang dipamerkan..."
                  className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-itcg-gray flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-heading font-semibold text-itcg-navy bg-itcg-gray-light hover:bg-itcg-gray rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-heading font-bold text-white bg-itcg-blue hover:bg-itcg-blue-hover rounded-lg transition-colors"
                >
                  {editingSponsor ? 'Simpan Perubahan' : 'Tambahkan Sponsor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
