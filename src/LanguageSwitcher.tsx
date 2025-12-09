// src/LanguageSwitcher.tsx
import { useLanguage } from "./context/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

    const languages: { code: string; label: string }[] = [
    { code: "ro", label: "RO" },
    { code: "en", label: "EN" },
    { code: "gr", label: "GR" },
    { code: "de", label: "DE" },
    { code: "fr", label: "FR" },
    { code: "hu", label: "HU" },
    { code: "it", label: "IT" },
    { code: "es", label: "ES" }
  ];

  return (
    <div className="flex gap-2 text-sm">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code as any)}
          className={`px-2 py-1 rounded ${
            lang === l.code ? "bg-yellow-500 text-black font-bold" : "text-white"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
