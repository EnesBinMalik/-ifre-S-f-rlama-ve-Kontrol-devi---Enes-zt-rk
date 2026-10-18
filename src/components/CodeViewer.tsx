import React, { useState } from 'react';
import { CODE_SNIPPETS, CodeSnippet } from '../data/codeSnippets';
import { Copy, Check, FileCode, BookOpen, AlertTriangle, Lightbulb } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('java');
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet =
    CODE_SNIPPETS.find((s) => s.id === selectedSnippetId) || CODE_SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
      {/* Language Selector Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">
            Ödev Kaynak Kodları (Hazırlayan: Enes Öztürk)
          </h3>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>{currentSnippet.language} Kodunu Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Language Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 py-2 gap-2 bg-slate-100/60 dark:bg-slate-950/60">
        {CODE_SNIPPETS.map((snippet) => {
          const isActive = snippet.id === currentSnippet.id;
          return (
            <button
              key={snippet.id}
              onClick={() => setSelectedSnippetId(snippet.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200 dark:border-slate-700 font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
              }`}
            >
              <span>{snippet.language}</span>
              <span className="text-[10px] text-slate-400">({snippet.filename})</span>
            </button>
          );
        })}
      </div>

      {/* Code Display Area */}
      <div className="relative bg-slate-950 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto p-4 sm:p-6 max-h-[500px] overflow-y-auto">
        <pre className="leading-relaxed">
          <code>
            {currentSnippet.code.split('\n').map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-slate-600 select-none text-right font-mono text-xs w-8">
                  {idx + 1}
                </span>
                <span className="table-cell">
                  {/* Highlight specific key lines */}
                  {line.includes('Şifre oluşturulamadı, lütfen başka şifre giriniz.') ? (
                    <span className="text-rose-400 font-bold bg-rose-950/30 px-1 rounded">
                      {line}
                    </span>
                  ) : line.includes('Şifre oluşturuldu') ? (
                    <span className="text-emerald-400 font-bold bg-emerald-950/30 px-1 rounded">
                      {line}
                    </span>
                  ) : line.includes('Hazırlayan: Enes Öztürk') ? (
                    <span className="text-indigo-400 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Educational Explanation Box */}
      <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Bu Kodda Dikkat Edilmesi Gereken Kritik Noktalar:</span>
        </div>

        <ul className="space-y-2 text-slate-600 dark:text-slate-400 pl-4 list-disc">
          <li>
            <strong className="text-slate-800 dark:text-slate-200">String Karşılaştırması:</strong>{' '}
            {currentSnippet.id === 'java' && (
              <span>
                Java'da metinleri karşılaştırırken asla <code className="text-rose-500">==</code> operatörü kullanılmaz! <code className="text-indigo-500">.equals()</code> veya <code className="text-indigo-500">.equalsIgnoreCase()</code> metodu kullanılır çünkü <code className="text-rose-500">==</code> referans adreslerini karşılaştırır.
              </span>
            )}
            {currentSnippet.id === 'python' && (
              <span>
                Python'da metin karşılaştırması için <code className="text-indigo-500">==</code> kullanılır. Boşlukları temizlemek için <code className="text-indigo-500">.strip()</code> ve harf duyarsızlığı için <code className="text-indigo-500">.upper()</code> tercih edilmiştir.
              </span>
            )}
            {currentSnippet.id === 'c' && (
              <span>
                C dilinde stringler char dizisidir, bu nedenle karşılaştırma için <code className="text-indigo-500">strcmp(s1, s2) == 0</code> kullanılır.
              </span>
            )}
            {currentSnippet.id !== 'java' && currentSnippet.id !== 'python' && currentSnippet.id !== 'c' && (
              <span>
                Kullanıcıdan alınan yeni şifrenin, eski/unuttuğu şifreyle eşitlik kontrolü doğrudan koşul ifadesiyle sağlanır.
              </span>
            )}
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-200">Ödev Şartı Kontrolü:</strong>{' '}
            Eğer <code className="text-slate-800 dark:text-slate-200 font-mono">yeniSifre == kayitliSifre</code> ise tam olarak{' '}
            <span className="text-rose-600 dark:text-rose-400 font-semibold">"Şifre oluşturulamadı, lütfen başka şifre giriniz."</span>,
            farklı ise{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">"Şifre oluşturuldu"</span>{' '}
            çıktısı yazdırılır.
          </li>
          <li>
            <strong className="text-slate-800 dark:text-slate-200">İmza Bilgisi:</strong>{' '}
            Kod başlığına ve konsol açılışına <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Enes Öztürk</span> imzası ve açıklamalar eklenmiştir.
          </li>
        </ul>
      </div>
    </div>
  );
};
