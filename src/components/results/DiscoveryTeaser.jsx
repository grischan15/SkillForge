import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InfoModal from '../shared/InfoModal'
import { useLang } from '../../i18n/LanguageContext'

const TEXT = {
  de: {
    title: 'Entdeckungsrollen',
    hint0: 'Ihre regulären Rollenvorschläge erscheinen sofort. Aber die spannendsten Entdeckungen? Die brauchen Skills aus mindestens drei verschiedenen Bereichen. 😉',
    hint1: 'Noch zwei Bereiche – dann enthüllt die Schmiede überraschende Rollen, die Sie vielleicht nicht auf dem Radar hatten.',
    hint2: 'Noch ein Bereich – und die Entdeckungsrollen werden sichtbar. Fast geschafft!',
    progress: (n) => `${n} von 3 Bereichen aktiviert`,
    unlocked: 'Entdeckungsrollen freigeschaltet 🎉',
    whatAre: 'Was sind Entdeckungsrollen?',
    discoveries: (n) => `${n} Entdeckung${n !== 1 ? 'en' : ''}`,
    matching: (n) => `${n} passende Rollen`,
  },
  en: {
    title: 'Discovery roles',
    hint0: 'Your regular role suggestions appear right away. But the most exciting discoveries? They need skills from at least three different areas. 😉',
    hint1: 'Two more areas – then the forge reveals surprising roles you may not have had on your radar.',
    hint2: 'One more area – and the discovery roles appear. Almost there!',
    progress: (n) => `${n} of 3 areas activated`,
    unlocked: 'Discovery roles unlocked 🎉',
    whatAre: 'What are discovery roles?',
    discoveries: (n) => `${n} discover${n !== 1 ? 'ies' : 'y'}`,
    matching: (n) => `${n} matching role${n !== 1 ? 's' : ''}`,
  },
}

