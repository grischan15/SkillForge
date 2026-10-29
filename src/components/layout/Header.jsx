import { useLang } from '../../i18n/LanguageContext'
import LanguageSwitch from '../shared/LanguageSwitch'

const TEXT = {
  de: { back: 'Zurück zur Startseite', home: 'Startseite', tagline: 'Was kann ich für Ihr Unternehmen tun?' },
  en: { back: 'Back to start page', home: 'Start', tagline: 'What can I do for your company?' },
}

export default function Header({ compact = false, onBack }) {
  const { lang } = useLang()
  const t = TEXT[lang]

  if (compact) {
    return (
      <header className="py-3 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="images/bildmark-terrakotta.svg" alt="P3 Coaching" className="w-8 h-8 object-contain" />
          <h1 className="font-display font-black text-xl text-ink leading-none">SkillForge</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitch />
          <button
            onClick={onBack}
            className="
              shrink-0 flex items-center gap-1.5
              px-4 py-2 rounded-sm
              bg-transparent
              text-sm font-semibold text-moosgruen
              shadow-[inset_0_0_0_2px_var(--p3-moosgruen)]
              hover:bg-salbei hover:text-tannenblau hover:shadow-none
              transition-colors duration-normal cursor-pointer
              min-h-[48px]
            "
            aria-label={t.back}
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10H5M5 10L10 5M5 10L10 15" />
            </svg>
            <span className="hidden sm:inline">{t.home}</span>
          </button>
        </div>
      </header>
    )
  }

  return (
    <header className="py-6 sm:py-8 text-center relative">
      <div className="flex justify-end mb-2 sm:mb-0 sm:absolute sm:top-3 sm:right-0">
        <LanguageSwitch />
      </div>
      <div className="flex items-center justify-center gap-3 mb-2">
        <img src="images/bildmark-terrakotta.svg" alt="P3 Coaching" className="w-11 h-11 sm:w-14 sm:h-14 object-contain" />
        <h1 className="font-display font-black text-4xl sm:text-6xl text-ink leading-none">SkillForge</h1>
      </div>
      <p className="text-ink-light text-lg sm:text-xl mt-1">
        {t.tagline}
      </p>
    </header>
  )
}
