import { useState } from 'react'
import { motion } from 'framer-motion'
import MatchScore from './MatchScore'

export default function RoleCard({ role, index, isRevelation = false, reducedMotion }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.25 }}
      className={`
        rounded-lg border p-3 cursor-pointer
        transition-shadow duration-normal ease-out
        ${isRevelation
          ? 'border-revelation-gold/40 bg-revelation-bg hover:shadow-md'
          : 'border-border-light bg-white hover:shadow-md'
        }
      `}
      onClick={() => setExpanded(prev => !prev)}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-ink leading-tight">
            {role.title}
          </h4>
          <p className="text-xs text-ink-muted mt-0.5">{role.category}</p>
        </div>
        <MatchScore score={role.score} />
      </div>

      {expanded && (
        <div className="mt-2 pt-2 border-t border-border-light">
          <p className="text-xs text-ink-light leading-relaxed mb-1.5">
            {role.description}
          </p>
          <p className="text-xs text-ink-muted leading-relaxed">
            <strong>Warum passend:</strong> {role.whyFit}
          </p>
          <p className="text-xs text-ink-muted mt-1">
            <strong>Unternehmen:</strong> {role.companyType}
          </p>
        </div>
      )}
    </motion.div>
  )
}
