import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { motion } from 'framer-motion'
import { useLang } from '../../i18n/LanguageContext'

const TEXT = {
  de: { level: (l) => `Level ${l} von 5`, add: (n) => `${n} zur Schmiede hinzufügen`, addTitle: 'Zur Schmiede hinzufügen', inForge: 'In der Schmiede', less: '▲ Weniger', more: '▼ Nachweise anzeigen' },
  en: { level: (l) => `Level ${l} of 5`, add: (n) => `Add ${n} to the forge`, addTitle: 'Add to the forge', inForge: 'In the forge', less: '▲ Less', more: '▼ Show evidence' },
}

const clusterBorderMap = {
  'engineering': 'border-l-cluster-engineering',
  'leadership': 'border-l-cluster-leadership',
  'coaching': 'border-l-cluster-coaching',
  'ai-digital': 'border-l-cluster-ai',
  'business': 'border-l-cluster-business',
  'didaktik': 'border-l-cluster-didaktik',
}

function LevelStars({ level }) {
  const { lang } = useLang()
  return (
    <span className="flex gap-1 items-center" role="img" aria-label={TEXT[lang].level(level)}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`block w-2 h-2 ${i <= level ? 'bg-moosgruen' : 'bg-gray-200'}`} />
      ))}
    </span>
  )
}

export default function SkillCard({ skill, isForged, onTapAdd, reducedMotion, index }) {
  const [showEvidence, setShowEvidence] = useState(false)
  const { lang } = useLang()
  const t = TEXT[lang]

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
        relative
        bg-white rounded-sm border border-border border-l-4 ${borderColor}
        shadow-xs hover:shadow-md
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
                shrink-0 w-10 h-10 flex items-center justify-center
                rounded-sm bg-salbei-tint hover:bg-moosgruen hover:text-sand
                text-moosgruen text-lg font-semibold
                transition-colors duration-normal
                min-h-[40px] min-w-[40px] cursor-pointer
              "
              aria-label={t.add(skill.name)}
              title={t.addTitle}
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
          <span className="inline-block mt-2 text-xs text-success font-semibold">
            {t.inForge}
          </span>
        )}
      </div>

      {/* Evidence popover (desktop hover) – absolute so it doesn't stretch the grid row */}
      {showEvidence && skill.evidence.length > 0 && (
        <div className="hidden lg:block absolute top-full left-0 right-0 z-20 border border-border rounded-b-sm px-4 py-3 bg-white shadow-md">
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
          className="w-full px-4 py-2 text-xs text-ink-muted text-left border-t border-border-light hover:bg-salbei-tint transition-colors cursor-pointer min-h-[44px]"
        >
          {showEvidence ? t.less : t.more}
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
