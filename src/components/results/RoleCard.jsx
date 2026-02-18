import { motion } from 'framer-motion'
import MatchScore from './MatchScore'
import SkillTag from './SkillTag'

export default function RoleCard({
  role,
  index,
  isRevelation = false,
  reducedMotion,
  forgedTags = new Set(),
  onShowDetails,
}) {
  const visibleTags = role.requiredTags?.slice(0, 6) || []

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.25 }}
      className={`
        rounded-lg border p-3
        transition-shadow duration-normal ease-out
        ${isRevelation
          ? 'border-revelation-gold/40 bg-revelation-bg hover:shadow-md'
          : 'border-border-light bg-white hover:shadow-md'
        }
      `}
    >
      {/* Header: Title + Score */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-semibold text-sm text-ink leading-tight">
            {role.title}
          </h4>
          <p className="text-xs text-ink-muted mt-0.5">
            {role.category}
            {role.companyType && (
              <span> · {role.companyType.split(',')[0]}</span>
            )}
          </p>
        </div>
        <MatchScore score={role.score} />
      </div>

      {/* Tags: Required skills as pills */}
      {visibleTags.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border-light/60">
          <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-1.5">
            Rollenanforderungen
          </p>
          <div className="flex flex-wrap gap-1">
            {visibleTags.map(tag => (
              <SkillTag
                key={tag}
                tag={tag}
                isMatched={forgedTags.has(tag)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Business Impact (revelations) or Unique Value (standard) */}
      {isRevelation && role.businessImpact ? (
        <div className="mt-2 pt-2 border-t border-revelation-gold/20">
          <p className="text-[10px] uppercase tracking-wider text-revelation-gold font-medium mb-1">
            Warum Ihr Unternehmen diese Rolle braucht
          </p>
          <p className="text-xs text-ink-light leading-relaxed line-clamp-3">
            {role.businessImpact}
          </p>
          <p className="text-[10px] text-ink-muted mt-1.5 italic">
            Diese Rolle können Sie besetzen – oder als Transformationsprojekt starten. 😉
          </p>
        </div>
      ) : (role.uniqueValue || role.whyFit) ? (
        <div className="mt-2 pt-2 border-t border-border-light/60">
          <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium mb-1">
            Ihr Mehrwert
          </p>
          <p className="text-xs text-ink-light leading-relaxed line-clamp-2">
            {role.uniqueValue || role.whyFit}
          </p>
        </div>
      ) : null}

      {/* Details button */}
      {onShowDetails && (
        <button
          onClick={() => onShowDetails(role)}
          className="mt-2 w-full text-center text-xs font-medium text-p3-red
            hover:text-p3-red-hover py-1.5 rounded-md hover:bg-p3-red/5
            transition-colors min-h-[36px] cursor-pointer"
        >
          Stellenprofil ansehen →
        </button>
      )}
    </motion.div>
  )
}
