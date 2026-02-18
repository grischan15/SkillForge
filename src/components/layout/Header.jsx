export default function Header({ compact = false, onBack }) {
  if (compact) {
    return (
      <header className="py-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="images/P3_Logo_RZ_Bild_rot.png" alt="P3" className="w-7 h-7 object-contain" />
          <h1 className="text-lg font-bold text-ink leading-tight">SkillForge</h1>
        </div>
        <button
          onClick={onBack}
          className="
            shrink-0 flex items-center gap-1.5
            px-4 py-2 rounded-lg
            bg-white border border-border
            text-sm font-medium text-ink-light
            hover:bg-container hover:text-ink hover:border-ink-muted
            transition-all duration-normal cursor-pointer
            min-h-[48px]
            shadow-xs hover:shadow-sm
          "
          aria-label="Zurueck zur Startseite"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 10H5M5 10L10 5M5 10L10 15" />
          </svg>
          <span className="hidden sm:inline">Startseite</span>
        </button>
      </header>
    )
  }

  return (
    <header className="py-6 sm:py-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <img src="images/P3_Logo_RZ_Bild_rot.png" alt="P3" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        <h1 className="text-3xl sm:text-4xl font-bold text-ink">SkillForge</h1>
      </div>
      <p className="text-ink-light text-base sm:text-lg">
        Was kann ich für Ihr Unternehmen tun?
      </p>
    </header>
  )
}
