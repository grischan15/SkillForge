import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import MatchScore from './MatchScore'
import SkillTag from './SkillTag'

function buildWhatsAppUrl(role) {
  const text = [
    `Hey Christian! 👋 Ich bin über SkillForge auf dein Profil gestoßen.`,
    `Ich suche gerade jemanden für die Rolle *${role.title}* (${role.category})`,
    `— und dein Kompetenz-Match sieht richtig gut aus.`,
    `Wollen wir uns mal dazu austauschen?`,
  ].join(' ')
  return `https://wa.me/491795395783?text=${encodeURIComponent(text)}`
}

function buildMailUrl(role) {
  const subject = `${role.title} – dein Profil passt!`
  const body = [
    `Hi Christian,`,
    ``,
    `über SkillForge bin ich auf dein Kompetenzprofil aufmerksam geworden.`,
    `Für eine aktuelle Position als ${role.title} suche ich jemanden`,
    `mit genau deiner Kombination aus Kompetenzen.`,
    ``,
    role.uniqueValue
      ? `Was mich besonders anspricht: ${role.uniqueValue}`
      : role.whyFit
        ? `Was mich besonders anspricht: ${role.whyFit}`
        : '',
    ``,
    role.companyType
      ? `Der Einsatz wäre typischerweise bei ${role.companyType}.`
      : '',
    ``,
    `Lass uns gerne telefonieren oder schreib mir einfach zurück!`,
    ``,
    `Beste Grüße`,
  ].filter(Boolean).join('\n')
  return `mailto:cs@p3coaching.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

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

            {/* Contact CTA */}
            <div className="bg-container rounded-xl p-4 space-y-3">
              <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold">
                Interesse? Direkt Kontakt aufnehmen
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={buildWhatsAppUrl(role)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                    bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm
                    rounded-lg transition-colors min-h-[48px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={buildMailUrl(role)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                    bg-p3-red hover:bg-p3-red/90 text-white font-medium text-sm
                    rounded-lg transition-colors min-h-[48px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  E-Mail
                </a>
                <a
                  href="https://www.linkedin.com/in/christian-schmidt-p3coaching"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3
                    bg-[#0A66C2] hover:bg-[#094ea0] text-white font-medium text-sm
                    rounded-lg transition-colors min-h-[48px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

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
