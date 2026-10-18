import React, { useState } from 'react';
import {
  Terminal as TerminalIcon,
  Code2,
  GitBranch,
  FileCheck,
  ShieldAlert,
  Settings,
  Sparkles,
  Award,
  CheckCircle2,
  Copy,
  ExternalLink,
  Laptop,
  Check
} from 'lucide-react';
import { TerminalSimulator } from './components/TerminalSimulator';
import { VisualSimulator } from './components/VisualSimulator';
import { CodeViewer } from './components/CodeViewer';
import { Flowchart } from './components/Flowchart';
import { ReportModal } from './components/ReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'visual' | 'code' | 'flowchart'>('terminal');

  // Configurable registered user & password
  const [systemUser, setSystemUser] = useState('enes');
  const [systemPass, setSystemPass] = useState('java123');
  const [isEditingConfig, setIsEditingConfig] = useState(false);
  const [tempUser, setTempUser] = useState(systemUser);
  const [tempPass, setTempPass] = useState(systemPass);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copiedSignature, setCopiedSignature] = useState(false);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSystemUser(tempUser.trim() || 'enes');
    setSystemPass(tempPass.trim() || 'java123');
    setIsEditingConfig(false);
  };

  const handlePasswordUpdated = (newPass: string) => {
    setSystemPass(newPass);
    setTempPass(newPass);
  };

  const copySignature = () => {
    navigator.clipboard.writeText('Ödev: Kullanıcı Girişi ve Şifre Sıfırlama Algoritması\nHazırlayan: Enes Öztürk');
    setCopiedSignature(true);
    setTimeout(() => setCopiedSignature(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Banner & Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Laptop className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-white text-base sm:text-lg tracking-tight">
                  Şifre Kontrol & Sıfırlama Ödevi
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Programlama 101
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <span>Hazırlayan:</span>
                <span className="text-indigo-400 font-semibold">Enes Öztürk</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-slate-400">Algoritma Ödev Çözümü</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingConfig(!isEditingConfig)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Varsayılan kayıtlı kullanıcı ve şifreyi değiştir"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Sistem Ayarları</span>
            </button>

            <button
              onClick={() => setIsReportOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Ödev Raporu / Çıktı</span>
            </button>
          </div>
        </div>

        {/* Config drawer */}
        {isEditingConfig && (
          <div className="border-t border-slate-800 bg-slate-900/95 px-4 py-3">
            <form onSubmit={handleSaveConfig} className="max-w-6xl mx-auto flex flex-wrap items-center gap-3 text-xs">
              <span className="text-slate-400 font-medium">Sistemdeki Kayıtlı Bilgiler:</span>
              <div className="flex items-center gap-1.5">
                <label className="text-slate-400">Kullanıcı:</label>
                <input
                  type="text"
                  value={tempUser}
                  onChange={(e) => setTempUser(e.target.value)}
                  className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <label className="text-slate-400">Şifre:</label>
                <input
                  type="text"
                  value={tempPass}
                  onChange={(e) => setTempPass(e.target.value)}
                  className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium cursor-pointer"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => setIsEditingConfig(false)}
                className="px-2 py-1 text-slate-400 hover:text-slate-200"
              >
                Kapat
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-6">
        {/* Homework Question Card (Ödev Soru Metni) */}
        <section className="bg-slate-900/60 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold px-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Ödev Soru Metni
                </span>
                <span className="text-xs text-slate-400">
                  İmza: <strong className="text-slate-200">Enes Öztürk</strong>
                </span>
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 font-medium italic border-l-2 border-indigo-500 pl-3 leading-relaxed">
                "Eğer şifre yanlış ise kullanıcıya şifresini sıfırlayıp sıfırlamayacağını sorun, eğer kullanıcı sıfırlamak isterse yeni girdiği şifrenin unuttuğu şifre ile aynı olmaması gerektiğini kontrol edip, şifreler aynı ise ekrana <strong className="text-rose-400">"Şifre oluşturulamadı, lütfen başka şifre giriniz."</strong> sorun yoksa <strong className="text-emerald-400">"Şifre oluşturuldu"</strong> yazan programı yazınız."
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
              <button
                onClick={copySignature}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copiedSignature ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSignature ? 'İmza Kopyalandı' : 'Ödev & İmza Bilgisini Kopyala'}</span>
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
                <span>Aktif Şifre:</span>
                <code className="text-indigo-400 font-mono font-bold">{systemPass}</code>
              </div>
            </div>
          </div>

          {/* Quick criteria check */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Yanlış şifrede sıfırlama sorulur (E/H)</span>
            </div>
            <div className="flex items-center gap-2 text-rose-300">
              <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Aynı şifreye: "Şifre oluşturulamadı..."</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Farklı şifreye: "Şifre oluşturuldu"</span>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-4 overflow-x-auto pb-1 text-sm">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`pb-3 px-3 font-semibold flex items-center gap-2 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TerminalIcon className="w-4 h-4" />
            <span>Canlı Konsol Simülatörü</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`pb-3 px-3 font-semibold flex items-center gap-2 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Ödev Kodları (Java, Python, C#, C++, C)</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`pb-3 px-3 font-semibold flex items-center gap-2 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'visual'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Görsel Form Simülatörü</span>
          </button>

          <button
            onClick={() => setActiveTab('flowchart')}
            className={`pb-3 px-3 font-semibold flex items-center gap-2 transition-all cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'flowchart'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Algoritma Akış Şeması</span>
          </button>
        </div>

        {/* Active Tab Component */}
        <div className="pt-2">
          {activeTab === 'terminal' && (
            <TerminalSimulator
              systemUser={systemUser}
              systemPass={systemPass}
              onPasswordUpdated={handlePasswordUpdated}
            />
          )}

          {activeTab === 'code' && <CodeViewer />}

          {activeTab === 'visual' && (
            <VisualSimulator
              systemUser={systemUser}
              systemPass={systemPass}
              onPasswordUpdated={handlePasswordUpdated}
            />
          )}

          {activeTab === 'flowchart' && <Flowchart />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Ödev başarıyla tamamlandı &amp; doğrulandı</span>
          </div>

          <div className="font-medium text-slate-300">
            Geliştirici &amp; Hazırlayan: <span className="text-indigo-400 font-bold">Enes Öztürk</span>
          </div>

          <div className="text-slate-500">
            Algoritma &amp; Programlama 101 © {new Date().getFullYear()}
          </div>
        </div>
      </footer>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        systemUser={systemUser}
        systemPass={systemPass}
      />
    </div>
  );
}
