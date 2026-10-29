import { motion } from 'framer-motion'
import MatchScore from './MatchScore'
import SkillTag from './SkillTag'
import { useLang } from '../../i18n/LanguageContext'

const TEXT = {
  de: { req: 'Rollenanforderungen', why: 'Warum Ihr Unternehmen diese Rolle braucht', wink: 'Diese Rolle können Sie besetzen – oder als Transformationsprojekt starten.', value: 'Ihr Mehrwert', details: 'Stellenprofil ansehen →' },
  en: { req: 'Role requirements', why: 'Why your company needs this role', wink: 'You can hire for this role – or launch it as a transformation project.', value: 'Your added value', details: 'View role profile →' },
}

export default function RoleCard({
  role,
  index,
  isRevelation = false,
  reducedMotion,
  forgedTags = new Set(),
  onShowDetails,
}) {
  const visibleTags = role.requiredTags?.slice(0, 6) || []
  const { lang } = useLang()
  const t = TEXT[lang]

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={reducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.25 }}
      className={`
        rounded-sm border p-3
        transition-shadow duration-normal ease-out
        ${isRevelation
          ? 'border-revelation bg-revelation-bg hover:shadow-md'
          : 'border-border bg-white hover:shadow-md'
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
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold mb-1.5">
            {t.req}
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
        <div className="mt-2 pt-2 border-t border-revelation/30">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink font-semibold mb-1"><span className="w-2 h-2 bg-revelation shrink-0" aria-hidden="true" />
            {t.why}
          </p>
          <p className="text-xs text-ink-light leading-relaxed line-clamp-3">
            {role.businessImpact}
          </p>
          <p className="text-[11px] text-ink-muted mt-1.5 italic">
            {t.wink}
          </p>
        </div>
      ) : (role.uniqueValue || role.whyFit) ? (
        <div className="mt-2 pt-2 border-t border-border">
          <p className="text-[11px] uppercase tracking-wider text-ink-muted font-semibold mb-1">
            {t.value}
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
          className="mt-2 w-full text-center text-sm font-semibold text-moosgruen
            hover:text-tannenblau py-1.5 rounded-sm hover:bg-salbei
            transition-colors min-h-[44px] cursor-pointer"
        >
          {t.details}
        </button>
      )}
    </motion.div>
  )
}
