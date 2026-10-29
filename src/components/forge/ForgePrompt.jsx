import { useLang } from '../../i18n/LanguageContext'

export default function ForgePrompt() {
  const { lang } = useLang()
  const en = lang === 'en'
  return (
    <div className="text-center py-6">
      {/* Crucible icon */}
      <svg className="w-8 h-8 mx-auto mb-2 text-moosgruen" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h12l-2 8H8L6 3z" />
        <path d="M8 11c0 4 2 7 4 8 2-1 4-4 4-8" />
        <path d="M4 3h16" />
      </svg>
      <p className="font-semibold text-sm text-ink mb-1">{en ? 'Crucible ready' : 'Schmelztiegel bereit'}</p>
      <p className="text-sm text-ink-muted leading-relaxed">
        {en ? 'Drag ores here or tap ' : 'Erze hierher ziehen oder '}<span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-moosgruen text-sand text-[11px] font-semibold align-text-bottom">+</span>{en ? '' : ' tippen'}
      </p>
    </div>
  )
}
