'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Bell, CheckCircle, Clock, Sparkles, RefreshCw, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface EventUpdate {
  id: string;
  title: string;
  description: string;
  badgeStatus: string;
  publishedAt: string;
  isActive: boolean;
}

export default function AdminUpdatesTab() {
  const [updates, setUpdates] = useState<EventUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUpdate, setEditingUpdate] = useState<EventUpdate | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    badgeStatus: 'Progress',
    publishedAt: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const showNotification = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => {
      setStatusMessage((current) => (current?.text === text ? null : current));
    }, 4000);
  };

  const fetchUpdates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/updates');
      const data = await res.json();
      if (Array.isArray(data)) {
        setUpdates(data);
      }
    } catch (err) {
      console.error('Error fetching updates:', err);
      showNotification('error', 'Gagal memuat daftar warta acara');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const openCreateModal = () => {
    setEditingUpdate(null);
    setFormData({
      title: '',
      description: '',
      badgeStatus: 'Progress',
      publishedAt: new Date().toISOString().split('T')[0],
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (u: EventUpdate) => {
    setEditingUpdate(u);
    setFormData({
      title: u.title,
      description: u.description,
      badgeStatus: u.badgeStatus,
      publishedAt: new Date(u.publishedAt).toISOString().split('T')[0],
      isActive: u.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      showNotification('error', 'Judul dan deskripsi wajib diisi');
      return;
    }

    try {
      if (editingUpdate) {
        const res = await fetch(`/api/updates/${editingUpdate.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          showNotification('success', 'Warta acara berhasil diperbarui');
          fetchUpdates();
        } else {
          showNotification('error', 'Gagal memperbarui warta acara');
        }
      } else {
        const res = await fetch('/api/updates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setIsModalOpen(false);
          showNotification('success', 'Warta acara baru berhasil ditambahkan');
          fetchUpdates();
        } else {
          showNotification('error', 'Gagal menambahkan warta acara');
        }
      }
    } catch (err) {
      showNotification('error', 'Terjadi kesalahan koneksi');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/updates/${deleteTarget.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showNotification('success', `Pengumuman "${deleteTarget.title}" berhasil dihapus`);
        setDeleteTarget(null);
        fetchUpdates();
      } else {
        showNotification('error', 'Gagal menghapus warta');
      }
    } catch (err) {
      showNotification('error', 'Terjadi kesalahan koneksi');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Banner */}
      {statusMessage && (
        <div
          role="status"
          className={`p-3.5 rounded-lg text-xs font-semibold flex items-center justify-between border ${
            statusMessage.type === 'success'
              ? 'bg-itcg-blue-light border-itcg-blue/40 text-itcg-navy'
              : 'bg-itcg-red-subtle border-itcg-red/40 text-itcg-red'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            onClick={() => setStatusMessage(null)}
            className="p-1 text-current hover:opacity-75 focus:outline-none"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-itcg-gray shadow-xs">
        <div>
          <h3 className="text-sm font-heading font-extrabold text-itcg-navy">
            Warta & Pengumuman Live Persiapan Acara
          </h3>
          <p className="text-xs text-itcg-gray-dark mt-0.5">
            Daftar update yang tampil di papan pengumuman beranda depan publik.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={fetchUpdates}
            className="p-2 text-itcg-navy hover:text-itcg-blue rounded-md border border-itcg-gray hover:bg-itcg-gray-light"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 text-xs font-heading font-bold text-white bg-itcg-blue hover:bg-itcg-blue-hover rounded-md shadow-xs transition-all"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Tambah Warta Baru</span>
          </button>
        </div>
      </div>

      {/* Updates Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {updates.map((item) => (
          <div
            key={item.id}
            className="bg-white border-2 border-itcg-gray rounded-xl p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-itcg-gray">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-heading font-bold ${
                    item.badgeStatus === 'Terkonfirmasi'
                      ? 'bg-itcg-blue-light text-itcg-blue border border-itcg-blue/30'
                      : item.badgeStatus === 'Progress'
                      ? 'bg-itcg-navy text-white'
                      : 'bg-itcg-red-subtle text-itcg-red border border-itcg-red/20'
                  }`}
                >
                  {item.badgeStatus}
                </span>

                <span className="text-[11px] font-mono text-itcg-gray-dark">
                  {formatDate(item.publishedAt)}
                </span>
              </div>

              <h4 className="text-base font-heading font-extrabold text-itcg-navy mt-3">
                {item.title}
              </h4>

              <p className="text-xs text-itcg-navy/75 mt-2 line-clamp-4 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-itcg-gray flex items-center justify-between">
              <span className={`text-[11px] font-medium ${item.isActive ? 'text-itcg-blue font-semibold' : 'text-itcg-gray-dark'}`}>
                {item.isActive ? '● Tayang di Beranda' : '○ Disembunyikan'}
              </span>

              <div className="flex space-x-1">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 text-itcg-navy hover:text-itcg-blue hover:bg-itcg-blue-light rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: item.id, title: item.title })}
                  className="p-1.5 text-itcg-red hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                  title="Hapus"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border-2 border-itcg-navy relative animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-base font-heading font-extrabold text-itcg-navy pb-2 border-b border-itcg-gray">
              Konfirmasi Hapus Warta
            </h3>
            <p className="text-xs text-itcg-navy/80 mt-3 leading-relaxed">
              Apakah Anda yakin ingin menghapus pengumuman <strong>"{deleteTarget.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="mt-5 pt-3 border-t border-itcg-gray flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-3.5 py-1.5 text-xs font-heading font-semibold text-itcg-navy bg-itcg-gray-light hover:bg-itcg-gray rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-3.5 py-1.5 text-xs font-heading font-bold text-white bg-itcg-red hover:bg-red-700 rounded-lg transition-colors"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border-2 border-itcg-navy relative animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-heading font-extrabold text-itcg-navy pb-3 border-b border-itcg-gray">
              {editingUpdate ? 'Edit Warta Acara' : 'Buat Pengumuman Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Judul Pengumuman *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Misal: Penambahan Kuota Booth..."
                  className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Badge Status
                  </label>
                  <select
                    value={formData.badgeStatus}
                    onChange={(e) => setFormData({ ...formData, badgeStatus: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue font-bold"
                  >
                    <option value="Progress">Progress</option>
                    <option value="Terkonfirmasi">Terkonfirmasi</option>
                    <option value="Open">Open</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Tanggal Terbit
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Rincian Deskripsi *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Penjelasan progres pelaksanaan acara..."
                  className="w-full px-3 py-2 text-xs border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-itcg-blue focus:ring-itcg-blue"
                />
                <label htmlFor="isActive" className="text-xs text-itcg-navy font-semibold">
                  Tampilkan aktif di halaman depan
                </label>
              </div>

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
                  {editingUpdate ? 'Simpan Perubahan' : 'Publikasikan Warta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
