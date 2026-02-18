import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'skillforge-onboarding-seen'

export default function OnboardingHint({ reducedMotion }) {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY)
    } catch {
      return true
    }
  })

  function dismiss() {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // localStorage unavailable
    }
  }

  const duration = reducedMotion ? 0 : 0.3

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration }}
          className="relative bg-revelation-bg border border-revelation-gold/30 rounded-lg p-3 pr-8"
        >
          <p className="text-xs text-ink leading-relaxed">
            Ihre Kompetenz-DNA ist einzigartig. Kombinieren Sie Skills aus verschiedenen Clustern
            – ab drei Bereichen enthüllt die Schmiede passende Rollen.
            Und manche Entdeckungen überraschen selbst erfahrene Recruiter. 😉
          </p>
          <button
            onClick={dismiss}
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center
              rounded-full text-ink-muted hover:text-ink hover:bg-container transition-colors"
            aria-label="Hinweis schließen"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
