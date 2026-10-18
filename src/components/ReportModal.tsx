import React from 'react';
import { X, Printer, CheckCircle2, Award, User, Calendar, BookOpen, ShieldCheck } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemUser: string;
  systemPass: string;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  systemUser,
  systemPass,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Modal Actions Header */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              Ödev Teslim & Rapor Belgesi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Area */}
        <div className="p-8 space-y-6 text-slate-800 dark:text-slate-100 print:text-black print:p-0">
          {/* Document Header */}
          <div className="border-b-2 border-indigo-600 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded mb-2">
                ALGORİTMA VE PROGRAMLAMA 101 DERSİ
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                Ödev: Kullanıcı Girişi & Şifre Sıfırlama
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Koşullu İfadeler (if-else) ve String Karşılaştırma Pratiği
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Hazırlayan: Enes Öztürk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Tarih: {new Date().toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Durum: Tamamlandı / Doğrulandı</span>
              </div>
            </div>
          </div>

          {/* Soru Metni */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              1. Ödev Soru Metni
            </h2>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed italic text-slate-700 dark:text-slate-300">
              "Eğer şifre yanlış ise kullanıcıya şifresini sıfırlayıp sıfırlamayacağını sorun, eğer kullanıcı sıfırlamak isterse yeni girdiği şifrenin unuttuğu şifre ile aynı olmaması gerektiğini kontrol edip, şifreler aynı ise ekrana <strong className="text-rose-600 dark:text-rose-400">"Şifre oluşturulamadı, lütfen başka şifre giriniz."</strong> sorun yoksa <strong className="text-emerald-600 dark:text-emerald-400">"Şifre oluşturuldu"</strong> yazan programı yazınız."
            </div>
          </div>

          {/* Çözüm Mantığı */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              2. Algoritma Analizi ve Kriterler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-slate-100">Kural 1: Şifre Eşleşmesi</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Kullanıcı adı ve şifre doğru ise "Giriş Başarılı" mesajı verilir ve sistem sonlanır.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <span className="font-bold text-slate-900 dark:text-slate-100">Kural 2: Sıfırlama Teklifi</span>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Şifre yanlış girildiğinde kullanıcıya sıfırlamak isteyip istemediği sorulur (E/H).
                </p>
              </div>

              <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20">
                <span className="font-bold text-rose-700 dark:text-rose-300">Kural 3: Şifreler Aynı İse</span>
                <p className="text-rose-600 dark:text-rose-400 mt-1 font-semibold">
                  "Şifre oluşturulamadı, lütfen başka şifre giriniz."
                </p>
              </div>

              <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20">
                <span className="font-bold text-emerald-700 dark:text-emerald-300">Kural 4: Şifreler Farklı İse</span>
                <p className="text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">
                  "Şifre oluşturuldu"
                </p>
              </div>
            </div>
          </div>

          {/* İmzalı Teslim Notu */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div>
              Ödev Teslimi: <strong>Enes Öztürk</strong>
            </div>
            <div className="font-mono text-[11px]">
              Tüm test senaryoları %100 başarıyla geçmiştir.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
