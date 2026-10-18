import React from 'react';
import { GitCommit, ArrowDown, Check, X, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

export const Flowchart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <GitCommit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
            Algoritma Akış Şeması (Flowchart)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Ödev mantığının karar ağacı ve koşullu dallanma haritası
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center space-y-4 text-xs font-sans">
        {/* Node 1: Start */}
        <div className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200">
          BAŞLA (Program Çalıştırıldı)
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Node 2: Input */}
        <div className="px-5 py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-center text-indigo-900 dark:text-indigo-200 font-semibold w-full max-w-sm">
          Kullanıcıdan <span className="font-mono font-bold">kullaniciAdi</span> ve <span className="font-mono font-bold">sifre</span> Al
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Node 3: Decision 1 */}
        <div className="px-5 py-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 text-center font-bold text-amber-900 dark:text-amber-200 w-full max-w-md shadow-sm">
          Kullanıcı Adı ve Şifre Doğru mu?
        </div>

        {/* Branch 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Yes Branch */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> EVET
            </span>
            <div className="p-2.5 rounded-lg bg-emerald-600 text-white font-bold text-center w-full shadow-sm">
              "Giriş Başarılı!"
            </div>
            <span className="text-[10px] text-slate-400 mt-2">Program Başarıyla Biter</span>
          </div>

          {/* No Branch */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40">
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> HAYIR (Şifre Yanlış)
            </span>
            <div className="p-2.5 rounded-lg bg-slate-800 text-slate-200 font-medium text-center w-full">
              Kullanıcıya sor:<br />
              <strong className="text-amber-300">"Şifrenizi sıfırlamak ister misiniz? (E/H)"</strong>
            </div>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Decision 2: Sıfırlamak İstiyor mu? */}
        <div className="px-5 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border-2 border-indigo-300 dark:border-indigo-700 text-center font-bold text-indigo-950 dark:text-indigo-200 w-full max-w-md shadow-sm">
          Kullanıcı Sıfırlamak İstiyor mu? (E veya Evet)
        </div>

        {/* Branch 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* No reset */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> HAYIR (H)
            </span>
            <div className="p-2.5 rounded-lg bg-slate-700 text-slate-200 text-center w-full">
              "İşlem İptal Edildi"
            </div>
            <span className="text-[10px] text-slate-400 mt-2">Program Sonlanır</span>
          </div>

          {/* Yes reset */}
          <div className="flex flex-col items-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> EVET (E)
            </span>
            <div className="p-2.5 rounded-lg bg-indigo-600 text-white font-medium text-center w-full">
              Yeni Şifreyi İste: <span className="font-mono font-bold">yeniSifre</span>
            </div>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Decision 3: Soru Kuralı */}
        <div className="px-5 py-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-700 text-center font-bold text-rose-950 dark:text-rose-200 w-full max-w-lg shadow-sm">
          yeniSifre == unuttuguSifre (Eski Şifre) mi?
        </div>

        {/* Final outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full pt-1">
          {/* Equal -> Error */}
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-400 dark:border-rose-800 text-center space-y-1.5 shadow-md">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">ŞİFRELER AYNI (EVET)</span>
            <div className="p-2 bg-rose-600 text-white rounded-lg font-bold text-xs tracking-wide">
              "Şifre oluşturulamadı, lütfen başka şifre giriniz."
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300">Ödevde istenen hata çıktısı</p>
          </div>

          {/* Not Equal -> Success */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-400 dark:border-emerald-800 text-center space-y-1.5 shadow-md">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">ŞİFRELER FARKLI (HAYIR)</span>
            <div className="p-2 bg-emerald-600 text-white rounded-lg font-bold text-xs tracking-wide">
              "Şifre oluşturuldu"
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300">Ödevde istenen başarı çıktısı ve şifre güncelleme</p>
          </div>
        </div>

        <ArrowDown className="w-4 h-4 text-slate-400" />

        {/* Node End */}
        <div className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs">
          BİTİR (End)
        </div>
      </div>
    </div>
  );
};
