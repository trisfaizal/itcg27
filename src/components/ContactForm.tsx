'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Mail, Phone, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  'Informasi Registrasi Peserta',
  'Pertanyaan Umum Acara',
  'Media Partner & Publikasi',
  'Pembicara & Komunitas',
  'Lainnya',
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    phone: '',
    category: CATEGORIES[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName.trim() ||
      !formData.organization.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.message.trim()
    ) {
      setErrorMessage('Mohon lengkapi seluruh field formulir yang bertanda bintang (*).');
      return;
    }

    const to = 'official@komitkabe.id';
    const subject = encodeURIComponent(
      `[ITCG 2027 Contact - ${formData.category}] ${formData.fullName} - ${formData.organization}`
    );
    const body = encodeURIComponent(
      `Yth. Tim Sekretariat ITCG 2027 KOMITKABE,\n\n` +
      `Berikut rincian pesan / pertanyaan yang kami sampaikan melalui portal resmi ITCG 2027:\n\n` +
      `* Nama Lengkap: ${formData.fullName}\n` +
      `* Perusahaan / Instansi / Komunitas: ${formData.organization}\n` +
      `* Alamat Email: ${formData.email}\n` +
      `* No. WhatsApp / HP: ${formData.phone}\n` +
      `* Kategori Pertanyaan: ${formData.category}\n\n` +
      `Pesan / Pertanyaan:\n${formData.message}\n\n` +
      `Mohon dapat ditindaklanjuti oleh panitia terkait.\n\n` +
      `Salam hormat,\n${formData.fullName}`
    );

    const mailtoUrl = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl bg-white border border-[#E6E9F2] p-6 sm:p-8 shadow-xs">
      <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5 bg-[#0066E0]/10 text-[#0066E0] border border-[#0066E0]/15">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0066E0] shrink-0" />
        <span>Formulir Pesan Sekretariat</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0D2B6B] tracking-tight leading-tight">
        Kirim Pertanyaan Langsung
      </h3>
      <p className="text-xs sm:text-sm text-itcg-navy/70 mt-1 mb-6">
        Lengkapi data berikut untuk terhubung langsung dengan tim sekretariat ITCG 2027.
      </p>

      {submitted && (
        <div className="mb-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs sm:text-sm flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-heading font-bold">Pesan Terformat Siap Dikirim</p>
            <p className="text-emerald-700 leading-relaxed text-xs">
              Aplikasi email Anda telah terbuka otomatis dengan pesan terstruktur. Jika email klien tidak terbuka, Anda dapat mengirimkan pesan manual ke <strong className="font-semibold">official@komitkabe.id</strong>.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-red-800 text-xs sm:text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="font-medium text-xs leading-relaxed">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
            >
              Nama Lengkap *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Contoh: Budi Santoso"
              className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy placeholder:text-itcg-navy/40 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="organization"
              className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
            >
              Perusahaan / Instansi / Komunitas *
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              required
              value={formData.organization}
              onChange={handleChange}
              placeholder="Nama instansi atau komunitas"
              className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy placeholder:text-itcg-navy/40 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
            >
              Alamat Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="nama@perusahaan.co.id"
              className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy placeholder:text-itcg-navy/40 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
            >
              Nomor WhatsApp / HP Aktif *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="0812-XXXX-XXXX"
              className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy placeholder:text-itcg-navy/40 transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
          >
            Kategori Pertanyaan *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-11 px-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy transition-colors font-medium"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-heading font-bold text-itcg-navy uppercase tracking-wider mb-1.5"
          >
            Pesan / Pertanyaan *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Tuliskan pertanyaan, permohonan informasi, atau rincian koordinasi yang Anda butuhkan..."
            className="w-full p-3.5 text-xs sm:text-sm bg-white border border-[#E6E9F2] rounded-xl focus:outline-none focus:border-[#0066E0] focus:ring-2 focus:ring-[#0066E0]/20 text-itcg-navy placeholder:text-itcg-navy/40 transition-colors resize-y leading-relaxed"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 min-h-[46px] text-xs sm:text-sm font-heading font-bold text-white bg-[#0066E0] hover:bg-[#0052B4] rounded-xl transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0066E0]/40 group"
          >
            <Send className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
            <span>Kirim Pesan ke Sekretariat</span>
          </button>
          <p className="text-[11px] text-itcg-navy/60 text-center mt-2.5">
            Pesan akan diteruskan ke email resmi sekretariat (official@komitkabe.id) dan direspons pada hari kerja.
          </p>
        </div>

        {/* Direct WhatsApp Coordination Section */}
        <div className="border-t border-[#E6E9F2] mt-6 pt-6">
          <div className="text-[11px] font-bold tracking-wider uppercase text-[#0D2B6B] mb-3.5">
            OR CONNECT DIRECTLY VIA WHATSAPP:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Card 1 - Ketua Panitia */}
            <a
              href="https://wa.me/6281219884085?text=Halo%20Pak%20Afriyanto%20(Ketua%20Panitia%20ITCG%202027)%2C%20saya%20ingin%20berkoordinasi%20terkait%20informasi%20acara%206th%20IT%20Community%20Gathering%202027."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#E6E9F2] bg-[#F5F7FA]/60 hover:bg-white hover:border-[#0066E0] p-3.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#0066E0]/30"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0D2B6B] group-hover:text-[#0066E0] transition-colors truncate">
                    Afriyanto (Ketua)
                  </div>
                  <div className="text-[11px] font-medium text-[#0D2B6B]/70 font-mono">
                    0812 1988 4085
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0D2B6B]/40 group-hover:text-[#0066E0] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Card 2 - Partnership 1 */}
            <a
              href="https://wa.me/628111112242?text=Halo%20Pak%20Andri%20Karyadi%20(Tim%20Partnership%20ITCG%202027)%2C%20saya%20ingin%20berdiskusi%20mengenai%20peluang%20sponsorship%20dan%20kemitraan%20pada%206th%20IT%20Community%20Gathering%202027."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#E6E9F2] bg-[#F5F7FA]/60 hover:bg-white hover:border-[#0066E0] p-3.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#0066E0]/30"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0D2B6B] group-hover:text-[#0066E0] transition-colors truncate">
                    Andri Karyadi
                  </div>
                  <div className="text-[11px] font-medium text-[#0D2B6B]/70 font-mono">
                    0811 1112 242
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0D2B6B]/40 group-hover:text-[#0066E0] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>

            {/* Card 3 - Partnership 2 */}
            <a
              href="https://wa.me/6282295139177?text=Halo%20Mas%20Qaisar%20Nur%20Irfansyah%20(Tim%20Partnership%20ITCG%202027)%2C%20saya%20ingin%20berdiskusi%20mengenai%20peluang%20sponsorship%20dan%20kemitraan%20pada%206th%20IT%20Community%20Gathering%202027."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 rounded-xl border border-[#E6E9F2] bg-[#F5F7FA]/60 hover:bg-white hover:border-[#0066E0] p-3.5 transition-all focus:outline-none focus:ring-2 focus:ring-[#0066E0]/30"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#22C55E] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0D2B6B] group-hover:text-[#0066E0] transition-colors truncate">
                    Qaisar Nur Irfansyah
                  </div>
                  <div className="text-[11px] font-medium text-[#0D2B6B]/70 font-mono">
                    0822 9513 9177
                  </div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#0D2B6B]/40 group-hover:text-[#0066E0] group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
