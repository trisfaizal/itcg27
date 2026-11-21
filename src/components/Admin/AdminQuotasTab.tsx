'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Info, RefreshCw, X } from 'lucide-react';

interface Tier {
  id: string;
  name: string;
  label: string;
  targetQuota: number;
  displayOrder: number;
  sponsors: any[];
}

export default function AdminQuotasTab() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [quotaInputs, setQuotaInputs] = useState<Record<string, number>>({});
  const [savingTier, setSavingTier] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const fetchTiers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/tiers');
      const data = await res.json();
      if (Array.isArray(data)) {
        setTiers(data);
        const initialQuotas: Record<string, number> = {};
        data.forEach((t: Tier) => {
          initialQuotas[t.name] = t.targetQuota;
        });
        setQuotaInputs(initialQuotas);
      }
    } catch (err) {
      console.error('Error fetching tiers:', err);
      setStatusMessage({
        type: 'error',
        text: 'Gagal memuat data kuota tier.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  const handleQuotaChange = (name: string, value: number) => {
    setQuotaInputs((prev) => ({
      ...prev,
      [name]: Math.max(1, value),
    }));
  };

  const handleSave = async (name: string) => {
    setSavingTier(name);
    setStatusMessage(null);

    try {
      const newQuota = quotaInputs[name];
      const res = await fetch('/api/tiers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          targetQuota: newQuota,
        }),
      });

      if (res.ok) {
        setStatusMessage({
          type: 'success',
          text: `Kuota tier ${name} berhasil diperbarui menjadi ${newQuota}.`,
        });
        fetchTiers();
      } else {
        const errJson = await res.json().catch(() => ({}));
        setStatusMessage({
          type: 'error',
          text: errJson.error || `Gagal memperbarui kuota tier ${name}.`,
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Terjadi kesalahan koneksi jaringan saat menyimpan kuota.',
      });
    } finally {
      setSavingTier(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Notice Card on Dynamic Logic */}
      <div className="bg-itcg-blue-light/70 border border-itcg-blue/30 p-4 rounded-xl flex items-start space-x-3 text-xs text-itcg-navy leading-relaxed">
        <Info className="w-5 h-5 text-itcg-blue flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-heading font-extrabold text-itcg-navy text-sm">
            Logika Fleksibel Kuota Sponsor
          </div>
          <p className="mt-0.5">
            Angka target kuota di bawah ini adalah acuan alokasi awal (default: Platinum = 6, Gold = 12, Silver = 12). 
            Sistem publik secara cerdas tetap menampilkan <strong>seluruh sponsor yang terkonfirmasi</strong> meskipun jumlahnya melebihi target awal, dan kuota tampilan di website publik otomatis menyesuaikan.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between shadow-xs transition-all ${
            statusMessage.type === 'success'
              ? 'bg-itcg-blue-light border-itcg-blue text-itcg-navy'
              : 'bg-red-50 border-red-300 text-red-900'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-itcg-blue flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <span className="text-xs sm:text-sm font-heading font-semibold">
              {statusMessage.text}
            </span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-itcg-navy/50 hover:text-itcg-navy p-1 transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Tiers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const confirmedCount = tier.sponsors ? tier.sponsors.filter((s: any) => s.status === 'CONFIRMED').length : 0;
          const currentInput = quotaInputs[tier.name] ?? tier.targetQuota;
          const isSaving = savingTier === tier.name;

          return (
            <div
              key={tier.id}
              className="bg-white border-2 border-itcg-gray rounded-xl p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-itcg-gray">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-heading font-extrabold rounded ${
                      tier.name === 'PLATINUM'
                        ? 'bg-itcg-navy text-white'
                        : tier.name === 'GOLD'
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {tier.name}
                  </span>
                  <span className="text-xs font-mono text-itcg-gray-dark">
                    Order #{tier.displayOrder}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-extrabold text-itcg-navy mt-3">
                  {tier.label}
                </h3>

                <div className="mt-4 p-3 bg-itcg-gray-light rounded-lg space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-itcg-gray-dark font-medium">Sponsor Terkonfirmasi:</span>
                    <span className="font-mono font-bold text-emerald-700">{confirmedCount} Perusahaan</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-itcg-gray-dark font-medium">Kapasitas Tampil Publik:</span>
                    <span className="font-mono font-bold text-itcg-navy">
                      {Math.max(tier.targetQuota, confirmedCount)} Slot
                    </span>
                  </div>
                </div>

                {/* Input Target Quota */}
                <div className="mt-5">
                  <label className="block text-xs font-heading font-bold text-itcg-navy mb-1.5 uppercase tracking-wider">
                    Target Alokasi Kuota
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={currentInput}
                      onChange={(e) => handleQuotaChange(tier.name, parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 text-sm font-mono font-bold border border-itcg-gray rounded-lg focus:outline-none focus:border-itcg-blue text-itcg-navy"
                    />
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={() => handleSave(tier.name)}
                      className="px-4 py-2 bg-itcg-blue hover:bg-itcg-blue-hover text-white text-xs font-heading font-bold rounded-lg transition-all flex items-center space-x-1 disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaving ? '...' : 'Simpan'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-itcg-gray text-[11px] text-itcg-gray-dark font-mono">
                Last updated: {new Date().toLocaleDateString('id-ID')}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
