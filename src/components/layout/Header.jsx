export default function Header({ compact = false }) {
  if (compact) {
    return (
      <header className="py-3 mb-4 flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="Hammer">🔨</span>
        <div>
          <h1 className="text-lg font-bold text-ink leading-tight">SkillForge</h1>
          <p className="text-xs text-ink-muted">Kompetenz-Schmiede von Christian Schmidt</p>
        </div>
      </header>
    )
  }

  return (
    <header className="py-6 sm:py-8 text-center">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-4xl" role="img" aria-label="Hammer">🔨</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-ink">SkillForge</h1>
      </div>
      <p className="text-ink-light text-base sm:text-lg">
        Interaktive Kompetenz-Schmiede
      </p>
    </header>
  )
}
