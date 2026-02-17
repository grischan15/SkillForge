import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'

const clusterBorderMap = {
  'engineering': 'border-l-cluster-engineering',
  'leadership': 'border-l-cluster-leadership',
  'coaching': 'border-l-cluster-coaching',
  'ai-digital': 'border-l-cluster-ai',
  'data-process': 'border-l-cluster-data',
  'business': 'border-l-cluster-business',
  'didaktik': 'border-l-cluster-didaktik',
}

function LevelStars({ level }) {
  return (
    <span className="flex gap-0.5" aria-label={`Level ${level} von 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-xs ${i <= level ? 'text-p3-red' : 'text-border'}`}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function SkillCard({ skill, isForged, onTapAdd, reducedMotion, index }) {
  const [showEvidence, setShowEvidence] = useState(false)

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: skill.id,
    disabled: isForged,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined

  const borderColor = clusterBorderMap[skill.clusterId] || 'border-l-border'

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: index * 0.03, duration: 0.25 }}
      className={`
        bg-white rounded-xl border border-border-light border-l-4 ${borderColor}
        shadow-sm hover:shadow-md
        transition-shadow duration-normal ease-out
        ${isDragging ? 'opacity-40' : ''}
        ${isForged ? 'opacity-50 pointer-events-none' : 'cursor-grab active:cursor-grabbing'}
      `}
      onMouseEnter={() => !isForged && setShowEvidence(true)}
      onMouseLeave={() => setShowEvidence(false)}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-sm sm:text-base text-ink leading-tight">
            {skill.name}
          </h3>
          {!isForged && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onTapAdd(skill)
              }}
              className="
                shrink-0 w-8 h-8 flex items-center justify-center
                rounded-lg bg-container hover:bg-p3-red hover:text-white
                text-ink-muted text-lg font-bold
                transition-colors duration-normal
                min-h-[32px] min-w-[32px] cursor-pointer
                lg:opacity-0 lg:group-hover:opacity-100
              "
              aria-label={`${skill.name} zur Schmiede hinzufuegen`}
              title="Zur Schmiede hinzufuegen"
            >
              +
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-1.5">
          <LevelStars level={skill.level} />
          <span className="text-xs text-ink-muted">{skill.levelLabel}</span>
        </div>

        <p className="text-xs text-ink-light leading-relaxed">
          {skill.keyMetric}
        </p>

        {isForged && (
          <span className="inline-block mt-2 text-xs text-p3-green font-medium">
            In der Schmiede
          </span>
        )}
      </div>

      {/* Evidence popover (desktop hover) */}
      {showEvidence && skill.evidence.length > 0 && (
        <div className="hidden lg:block border-t border-border-light px-4 py-3 bg-container/50">
          <ul className="space-y-1">
            {skill.evidence.map((item, i) => (
              <li key={i} className="text-xs text-ink-light flex gap-1.5">
                <span className="shrink-0 text-ink-muted">&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mobile: tap to toggle evidence */}
      <div className="lg:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowEvidence(prev => !prev)
          }}
          className="w-full px-4 py-2 text-xs text-ink-muted text-left border-t border-border-light hover:bg-container/50 transition-colors cursor-pointer min-h-[36px]"
        >
          {showEvidence ? '▲ Weniger' : '▼ Nachweise anzeigen'}
        </button>
        {showEvidence && skill.evidence.length > 0 && (
          <div className="px-4 pb-3">
            <ul className="space-y-1">
              {skill.evidence.map((item, i) => (
                <li key={i} className="text-xs text-ink-light flex gap-1.5">
                  <span className="shrink-0 text-ink-muted">&bull;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  )
}
