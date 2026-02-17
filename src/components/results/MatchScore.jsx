export default function MatchScore({ score }) {
  const percent = Math.min(100, Math.round(score))
  const color = percent >= 70 ? 'bg-p3-green' : percent >= 45 ? 'bg-cluster-data' : 'bg-cluster-engineering'

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <div className="w-12 h-1.5 bg-border-light rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-slow ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium text-ink-muted w-8 text-right">
        {percent}%
      </span>
    </div>
  )
}
