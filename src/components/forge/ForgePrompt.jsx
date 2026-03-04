export default function ForgePrompt() {
  return (
    <div className="text-center py-6">
      {/* Crucible icon */}
      <svg className="w-8 h-8 mx-auto mb-2 text-ink-muted/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h12l-2 8H8L6 3z" />
        <path d="M8 11c0 4 2 7 4 8 2-1 4-4 4-8" />
        <path d="M4 3h16" />
      </svg>
      <p className="font-medium text-sm text-ink-muted mb-1">Schmelztiegel bereit</p>
      <p className="text-xs text-ink-muted/70 leading-relaxed">
        Erze hierher ziehen oder <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-p3-red/10 text-p3-red text-[10px] font-bold align-text-bottom">+</span> tippen
      </p>
    </div>
  )
}
