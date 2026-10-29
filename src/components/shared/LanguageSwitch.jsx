import { useLang, LANGS } from '../../i18n/LanguageContext'

const LABELS = { de: 'Deutsch', en: 'English' }

export default function LanguageSwitch() {
  const { lang, setLang } = useLang()

  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Sprache'}
      className="inline-flex rounded-sm border border-border bg-white p-0.5"
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
              min-w-[48px] min-h-[48px] px-2 rounded-sm
              font-display font-black text-xs tracking-[0.12em]
              transition-colors duration-normal cursor-pointer
              ${active ? 'bg-moosgruen text-sand' : 'text-ink-muted hover:text-ink hover:bg-salbei-tint'}
            `}
          >
            {code}
          </button>
        )
      })}
    </div>
  )
}
