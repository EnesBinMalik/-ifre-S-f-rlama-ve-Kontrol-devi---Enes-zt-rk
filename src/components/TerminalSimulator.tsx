import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, RotateCcw, Play, CheckCircle2, AlertCircle, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'success' | 'error' | 'warning' | 'info';
  text: string;
}

interface TerminalSimulatorProps {
  systemUser: string;
  systemPass: string;
  onPasswordUpdated: (newPass: string) => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({
  systemUser,
  systemPass,
  onPasswordUpdated,
}) => {
  const [currentStep, setCurrentStep] = useState<
    'username' | 'password' | 'ask_reset' | 'new_password' | 'finished'
  >('username');

  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isMasked, setIsMasked] = useState(false);

  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Enes Öztürk - Kullanıcı Giriş & Şifre Sıfırlama Konsolu v1.0.0' },
    { id: '2', type: 'info', text: `Sistem Bilgisi: Kayıtlı Kullanıcı = "${systemUser}", Mevcut Şifre = "${systemPass}"` },
    { id: '3', type: 'system', text: '------------------------------------------------------------' },
    { id: '4', type: 'prompt', text: 'Kullanıcı Adınız : ' },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, currentStep]);

  // Focus input on mount or step change
  useEffect(() => {
    if (currentStep !== 'finished') {
      inputRef.current?.focus();
    }
  }, [currentStep]);

  const getPromptLabel = () => {
    switch (currentStep) {
      case 'username':
        return 'Kullanıcı Adınız : ';
      case 'password':
        return 'Şifreniz         : ';
      case 'ask_reset':
        return 'Şifrenizi sıfırlamak ister misiniz? (E/H): ';
      case 'new_password':
        return 'Yeni şifrenizi giriniz: ';
      case 'finished':
        return '';
    }
  };

  const handleRestart = (newSystemPass?: string) => {
    const passToUse = newSystemPass || systemPass;
    setCurrentStep('username');
    setEnteredUsername('');
    setEnteredPassword('');
    setInputValue('');
    setIsMasked(false);

    setLines([
      { id: Date.now().toString(), type: 'system', text: '=== PROGRAM YENİDEN BAŞLATILDI (Enes Öztürk) ===' },
      { id: (Date.now() + 1).toString(), type: 'info', text: `Aktif Sistem: Kullanıcı = "${systemUser}", Şifre = "${passToUse}"` },
      { id: (Date.now() + 2).toString(), type: 'system', text: '------------------------------------------------------------' },
      { id: (Date.now() + 3).toString(), type: 'prompt', text: 'Kullanıcı Adınız : ' },
    ]);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(inputValue);
  };

  const processInput = (val: string) => {
    const trimmed = val.trim();
    const lineId = Date.now().toString();

    if (currentStep === 'username') {
      const displayVal = trimmed || '(boş)';
      setLines((prev) => [
        ...prev,
        { id: lineId, type: 'input', text: displayVal },
      ]);
      setEnteredUsername(trimmed);
      setInputValue('');
      setIsMasked(true); // Mask password input for realism

      setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { id: (Date.now() + 10).toString(), type: 'prompt', text: 'Şifreniz         : ' },
        ]);
        setCurrentStep('password');
      }, 100);
      return;
    }

    if (currentStep === 'password') {
      const displayVal = trimmed ? (isMasked ? '•'.repeat(trimmed.length) : trimmed) : '(boş)';
      setLines((prev) => [
        ...prev,
        { id: lineId, type: 'input', text: displayVal },
      ]);
      setEnteredPassword(trimmed);
      setInputValue('');
      setIsMasked(false);

      setTimeout(() => {
        // Validation logic
        if (enteredUsername === systemUser && trimmed === systemPass) {
          // Success
          setLines((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'success', text: '>> Giriş Başarılı! Hoş geldiniz.' },
            { id: (Date.now() + 1).toString(), type: 'info', text: '>> İşlem başarıyla tamamlandı.' },
          ]);
          setCurrentStep('finished');
        } else if (enteredUsername !== systemUser) {
          // Username error
          setLines((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'error', text: '>> Kullanıcı adı hatalı! Lütfen bilgilerinizi kontrol ediniz.' },
            { id: (Date.now() + 1).toString(), type: 'system', text: '>> Program sonlandırıldı.' },
          ]);
          setCurrentStep('finished');
        } else {
          // Password error -> Trigger reset prompt as requested!
          setLines((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'warning', text: '>> Şifreniz yanlış!' },
            { id: (Date.now() + 1).toString(), type: 'prompt', text: 'Şifrenizi sıfırlamak ister misiniz? (E/H): ' },
          ]);
          setCurrentStep('ask_reset');
        }
      }, 150);
      return;
    }

    if (currentStep === 'ask_reset') {
      setLines((prev) => [
        ...prev,
        { id: lineId, type: 'input', text: trimmed || 'H' },
      ]);
      setInputValue('');

      const wantsReset = ['e', 'evet', 'y', 'yes', '1'].includes(trimmed.toLowerCase());

      setTimeout(() => {
        if (wantsReset) {
          setLines((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'prompt', text: 'Yeni şifrenizi giriniz: ' },
          ]);
          setCurrentStep('new_password');
        } else {
          setLines((prev) => [
            ...prev,
            { id: Date.now().toString(), type: 'info', text: '>> Şifre sıfırlama işlemi iptal edildi. Giriş sonlandırıldı.' },
          ]);
          setCurrentStep('finished');
        }
      }, 150);
      return;
    }

    if (currentStep === 'new_password') {
      setLines((prev) => [
        ...prev,
        { id: lineId, type: 'input', text: trimmed },
      ]);
      setInputValue('');

      setTimeout(() => {
        // Check rule:
        // "yeni girdiği şifrenin unuttuğu şifre ile aynı olmaması gerektiğini kontrol edip,
        // şifreler aynı ise ekrana 'Şifre oluşturulamadı, lütfen başka şifre giriniz.'
        // sorun yoksa 'Şifre oluşturuldu' yazan program"
        if (trimmed === systemPass) {
          setLines((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'error',
              text: 'Şifre oluşturulamadı, lütfen başka şifre giriniz.',
            },
            {
              id: (Date.now() + 1).toString(),
              type: 'info',
              text: '>> (Yeni şifre, unuttuğunuz/sistemdeki eski şifre ile aynı olamaz!)',
            },
          ]);
        } else if (trimmed === '') {
          setLines((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'error',
              text: 'Şifre oluşturulamadı, lütfen başka şifre giriniz.',
            },
          ]);
        } else {
          // Success!
          onPasswordUpdated(trimmed);
          setLines((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: 'success',
              text: 'Şifre oluşturuldu',
            },
            {
              id: (Date.now() + 1).toString(),
              type: 'info',
              text: `>> Yeni şifreniz başarıyla kaydedildi: "${trimmed}". Bir sonraki girişte bu şifreyi kullanabilirsiniz.`,
            },
          ]);
        }
        setCurrentStep('finished');
      }, 200);
      return;
    }
  };

  // Preset execution helper
  const runPreset = (scenario: 'success' | 'cancel' | 'same_pass' | 'new_pass') => {
    setCurrentStep('username');
    setInputValue('');
    setIsMasked(false);

    let scriptLines: { delay: number; action: () => void }[] = [];

    if (scenario === 'success') {
      setLines([
        { id: 'p1', type: 'system', text: '=== SENARYO 1: DOĞRU GİRİŞ TESTİ ===' },
        { id: 'p2', type: 'prompt', text: 'Kullanıcı Adınız : ' },
        { id: 'p3', type: 'input', text: systemUser },
        { id: 'p4', type: 'prompt', text: 'Şifreniz         : ' },
        { id: 'p5', type: 'input', text: '•••••••' },
        { id: 'p6', type: 'success', text: '>> Giriş Başarılı! Hoş geldiniz.' },
      ]);
      setCurrentStep('finished');
      return;
    }

    if (scenario === 'cancel') {
      setLines([
        { id: 'c1', type: 'system', text: '=== SENARYO 2: YANLIŞ ŞİFRE -> SIFIRLAMA İPTALİ ===' },
        { id: 'c2', type: 'prompt', text: 'Kullanıcı Adınız : ' },
        { id: 'c3', type: 'input', text: systemUser },
        { id: 'c4', type: 'prompt', text: 'Şifreniz         : ' },
        { id: 'c5', type: 'input', text: 'yanlisSifre123' },
        { id: 'c6', type: 'warning', text: '>> Şifreniz yanlış!' },
        { id: 'c7', type: 'prompt', text: 'Şifrenizi sıfırlamak ister misiniz? (E/H): ' },
        { id: 'c8', type: 'input', text: 'H' },
        { id: 'c9', type: 'info', text: '>> Şifre sıfırlama işlemi iptal edildi. Giriş sonlandırıldı.' },
      ]);
      setCurrentStep('finished');
      return;
    }

    if (scenario === 'same_pass') {
      setLines([
        { id: 's1', type: 'system', text: '=== SENARYO 3: ESKİ ŞİFRENİN AYNISINI GİRME (HATA) ===' },
        { id: 's2', type: 'prompt', text: 'Kullanıcı Adınız : ' },
        { id: 's3', type: 'input', text: systemUser },
        { id: 's4', type: 'prompt', text: 'Şifreniz         : ' },
        { id: 's5', type: 'input', text: 'hataliDeneme' },
        { id: 's6', type: 'warning', text: '>> Şifreniz yanlış!' },
        { id: 's7', type: 'prompt', text: 'Şifrenizi sıfırlamak ister misiniz? (E/H): ' },
        { id: 's8', type: 'input', text: 'E' },
        { id: 's9', type: 'prompt', text: 'Yeni şifrenizi giriniz: ' },
        { id: 's10', type: 'input', text: systemPass },
        { id: 's11', type: 'error', text: 'Şifre oluşturulamadı, lütfen başka şifre giriniz.' },
        { id: 's12', type: 'info', text: `>> (Girilen yeni şifre "${systemPass}", unuttuğu eski şifre ile birebir aynı olduğu için kural gereği reddedildi)` },
      ]);
      setCurrentStep('finished');
      return;
    }

    if (scenario === 'new_pass') {
      const generatedNewPass = 'yeniGucluSifre2026';
      onPasswordUpdated(generatedNewPass);
      setLines([
        { id: 'n1', type: 'system', text: '=== SENARYO 4: FARKLI YENİ ŞİFRE (BAŞARILI) ===' },
        { id: 'n2', type: 'prompt', text: 'Kullanıcı Adınız : ' },
        { id: 'n3', type: 'input', text: systemUser },
        { id: 'n4', type: 'prompt', text: 'Şifreniz         : ' },
        { id: 'n5', type: 'input', text: 'yanlisGirdim' },
        { id: 'n6', type: 'warning', text: '>> Şifreniz yanlış!' },
        { id: 'n7', type: 'prompt', text: 'Şifrenizi sıfırlamak ister misiniz? (E/H): ' },
        { id: 'n8', type: 'input', text: 'E' },
        { id: 'n9', type: 'prompt', text: 'Yeni şifrenizi giriniz: ' },
        { id: 'n10', type: 'input', text: generatedNewPass },
        { id: 'n11', type: 'success', text: 'Şifre oluşturuldu' },
        { id: 'n12', type: 'info', text: `>> Tebrikler! Şifre güncellendi. Yeni şifre: "${generatedNewPass}"` },
      ]);
      setCurrentStep('finished');
      return;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col font-mono text-sm">
      {/* Terminal Title Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between select-none backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
          <div className="flex items-center gap-1.5 ml-3 text-xs text-slate-400 font-medium">
            <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>enes@terminal: ~/odev/sifre-sifirlama</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleRestart()}
            title="Konsolu Baştan Başlat"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-all active:scale-95 border border-slate-700"
          >
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>Yeniden Başlat</span>
          </button>
        </div>
      </div>

      {/* Quick Test Scenarios Bar */}
      <div className="bg-slate-950/40 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 font-sans font-medium flex items-center gap-1 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Hazır Senaryolar:
        </span>
        <button
          onClick={() => runPreset('success')}
          className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all cursor-pointer font-sans"
        >
          1. Doğru Giriş
        </button>
        <button
          onClick={() => runPreset('cancel')}
          className="px-2.5 py-1 rounded bg-slate-700/50 text-slate-300 border border-slate-600/50 hover:bg-slate-700 transition-all cursor-pointer font-sans"
        >
          2. Yanlış Şifre &gt; İptal
        </button>
        <button
          onClick={() => runPreset('same_pass')}
          className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all cursor-pointer font-sans"
        >
          3. Yanlış Şifre &gt; Aynı Şifre (Hata Çıktısı)
        </button>
        <button
          onClick={() => runPreset('new_pass')}
          className="px-2.5 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20 transition-all cursor-pointer font-sans"
        >
          4. Yanlış Şifre &gt; Yeni Şifre (Başarılı)
        </button>
      </div>

      {/* Terminal Screen / Lines */}
      <div className="p-4 sm:p-6 min-h-[340px] max-h-[460px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {lines.map((line) => {
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-slate-500 text-xs py-0.5">
                {line.text}
              </div>
            );
          }
          if (line.type === 'info') {
            return (
              <div key={line.id} className="text-cyan-400/90 text-xs py-0.5 flex items-center gap-1.5">
                <span className="text-cyan-500 font-bold">&gt;</span>
                {line.text}
              </div>
            );
          }
          if (line.type === 'prompt') {
            return (
              <span key={line.id} className="text-slate-300 font-semibold inline">
                {line.text}
              </span>
            );
          }
          if (line.type === 'input') {
            return (
              <span key={line.id} className="text-amber-300 font-bold ml-1 inline">
                {line.text}
                {'\n'}
              </span>
            );
          }
          if (line.type === 'error') {
            return (
              <div
                key={line.id}
                className="text-rose-400 font-bold bg-rose-950/40 border border-rose-800/50 px-3 py-1.5 rounded-lg my-1 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{line.text}</span>
              </div>
            );
          }
          if (line.type === 'warning') {
            return (
              <div key={line.id} className="text-amber-400 font-medium py-0.5">
                {line.text}
              </div>
            );
          }
          if (line.type === 'success') {
            return (
              <div
                key={line.id}
                className="text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg my-1 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{line.text}</span>
              </div>
            );
          }
          return null;
        })}

        {/* Active Input Line */}
        {currentStep !== 'finished' ? (
          <form onSubmit={handleFormSubmit} className="flex items-center gap-1 pt-1">
            <span className="text-indigo-400 font-bold select-none">{getPromptLabel()}</span>
            <input
              ref={inputRef}
              type={isMasked ? 'password' : 'text'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="yazıp Enter'a basın..."
              className="flex-1 bg-transparent border-none outline-none text-amber-300 font-bold placeholder-slate-600 focus:ring-0 p-0 text-sm"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-0.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white rounded font-sans flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Gönder</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        ) : (
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1 text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
              Program tamamlandı. Farklı bir test yapmak için yukarıdaki senaryoları seçin veya yeniden başlatın.
            </span>
            <button
              onClick={() => handleRestart()}
              className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
            >
              Yeni Giriş Dene
            </button>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Helper Footer Tips */}
      <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">İpucu</span>
          <span>
            {currentStep === 'username' && `Varsayılan kullanıcı adınız: "${systemUser}"`}
            {currentStep === 'password' && `Şifre testi: Doğru = "${systemPass}", Yanlış = herhangi bir şey`}
            {currentStep === 'ask_reset' && `Sıfırlamak için "E", iptal için "H" yazıp Enter'layın.`}
            {currentStep === 'new_password' && `Ödev kuralı: "${systemPass}" yazarsanız hata, farklı yazarsanız başarı mesajı verecektir.`}
            {currentStep === 'finished' && 'Ödev çıktısı ekranda gösterildi.'}
          </span>
        </div>

        <div className="text-slate-500 font-sans">
          Hazırlayan: <span className="text-indigo-400 font-medium">Enes Öztürk</span>
        </div>
      </div>
    </div>
  );
};
