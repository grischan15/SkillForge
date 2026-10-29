import { useLang, LANGS } from '../../i18n/LanguageContext'

const LABELS = { de: 'Deutsch', en: 'English' }

export default function LanguageSwitch() {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Sprache'}
      className="inline-flex rounded-lg border border-border bg-white p-0.5 shadow-xs"
    >
      {LANGS.map(code => {
        const active = code === lang
        return (
          <button
            key={code}
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={LABELS[code]}
            lang={code}
            className={`
              min-w-[44px] min-h-[44px] px-2 rounded-md
              text-xs font-semibold uppercase tracking-wide
              transition-colors duration-normal cursor-pointer
              ${active ? 'bg-ink text-white' : 'text-ink-muted hover:text-ink hover:bg-container'}
            `}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