export default function DiscoveryTeaser({
  clusters = [],
  clusterCount,
  uniqueClusters,
  isUnlocked,
  progress,
  revelationCount = 0,
  standardCount = 0,
  reducedMotion,
}) {
  const [showInfo, setShowInfo] = useState(false)
  const { lang } = useLang()
  const t = TEXT[lang]
  const clusterMap = Object.fromEntries(clusters.map(c => [c.id, c]))
  const prevUnlocked = useRef(isUnlocked)
  const duration = reducedMotion ? 0 : 0.4

  // Auto-show info modal when discovery roles get unlocked
  useEffect(() => {
    if (isUnlocked && !prevUnlocked.current) {
      // Small delay so unlock animation plays first
      const timer = setTimeout(() => setShowInfo(true), 600)
      return () => clearTimeout(timer)
    }
    prevUnlocked.current = isUnlocked
  }, [isUnlocked])

  return (
    <div
      className={`
        rounded-xl border
        ${isUnlocked
          ? 'bg-revelation-bg/50 border-revelation-gold/20'
          : 'bg-revelation-bg border-revelation-gold/40'
        }
      `}
    >
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="locked"
            initial={false}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: duration * 0.5 }}
            className="p-4"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-3">
              <LockIcon className="w-5 h-5 text-revelation-gold flex-shrink-0" />
              <h3 className="font-semibold text-ink text-sm">
                {t.title}
              </h3>
            </div>

            {/* Subtext */}
            <p className="text-xs text-ink-muted mb-3 leading-relaxed">
              {clusterCount === 0 ? t.hint0 : clusterCount === 1 ? t.hint1 : t.hint2}
            </p>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-ink-muted">
                  {t.progress(clusterCount)}
                </span>
              </div>
              <div className="h-2 bg-border-light rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-revelation-gold rounded-full"
                  initial={false}
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration, ease: 'easeOut' }}
                />
              </div>
            </div>

            {/* Active cluster indicators */}
            {uniqueClusters.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {uniqueClusters.map(clusterId => {
                  const cluster = clusterMap[clusterId]
                  if (!cluster) return null
                  return (
                    <span
                      key={clusterId}
                      className={`
                        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs
                        bg-${cluster.color}/10 text-${cluster.color} border border-${cluster.color}/30
                      `}
                    >
                      <span className="text-xs">{cluster.icon}</span>
                      {cluster.labelShort}
                    </span>
                  )
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration, ease: 'easeOut' }}
            className="px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <motion.div
                initial={reducedMotion ? false : { rotate: -15 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                <UnlockIcon className="w-5 h-5 text-revelation-gold flex-shrink-0" />
              </motion.div>
              <span className="font-semibold text-ink text-sm">
                {t.unlocked}
              </span>
              <button
                onClick={() => setShowInfo(true)}
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:bg-white/60 transition-colors cursor-pointer"
                aria-label={t.whatAre}
              >
                <span className="text-sm font-bold">ⓘ</span>
              </button>
              {(revelationCount > 0 || standardCount > 0) && (
                <span className="ml-auto text-xs text-ink-muted text-right leading-tight">
                  {revelationCount > 0 && t.discoveries(revelationCount)}
                  {revelationCount > 0 && standardCount > 0 && ', '}
                  {standardCount > 0 && t.matching(standardCount)}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DiscoveryInfoModal open={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  )
}

export function DiscoveryInfoModal({ open, onClose }) {
  const { lang } = useLang()
  if (lang === 'en') {
    return (
      <InfoModal open={open} onClose={onClose} title="Discovery roles unlocked!">
        <p>
          You have selected competencies from 3+&nbsp;different fields. This range is what matters:
          someone who speaks many professional languages opens up positions that stay invisible
          from a one-dimensional view.
        </p>
        <div>
          <p className="font-semibold text-ink mb-1">What are discovery roles?</p>
          <p>
            Positions your company might not have on its radar&nbsp;— but that become possible
            through exactly this unusual combination of fields.
          </p>
        </div>
        <div>
          <p className="font-semibold text-ink mb-1">How are they different?</p>
          <p>
            <strong className="text-ink">Matching roles</strong> reflect the obvious strengths within
            single areas. <strong className="text-ink">Discovery roles</strong> show the surprising
            options that only emerge from connecting different fields&nbsp;— the ones your company
            might otherwise overlook.
          </p>
        </div>
      </InfoModal>
    )
  }
  return (
    <InfoModal open={open} onClose={onClose} title="Entdeckungsrollen freigeschaltet!">
      <p>
        Sie haben Kompetenzen aus 3+&nbsp;verschiedenen Fachgebieten ausgewählt. Genau diese
        Vielfalt ist entscheidend: Wer viele Fachsprachen spricht, eröffnet Positionen, die
        bei eindimensionaler Betrachtung unsichtbar bleiben.
      </p>
      <div>
        <p className="font-semibold text-ink mb-1">Was sind Entdeckungsrollen?</p>
        <p>
          Das sind Positionen, die Ihr Unternehmen vielleicht nicht auf dem Radar hätte&nbsp;—
          die aber genau durch diese einzigartige Kombination verschiedener Fachgebiete
          möglich werden.
        </p>
      </div>
      <div>
        <p className="font-semibold text-ink mb-1">Worin unterscheiden sie sich?</p>
        <p>
          <strong className="text-ink">Passende Rollen</strong> matchen die offensichtlichen
          Stärken aus einzelnen Bereichen. <strong className="text-ink">Entdeckungsrollen</strong> zeigen
          die überraschenden Möglichkeiten, die erst durch die Verbindung verschiedener
          Fachsprachen entstehen&nbsp;— und die Ihr Unternehmen sonst vielleicht übersehen würde.
        </p>
      </div>
    </InfoModal>
  )
}


function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" strokeLinecap="round" />
    </svg>
  )
}

function UnlockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="9" width="12" height="9" rx="2" />
      <path d="M7 9V6a3 3 0 0 1 6 0" strokeLinecap="round" />
    </svg>
  )
}
