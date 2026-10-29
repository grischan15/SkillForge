export default function MatchScore({ score }) {
  const percent = Math.min(100, Math.round(score))
  const color = percent >= 70 ? 'bg-success' : percent >= 45 ? 'bg-salbei-hover' : 'bg-gray-300'

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="w-12 h-1.5 bg-gray-100 rounded-sm overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-slow ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-ink-light w-9 text-right">
        {percent}%
      </span>
    </div>
  )
}
