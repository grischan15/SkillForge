import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── SVG Icons ── */
function FlameIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c.5 3.5-1.5 6-1.5 6 1.5 1 3.5-.5 3.5-.5C14.5 11 12 14 12 14s3-1 4-4c1.5 2.5 1 6-1 8.5C13 20.5 10 21 8 19.5c-2.5-2-3-5-2-8 .5-1.5 1.5-3 2-4 .5-1.5 1-3 1-4 0-1 1.5-2.5 3-1.5" />
    </svg>
  )
}

function AnvilIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16h16M7 16v4M17 16v4" />
      <path d="M5 16c0-4 2-6 7-6h6c0-3-2-5-5-5H9C6 5 4 8 4 12v4h1z" />
    </svg>
  )
}

function TemperatureIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      <circle cx="11.5" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  )
}

function SparksIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 7l1.4-1.4" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

/* ── Step definitions ── */
const STEPS = [
  {
    id: 1,
    label: 'Feuer entfachen',
    icon: FlameIcon,
    text: 'Die Schmiede wartet auf Ihr erstes Erz. Wählen Sie oben einen Kompetenz-Bereich (z.\u202FB. Engineering, Leadership) und tippen Sie auf \u2295, um Ihren ersten Skill einzuschmelzen.',
  },
  {
    id: 2,
    label: 'Erze mischen',
    icon: AnvilIcon,
    text: 'Erstes Erz glüht! Die stärksten Legierungen entstehen aus verschiedenen Metallen — wechseln Sie den Bereich für neue Erze.',
  },
  {
    id: 3,
    label: 'Legierung formen',
    icon: TemperatureIcon,
    text: 'Zwei Erzadern vereint! Noch ein Bereich und die Schmiede enthüllt verborgene Legierungen.',
  },
  {
    id: 4,
    label: 'Meisterschmied',
    icon: SparksIcon,
    text: 'Schmiede auf Höchsttemperatur! Entdecken Sie Ihre Rollen — auch die überraschenden. \u2193',
  },
]

function getActiveStep(forgedSkills, clusterCount) {
  if (forgedSkills.length === 0) return 1
  if (clusterCount <= 1) return 2
  if (clusterCount === 2) return 3
  return 4
}

export default function ForgeGuide({ forgedSkills, clusterCount, reducedMotion }) {
  const currentStep = getActiveStep(forgedSkills, clusterCount)
  const [dismissed, setDismissed] = useState(false)

  // Step 4 auto-fades after 8s
  useEffect(() => {
    if (currentStep !== 4) {
      setDismissed(false)
      return
    }
    const timer = setTimeout(() => setDismissed(true), 8000)
    return () => clearTimeout(timer)
  }, [currentStep])

  if (dismissed && currentStep === 4) return null

  const step = STEPS[currentStep - 1]
  const Icon = step.icon
  const duration = reducedMotion ? 0 : 0.35

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration }}
        className="bg-revelation-bg border border-revelation-gold/30 rounded-xl px-4 py-3 mb-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <span className="mt-0.5 text-revelation-gold shrink-0" aria-hidden="true">
            <Icon />
          </span>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-ink leading-relaxed">{step.text}</p>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2" aria-label={`Schritt ${currentStep} von 4`}>
          {STEPS.map((s) => (
            <span
              key={s.id}
              className={`
                block w-1.5 h-1.5 rounded-full transition-colors duration-300
                ${s.id === currentStep ? 'bg-revelation-gold' : s.id < currentStep ? 'bg-revelation-gold/40' : 'bg-ink-muted/25'}
              `}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
