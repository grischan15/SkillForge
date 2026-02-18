import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MatchScore from './MatchScore'
import SkillTag from './SkillTag'

export default function JobAdModal({ role, forgedTags, onClose, reducedMotion }) {
  const closeRef = useRef(null)
  const duration = reducedMotion ? 0 : 0.25

  // Focus trap + escape key
  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const modalContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[5dvh] px-4 pb-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="jobad-title"
          className={`
            relative w-full max-w-2xl max-h-[85dvh] overflow-y-auto
            bg-white rounded-2xl shadow-xl
            ${role.isRevelation ? 'border-t-4 border-revelation-gold' : ''}
          `}
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full
              flex items-center justify-center
              text-ink-muted hover:text-ink hover:bg-container
              transition-colors z-10"
            aria-label="Schließen"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-6 pb-4">
            <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-1">
              Stellenprofil
            </p>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="jobad-title" className="text-xl font-bold text-ink leading-tight">
                  {role.title}
                </h2>
                <p className="text-sm text-ink-muted mt-1">
                  {role.category}
                  {role.companyType && (
                    <span className="block text-xs mt-0.5">{role.companyType}</span>
                  )}
                </p>
              </div>
              <div className="mt-1">
                <MatchScore score={role.score} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pb-6 space-y-5">
            {/* About the role */}
            {role.description && (
              <Section title="Über die Rolle">
                <p className="text-sm text-ink-light leading-relaxed">
                  {role.description}
                </p>
              </Section>
            )}

            {/* Requirements */}
            {(role.requiredTags?.length > 0 || role.bonusTags?.length > 0) && (
              <Section title="Kompetenz-Abgleich">
                {role.requiredTags?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-ink-muted mb-2">Kernkompetenzen</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.requiredTags.map(tag => (
                        <SkillTag key={tag} tag={tag} isMatched={forgedTags.has(tag)} />
                      ))}
                    </div>
                  </div>
                )}
                {role.bonusTags?.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-ink-muted mb-2">Bonus-Kompetenzen</p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.bonusTags.map(tag => (
                        <SkillTag key={tag} tag={tag} isMatched={forgedTags.has(tag)} />
                      ))}
                    </div>
                  </div>
                )}
              </Section>
            )}

            {/* Business Impact (revelations only) */}
            {role.isRevelation && role.businessImpact && (
              <div className="bg-revelation-bg border-l-4 border-revelation-gold rounded-r-lg p-4">
                <p className="text-xs uppercase tracking-wider text-revelation-gold font-semibold mb-1.5">
                  Warum Ihr Unternehmen diese Rolle braucht
                </p>
                <p className="text-sm text-ink leading-relaxed">
                  {role.businessImpact}
                </p>
                <p className="text-xs text-ink-muted mt-2 italic">
                  Diese Rolle können Sie besetzen – oder als Transformationsprojekt starten. 😉
                </p>
              </div>
            )}

            {/* Unique Value — highlighted */}
            {(role.uniqueValue || role.whyFit) && (
              <div className="bg-p3-green/5 border-l-4 border-p3-green rounded-r-lg p-4">
                <p className="text-xs uppercase tracking-wider text-p3-green font-semibold mb-1.5">
                  Ihr Mehrwert für die Firma
                </p>
                <p className="text-sm text-ink leading-relaxed">
                  {role.uniqueValue || role.whyFit}
                </p>
              </div>
            )}

            {/* Why Fit (if uniqueValue exists, show whyFit separately) */}
            {role.uniqueValue && role.whyFit && (
              <Section title="Warum passend">
                <p className="text-sm text-ink-light leading-relaxed">
                  {role.whyFit}
                </p>
              </Section>
            )}

            {/* Job Ad Template (if available) */}
            {role.jobAd && (
              <Section title="Anforderungsprofil">
                {role.jobAd.intro && (
                  <p className="text-sm text-ink-light leading-relaxed mb-3">
                    {role.jobAd.intro}
                  </p>
                )}
                {role.jobAd.requirements?.length > 0 && (
                  <div className="space-y-1.5">
                    {role.jobAd.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className={`
                          flex-shrink-0 mt-0.5 w-5 h-5 rounded-full text-xs
                          flex items-center justify-center font-medium
                          ${req.matched
                            ? 'bg-p3-green/10 text-p3-green'
                            : 'bg-container text-ink-muted'
                          }
                        `}>
                          {req.matched ? '✓' : '○'}
                        </span>
                        <span className="text-sm text-ink-light leading-relaxed">
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {role.jobAd.idealCandidate && (
                  <p className="text-sm text-ink leading-relaxed mt-3 pt-3 border-t border-border-light">
                    {role.jobAd.idealCandidate}
                  </p>
                )}
              </Section>
            )}

            {/* Footer */}
            <p className="text-xs text-ink-muted leading-relaxed pt-2 border-t border-border-light">
              Dieses Stellenprofil basiert auf Ihrem aktuellen Kompetenz-Mix in der Schmiede.
              Passen Sie Ihre Auswahl an, um weitere Rollen zu entdecken.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider text-ink-muted font-semibold mb-2">
        {title}
      </h3>
      {children}
    </div>
  )
}
