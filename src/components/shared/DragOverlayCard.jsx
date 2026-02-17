export default function DragOverlayCard({ skill }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-drag p-3 w-56 opacity-90">
      <h3 className="font-semibold text-sm text-ink">{skill.name}</h3>
      <p className="text-xs text-ink-muted mt-0.5">{skill.keyMetric}</p>
    </div>
  )
}
