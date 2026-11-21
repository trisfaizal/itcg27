'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Building,
  User,
  Briefcase,
  Layers,
  MapPin,
  Check,
  X,
} from 'lucide-react';

interface ScheduleSession {
  id: string;
  order: number;
  day: string;
  timeSlot: string;
  period: string;
  category: string;
  title: string;
  description: string;
  speakerName: string | null;
  speakerRole: string | null;
  companyName: string | null;
  stage: string | null;
  status: string;
  updatedAt: string;
}

export default function AdminScheduleTab() {
  const [sessions, setSessions] = useState<ScheduleSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'platinum'>('all');
  const [platinumSponsors, setPlatinumSponsors] = useState<string[]>([]);

  // Edit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ScheduleSession | null>(null);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Edit Form Fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    companyName: '',
    speakerName: '',
    speakerRole: '',
    timeSlot: '',
    status: 'TBA',
    stage: '',
  });

  // Add Form Fields
  const [newSessionData, setNewSessionData] = useState({
    day: 'Day 1',
    timeSlot: '',
    order: 1,
    category: 'PLATINUM PARTNER',
    isPlatinum: true,
    status: 'TBA',
    title: '',
    description: '',
    companyName: '',
    speakerName: '',
    speakerRole: '',
    stage: 'Panggung Utama (16x6m)',
  });

  const isPlatinumSession = (s: ScheduleSession) =>
    s.category === 'PLATINUM_KEYNOTE' ||
    s.category === 'PLATINUM PARTNER' ||
    s.category === 'PLATINUM';

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/schedule', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      }
    } catch (err) {
      console.error('Error fetching schedule sessions:', err);
      showNotification('error', 'Gagal memuat daftar jadwal sesi.');
    } finally {
      setLoading(false);
    }
  };

  const fetchPlatinumSponsors = async () => {
    try {
      const res = await fetch('/api/sponsors', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        const platinumList = data
          .filter((s: any) => s.tier?.toUpperCase() === 'PLATINUM')
          .map((s: any) => s.companyName as string);
        setPlatinumSponsors(platinumList);
      }
    } catch {
      // Non-blocking fallback
    }
  };

  useEffect(() => {
    fetchSessions();
    fetchPlatinumSponsors();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Open Edit Modal
  const openEditModal = (session: ScheduleSession) => {
    setEditingSession(session);
    setFormData({
      title: session.title || '',
      description: session.description || '',
      companyName: session.companyName || '',
      speakerName: session.speakerName || '',
      speakerRole: session.speakerRole || '',
      timeSlot: session.timeSlot || '',
      status: session.status || 'TBA',
      stage: session.stage || '',
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSession(null);
  };

  // Open Add Modal
  const openAddModal = () => {
    const day1Sessions = sessions.filter((s) => s.day === 'Day 1');
    const nextOrder =
      day1Sessions.length > 0
        ? Math.max(...day1Sessions.map((s) => s.order)) + 1
        : 1;

    setNewSessionData({
      day: 'Day 1',
      timeSlot: '',
      order: nextOrder,
      category: 'PLATINUM PARTNER',
      isPlatinum: true,
      status: 'TBA',
      title: `Platinum Partner Presentation #${nextOrder} (TBA)`,
      description: '',
      companyName: '',
      speakerName: '',
      speakerRole: '',
      stage: 'Panggung Utama (16x6m)',
    });
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Handle Day change in Add Form
  const handleAddDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDay = e.target.value;
    const daySessions = sessions.filter((s) => s.day === selectedDay);
    const nextOrder =
      daySessions.length > 0
        ? Math.max(...daySessions.map((s) => s.order)) + 1
        : 1;

    setNewSessionData((prev) => ({
      ...prev,
      day: selectedDay,
      order: nextOrder,
      title:
        prev.isPlatinum && prev.title.startsWith('Platinum Partner Presentation #')
          ? `Platinum Partner Presentation #${nextOrder} (TBA)`
          : prev.title,
    }));
  };

  // Handle Category change in Add Form
  const handleAddCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCat = e.target.value;
    const isPlat = newCat === 'PLATINUM PARTNER' || newCat === 'PLATINUM_KEYNOTE';
    setNewSessionData((prev) => ({
      ...prev,
      category: newCat,
      isPlatinum: isPlat,
      title: isPlat && (!prev.title || prev.title.includes('Presentation'))
        ? `Platinum Partner Presentation #${prev.order} (TBA)`
        : prev.title,
    }));
  };

  // Handle Platinum Toggle
  const handlePlatinumToggle = (checked: boolean) => {
    setNewSessionData((prev) => ({
      ...prev,
      isPlatinum: checked,
      category: checked ? 'PLATINUM PARTNER' : 'KEYNOTE SPEECH',
      title: checked && (!prev.title || prev.title.includes('Presentation'))
        ? `Platinum Partner Presentation #${prev.order} (TBA)`
        : prev.title,
    }));
  };

  // Handle Add Form Change
  const handleAddFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSessionData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Add Form
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newSessionData.title.trim()) {
      showNotification('error', 'Judul sesi tidak boleh kosong.');
      return;
    }

    if (!newSessionData.timeSlot.trim()) {
      showNotification('error', 'Waktu sesi (time slot) wajib diisi.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newSessionData,
          speakerName: newSessionData.speakerName.trim() || (newSessionData.isPlatinum ? 'To Be Announced' : '-'),
          speakerRole: newSessionData.speakerRole.trim() || (newSessionData.isPlatinum ? 'Platinum Technology Partner' : '-'),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Gagal menambahkan sesi.');
      }

      const created = await res.json();
      setSessions((prev) => [...prev, created].sort((a, b) => {
        if (a.day !== b.day) return a.day.localeCompare(b.day);
        return a.order - b.order;
      }));

      closeAddModal();
      showNotification('success', `Sesi baru "${created.title}" berhasil ditambahkan ke jadwal.`);
    } catch (err: any) {
      console.error('Error adding session:', err);
      showNotification('error', err.message || 'Gagal menambahkan sesi jadwal.');
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSession) return;

    if (!formData.title.trim()) {
      showNotification('error', 'Judul sesi presentasi tidak boleh kosong.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/schedule/${editingSession.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Gagal menyimpan perubahan.');
      }

      const updated = await res.json();
      setSessions((prev) =>
        prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
      );

      closeModal();
      showNotification('success', `Sesi "${formData.title}" berhasil diperbarui.`);
    } catch (err: any) {
      console.error('Error updating session:', err);
      showNotification('error', err.message || 'Gagal menyimpan sesi jadwal.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Session
  const handleDeleteSession = async (sessionToDelete: ScheduleSession) => {
    const confirmMessage = `Apakah Anda yakin ingin menghapus sesi "${sessionToDelete.title}"? Tindakan ini tidak dapat dibatalkan.`;
    if (!window.confirm(confirmMessage)) return;

    setDeletingId(sessionToDelete.id);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/schedule/${sessionToDelete.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Gagal menghapus sesi.');
      }

      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete.id));

      if (isModalOpen && editingSession?.id === sessionToDelete.id) {
        closeModal();
      }

      showNotification('success', `Sesi "${sessionToDelete.title}" berhasil dihapus dari jadwal.`);
    } catch (err: any) {
      console.error('Error deleting session:', err);
      showNotification('error', err.message || 'Gagal menghapus sesi jadwal.');
    } finally {
      setDeletingId(null);
      setSubmitting(false);
    }
  };

  // Quick switch status directly
  const handleQuickStatusToggle = async (session: ScheduleSession) => {
    const nextStatus = session.status === 'CONFIRMED' ? 'TBA' : 'CONFIRMED';
    try {
      const res = await fetch(`/api/schedule/${session.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setSessions((prev) =>
          prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s))
        );
        showNotification(
          'success',
          `Status sesi "${session.title}" diubah menjadi ${nextStatus}.`
        );
      }
    } catch (err) {
      console.error('Quick status toggle error:', err);
      showNotification('error', 'Gagal memperbarui status sesi.');
    }
  };

  const filteredSessions = sessions.filter((s) => {
    if (filterType === 'platinum') {
      return isPlatinumSession(s);
    }
    return true;
  });

  const platinumCount = sessions.filter(isPlatinumSession).length;
  const confirmedPlatinum = sessions.filter(
    (s) => isPlatinumSession(s) && s.status === 'CONFIRMED'
  ).length;

  return (
    <div className="space-y-6">
      
      {/* Notification Toast */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between shadow-lg transition-all animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-heading font-semibold">
              {notification.message}
            </span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Metric Summary (Clean rounded-2xl with official colors) */}
      <div className="bg-white border border-[#E6E9F2] rounded-2xl p-6 sm:p-7 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-heading font-extrabold text-itcg-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              <span>Event Schedule &amp; Platinum Sessions</span>
            </div>
            <h2 className="text-2xl font-heading font-extrabold text-itcg-navy mt-2">
              Manajemen Jadwal &amp; Slot Sponsor Keynote
            </h2>
            <p className="text-xs sm:text-sm text-itcg-navy/70 mt-1 max-w-2xl leading-relaxed">
              Tambahkan sesi baru, atur slot presentasi mitra Platinum, dan perbarui topik pembicara secara dinamis tanpa mengubah kode.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={fetchSessions}
              disabled={loading}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-heading font-bold text-itcg-navy bg-[#F5F7FA] hover:bg-[#E6E9F2] border border-[#E6E9F2] rounded-xl transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>

            {/* Primary Action: Tambah Sesi / Slot Baru */}
            <button
              onClick={openAddModal}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-heading font-extrabold text-white bg-itcg-red hover:bg-[#c20527] rounded-xl transition-all shadow-md group"
            >
              <Plus className="w-4 h-4 stroke-[2.5] group-hover:scale-110 transition-transform" />
              <span>+ Tambah Sesi / Slot</span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Highlights Box (Using Official ITCG Colors) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-5 border-t border-[#E6E9F2]">
          <div className="bg-[#F5F7FA] p-3.5 rounded-xl border border-[#E6E9F2]">
            <div className="text-[11px] font-mono font-bold text-itcg-navy/70 uppercase">
              Total Conference Sessions
            </div>
            <div className="text-2xl font-heading font-black text-itcg-navy mt-1">
              {sessions.length}
            </div>
          </div>

          <div className="bg-itcg-blue-light/30 p-3.5 rounded-xl border border-itcg-blue/30">
            <div className="text-[11px] font-mono font-bold text-itcg-blue uppercase">
              Platinum Presentation Slots
            </div>
            <div className="text-2xl font-heading font-black text-itcg-blue mt-1">
              {platinumCount} <span className="text-xs font-normal text-itcg-navy/60 font-sans">Slot Utama</span>
            </div>
          </div>

          <div className="bg-itcg-red-subtle/30 p-3.5 rounded-xl border border-itcg-red/30">
            <div className="text-[11px] font-mono font-bold text-itcg-red uppercase">
              Confirmed Platinum Topics
            </div>
            <div className="text-2xl font-heading font-black text-itcg-red mt-1">
              {confirmedPlatinum} / {platinumCount}{' '}
              <span className="text-xs font-normal text-itcg-navy/60 font-sans">
                ({platinumCount - confirmedPlatinum} Slot TBA)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-1.5 rounded-xl border border-[#E6E9F2] shadow-xs max-w-md">
        <button
          onClick={() => setFilterType('all')}
          className={`flex-1 px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all ${
            filterType === 'all'
              ? 'bg-itcg-navy text-white shadow-xs'
              : 'text-itcg-navy/70 hover:text-itcg-navy hover:bg-[#F5F7FA]'
          }`}
        >
          All Sessions ({sessions.length})
        </button>
        <button
          onClick={() => setFilterType('platinum')}
          className={`flex-1 px-4 py-2 text-xs font-heading font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 ${
            filterType === 'platinum'
              ? 'bg-itcg-blue text-white shadow-xs'
              : 'text-itcg-navy/70 hover:text-itcg-blue hover:bg-[#F5F7FA]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-white/90" />
          <span>Platinum Slots ({platinumCount})</span>
        </button>
      </div>

      {/* Sessions List */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-[#E6E9F2] p-12 text-center text-itcg-navy/60 space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-itcg-blue" />
          <p className="text-sm font-heading font-semibold">Memuat data jadwal sesi...</p>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E6E9F2] p-12 text-center text-itcg-navy/60">
          <Calendar className="w-8 h-8 mx-auto text-itcg-gray mb-2" />
          <p className="text-sm font-heading font-bold text-itcg-navy">Tidak ada sesi ditemukan</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredSessions.map((item) => {
            const isPlatinum = isPlatinumSession(item);
            const isTba = item.status === 'TBA';

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border-2 transition-all p-5 shadow-xs hover:shadow-md ${
                  isPlatinum
                    ? isTba
                      ? 'border-itcg-blue/30 bg-itcg-blue-light/10'
                      : 'border-itcg-blue bg-white'
                    : 'border-[#E6E9F2] hover:border-itcg-navy/30'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  
                  {/* Left: Time & Core Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Time Badge */}
                      <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono font-bold bg-itcg-navy text-white rounded">
                        <Clock className="w-3 h-3 text-itcg-blue-light" />
                        <span>{item.timeSlot}</span>
                      </span>

                      {/* Category Badge */}
                      <span
                        className={`text-[10px] font-heading font-extrabold uppercase px-2 py-0.5 rounded ${
                          isPlatinum
                            ? 'bg-itcg-blue text-white'
                            : 'bg-[#E6E9F2] text-itcg-navy'
                        }`}
                      >
                        {item.category.replace('_', ' ')}
                      </span>

                      {/* Status Badge */}
                      <button
                        onClick={() => handleQuickStatusToggle(item)}
                        title="Klik untuk mengubah status cepat"
                        className={`inline-flex items-center space-x-1 text-[11px] font-heading font-extrabold px-2.5 py-0.5 rounded-full border transition-all ${
                          item.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-itcg-red-subtle text-itcg-red border-itcg-red/30 hover:bg-itcg-red/15'
                        }`}
                      >
                        {item.status === 'CONFIRMED' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>CONFIRMED</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-itcg-red" />
                            <span>TBA (Belum Final)</span>
                          </>
                        )}
                      </button>

                      {/* Day Label */}
                      <span className="text-xs font-mono text-itcg-navy/50 font-semibold">
                        {item.day} • Order #{item.order}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-heading font-extrabold text-itcg-navy leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-itcg-navy/70 leading-relaxed max-w-4xl">
                      {item.description}
                    </p>

                    {/* Meta Info Row */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-itcg-navy/70">
                      {item.companyName && (
                        <div className="flex items-center space-x-1.5 font-medium text-itcg-navy">
                          <Building className="w-3.5 h-3.5 text-itcg-blue" />
                          <span>{item.companyName}</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-1.5">
                        <User className="w-3.5 h-3.5 text-itcg-navy/50" />
                        <span className="font-semibold text-itcg-navy">
                          {item.speakerName || 'To Be Announced'}
                        </span>
                        {item.speakerRole && (
                          <span className="text-itcg-navy/60">({item.speakerRole})</span>
                        )}
                      </div>

                      {item.stage && (
                        <div className="flex items-center space-x-1.5 text-itcg-navy/60">
                          <MapPin className="w-3.5 h-3.5 text-itcg-navy/40" />
                          <span>{item.stage}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center space-x-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-[#E6E9F2] flex-shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-heading font-extrabold text-white bg-itcg-navy hover:bg-itcg-blue rounded-xl transition-all shadow-xs group"
                    >
                      <Edit2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>Edit Sesi</span>
                    </button>

                    <button
                      onClick={() => handleDeleteSession(item)}
                      disabled={deletingId === item.id}
                      title="Hapus sesi ini"
                      className="p-2 text-itcg-navy/60 hover:text-itcg-red hover:bg-itcg-red/10 rounded-xl border border-[#E6E9F2] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Session Modal */}
      {isModalOpen && editingSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-itcg-navy shadow-2xl max-w-2xl w-full my-8 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-itcg-navy text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-itcg-blue-light font-bold block">
                  Perbarui Informasi Sesi #{editingSession.order} ({editingSession.day})
                </span>
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-white">
                  Edit Detail Sesi Jadwal Konferensi
                </h3>
              </div>
              <button
                onClick={closeModal}
                disabled={submitting}
                className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Row 1: TimeSlot & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Time Slot (Waktu Sesi) <span className="text-itcg-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeSlot: e.target.value }))}
                    required
                    placeholder="Contoh: 10:10 - 10:50 WIB"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue focus:ring-1 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Status Kesiapan Sesi <span className="text-itcg-red">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  >
                    <option value="TBA">TBA (Materi / Pembicara Belum Final)</option>
                    <option value="CONFIRMED">CONFIRMED (Terkonfirmasi &amp; Siap Tayang)</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Title */}
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Session Title (Judul Presentasi) <span className="text-itcg-red">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                  placeholder="Contoh: Accelerated AI in Smart Factory & Predictive Quality"
                  className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                />
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Description (Ringkasan Materi &amp; Studi Kasus)
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Jelaskan ringkasan solusi teknologi, arsitektur, dan dampak operasional yang akan dipaparkan..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue leading-relaxed"
                />
              </div>

              {/* Row 4: Sponsor / Company Name & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Sponsor / Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Contoh: Quantum Industrial AI"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                  {platinumSponsors.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] text-itcg-navy/60">Pilih mitra:</span>
                      {platinumSponsors.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, companyName: name }))}
                          className="text-[10px] font-heading font-bold px-1.5 py-0.5 rounded bg-[#F5F7FA] hover:bg-itcg-blue hover:text-white text-itcg-navy transition-colors"
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Stage / Location
                  </label>
                  <input
                    type="text"
                    name="stage"
                    value={formData.stage}
                    onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                    placeholder="Contoh: Panggung Utama (16x6m)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Row 5: Speaker Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Speaker Name (Nama Pembicara)
                  </label>
                  <input
                    type="text"
                    name="speakerName"
                    value={formData.speakerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, speakerName: e.target.value }))}
                    placeholder="Contoh: Ir. Hendra Wijaya, M.T."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Speaker Role / Position
                  </label>
                  <input
                    type="text"
                    name="speakerRole"
                    value={formData.speakerRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, speakerRole: e.target.value }))}
                    placeholder="Contoh: Head of Industrial AI Solutions"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Modal Action Buttons with Delete Option */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDeleteSession(editingSession)}
                  disabled={submitting}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-heading font-bold text-itcg-red hover:bg-red-50 border border-itcg-red/30 rounded-xl transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus Sesi</span>
                </button>

                <div className="flex items-center space-x-2.5">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={submitting}
                    className="px-4 py-2 text-xs font-heading font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center space-x-1.5 px-5 py-2 text-xs font-heading font-extrabold text-white bg-itcg-red hover:bg-itcg-red-hover rounded-xl transition-all shadow-md disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Add Session Modal (Clean rounded-2xl bg-white) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-2xl border-2 border-itcg-navy shadow-2xl max-w-2xl w-full my-8 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-itcg-navy text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-itcg-blue-light font-bold block">
                  Slot Baru Jadwal Konferensi ITCG 2027
                </span>
                <h3 className="text-base sm:text-lg font-heading font-extrabold text-white">
                  Tambah Sesi / Slot Presentasi Baru
                </h3>
              </div>
              <button
                onClick={closeAddModal}
                disabled={submitting}
                className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Row 1: Hari, Waktu, & Urutan */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Hari Konferensi <span className="text-itcg-red">*</span>
                  </label>
                  <select
                    name="day"
                    value={newSessionData.day}
                    onChange={handleAddDayChange}
                    className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  >
                    <option value="Day 1">Day 1 (16 Jan 2027)</option>
                    <option value="Day 2">Day 2 (17 Jan 2027)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Waktu Sesi (Time Slot) <span className="text-itcg-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="timeSlot"
                    value={newSessionData.timeSlot}
                    onChange={handleAddFormChange}
                    required
                    placeholder="Contoh: 15:30 - 16:10 WIB"
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Urutan Tampil (Order) <span className="text-itcg-red">*</span>
                  </label>
                  <input
                    type="number"
                    name="order"
                    min={1}
                    value={newSessionData.order}
                    onChange={handleAddFormChange}
                    required
                    className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Row 2: Kategori Sesi & Platinum Flag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#F5F7FA] p-3.5 rounded-xl border border-[#E6E9F2]">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Kategori Sesi <span className="text-itcg-red">*</span>
                  </label>
                  <select
                    name="category"
                    value={newSessionData.category}
                    onChange={handleAddCategoryChange}
                    className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue bg-white"
                  >
                    <option value="PLATINUM PARTNER">PLATINUM PARTNER (Keynote 40 Min)</option>
                    <option value="KEYNOTE SPEECH">KEYNOTE SPEECH</option>
                    <option value="PANEL DISCUSSION">PANEL DISCUSSION / EXECUTIVE PANEL</option>
                    <option value="OPENING">OPENING CEREMONY</option>
                    <option value="NETWORKING">NETWORKING &amp; ISOMA</option>
                  </select>
                </div>

                <div className="pt-2 sm:pt-4">
                  <label className="inline-flex items-center space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={newSessionData.isPlatinum}
                      onChange={(e) => handlePlatinumToggle(e.target.checked)}
                      className="w-4 h-4 rounded text-itcg-red focus:ring-itcg-red border-slate-300 cursor-pointer"
                    />
                    <span className="text-xs font-heading font-bold text-itcg-navy">
                      Tandai sebagai Slot Sponsor Platinum
                    </span>
                  </label>
                  <p className="text-[10px] text-itcg-navy/60 mt-0.5 ml-6">
                    Otomatis masuk ke filter Platinum Slots dan menambah kuota slot Platinum.
                  </p>
                </div>
              </div>

              {/* Row 3: Status & Judul */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Status Kesiapan Sesi <span className="text-itcg-red">*</span>
                  </label>
                  <select
                    name="status"
                    value={newSessionData.status}
                    onChange={handleAddFormChange}
                    className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  >
                    <option value="TBA">TBA (Belum Final)</option>
                    <option value="CONFIRMED">CONFIRMED (Siap Tayang)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Judul Sesi / Topik <span className="text-itcg-red">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newSessionData.title}
                    onChange={handleAddFormChange}
                    required
                    placeholder="Contoh: Platinum Partner Presentation #6 (TBA)"
                    className="w-full px-3 py-2 text-xs font-heading font-bold border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Row 4: Deskripsi Singkat */}
              <div>
                <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                  Deskripsi Singkat Materi
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={newSessionData.description}
                  onChange={handleAddFormChange}
                  placeholder="Jelaskan ringkasan materi, studi kasus, atau demo teknologi yang akan dipaparkan..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue leading-relaxed"
                />
              </div>

              {/* Row 5: Perusahaan / Mitra & Quick-Fill */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Perusahaan / Mitra Sponsor
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={newSessionData.companyName}
                    onChange={handleAddFormChange}
                    placeholder="Contoh: PT Quantum Automation Indonesia"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                  {platinumSponsors.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] text-itcg-navy/60 font-heading font-medium">Quick-fill:</span>
                      {platinumSponsors.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setNewSessionData(prev => ({
                            ...prev,
                            companyName: name,
                            status: 'CONFIRMED',
                            title: prev.title.includes('TBA') ? `${name} Keynote Presentation` : prev.title
                          }))}
                          className="text-[10px] font-heading font-bold px-2 py-0.5 rounded bg-[#F5F7FA] hover:bg-itcg-blue hover:text-white text-itcg-navy transition-colors border border-[#E6E9F2]"
                        >
                          + {name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Lokasi / Stage
                  </label>
                  <input
                    type="text"
                    name="stage"
                    value={newSessionData.stage}
                    onChange={handleAddFormChange}
                    placeholder="Panggung Utama (16x6m)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Row 6: Pembicara & Jabatan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Nama Pembicara (Opsional)
                  </label>
                  <input
                    type="text"
                    name="speakerName"
                    value={newSessionData.speakerName}
                    onChange={handleAddFormChange}
                    placeholder="Contoh: Ir. Budi Santoso (Default TBA jika kosong)"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1">
                    Jabatan / Role Pembicara (Opsional)
                  </label>
                  <input
                    type="text"
                    name="speakerRole"
                    value={newSessionData.speakerRole}
                    onChange={handleAddFormChange}
                    placeholder="Contoh: VP Technology / Head of AI"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-itcg-blue"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeAddModal}
                  disabled={submitting}
                  className="px-4 py-2 text-xs font-heading font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 text-xs font-heading font-extrabold text-white bg-itcg-red hover:bg-[#c20527] rounded-xl transition-all shadow-md disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>+ Simpan Sesi Baru</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
