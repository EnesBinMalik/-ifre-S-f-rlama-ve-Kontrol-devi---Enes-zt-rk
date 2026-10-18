import React, { useState } from 'react';
import {
  KeyRound,
  User,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface VisualSimulatorProps {
  systemUser: string;
  systemPass: string;
  onPasswordUpdated: (newPass: string) => void;
}

export const VisualSimulator: React.FC<VisualSimulatorProps> = ({
  systemUser,
  systemPass,
  onPasswordUpdated,
}) => {
  const [usernameInput, setUsernameInput] = useState(systemUser);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'login_success' | 'username_error' | 'password_error' | 'reset_declined' | 'reset_error' | 'reset_success'
  >('idle');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameInput !== systemUser) {
      setStatus('username_error');
      return;
    }

    if (passwordInput === systemPass) {
      setStatus('login_success');
      return;
    }

    // Password is wrong!
    setStatus('password_error');
  };

  const handleResetConfirm = () => {
    if (newPasswordInput === systemPass) {
      // Must not be the same as forgotten password!
      setStatus('reset_error');
    } else if (newPasswordInput.trim() === '') {
      setStatus('reset_error');
    } else {
      // Successful password change!
      onPasswordUpdated(newPasswordInput);
      setStatus('reset_success');
    }
  };

  const handleResetDecline = () => {
    setStatus('reset_declined');
  };

  const handleRestart = () => {
    setUsernameInput(systemUser);
    setPasswordInput('');
    setNewPasswordInput('');
    setStatus('idle');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <KeyRound className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                Görsel Form Simülatörü
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adım adım görsel kontroller ve ödev çıktısı doğrulaması
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Formu Sıfırla</span>
        </button>
      </div>

      {/* Main Login Form */}
      {(status === 'idle' || status === 'username_error' || status === 'login_success') && (
        <form onSubmit={handleLogin} className="space-y-4 max-w-lg mx-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Kullanıcı Adı:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Örn: enes"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                required
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Sistemdeki kayıtlı kullanıcı: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-indigo-500">{systemUser}</code></p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Şifre:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Şifrenizi yazınız..."
                className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Doğru şifre: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-emerald-500 font-mono">{systemPass}</code> (Yanlış şifre girerek sıfırlama akışını test edin)
            </p>
          </div>

          {status === 'username_error' && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs">
              <XCircle className="w-4 h-4 shrink-0" />
              <span>Kullanıcı adı hatalı! Lütfen bilgilerinizi kontrol ediniz.</span>
            </div>
          )}

          {status === 'login_success' && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-xl text-emerald-800 dark:text-emerald-200 text-sm space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Giriş Başarılı!</span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Kullanıcı adı ve şifre başarıyla doğrulandı.
              </p>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Giriş Yap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Step 2: Password Wrong -> Prompt to Reset */}
      {(status === 'password_error' || status === 'reset_error' || status === 'reset_success' || status === 'reset_declined') && (
        <div className="max-w-lg mx-auto space-y-5 animate-in fade-in duration-200">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-amber-900 dark:text-amber-200 text-sm space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-5 h-5" />
              <span>Şifreniz yanlış!</span>
            </div>
            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
              Şifrenizi sıfırlamak ister misiniz?
            </p>

            {status === 'password_error' && (
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // Stay in password error view with form visible
                  }}
                  className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all"
                >
                  Evet, Sıfırla (E)
                </button>
                <button
                  type="button"
                  onClick={handleResetDecline}
                  className="flex-1 py-2 px-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition-all"
                >
                  Hayır, İptal Et (H)
                </button>
              </div>
            )}
          </div>

          {status === 'reset_declined' && (
            <div className="p-4 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 text-center space-y-2">
              <p className="font-semibold">Şifre sıfırlama işlemi iptal edildi.</p>
              <button
                onClick={handleRestart}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Yeniden dene
              </button>
            </div>
          )}

          {/* New password input form */}
          {(status === 'password_error' || status === 'reset_error' || status === 'reset_success') && (
            <div className="p-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Yeni Şifre Belirleme
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ödev Kuralı: Yeni şifre, sistemde kayıtlı/unuttuğunuz eski şifre (<code className="font-mono text-indigo-500">{systemPass}</code>) ile aynı olamaz!
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Yeni Şifrenizi Giriniz:
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Yeni şifrenizi yazınız..."
                    className="w-full pl-3 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Exact Homework Output Messages */}
              {status === 'reset_error' && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl flex items-center gap-2 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>Şifre oluşturulamadı, lütfen başka şifre giriniz.</span>
                </div>
              )}

              {status === 'reset_success' && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/60 rounded-xl flex items-center gap-2 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>Şifre oluşturuldu</span>
                </div>
              )}

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleResetConfirm}
                  className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Şifreyi Onayla ve Kaydet
                </button>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="py-2.5 px-4 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Başa Dön
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
