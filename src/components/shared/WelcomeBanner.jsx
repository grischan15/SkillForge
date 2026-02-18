import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'skillforge-welcome-banner-seen'

export default function WelcomeBanner({ reducedMotion }) {
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
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration }}
          className="relative bg-revelation-bg border border-revelation-gold/30 rounded-xl p-4 pr-10 mb-4"
        >
          <p className="font-semibold text-sm text-ink mb-2">
            So funktioniert die Kompetenz-Schmiede
          </p>
          <div className="space-y-1.5 text-xs text-ink-light leading-relaxed">
            <p>
              <span className="font-medium text-ink">1.</span> Wählen Sie Skills aus den Clustern oben — per Klick auf <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-p3-red/10 text-p3-red text-[10px] font-bold align-text-bottom">+</span> oder per Drag & Drop.
            </p>
            <p>
              <span className="font-medium text-ink">2.</span> Die Schmiede rechts zeigt sofort passende Rollenvorschläge für Ihren Kompetenz-Mix.
            </p>
            <p>
              <span className="font-medium text-ink">3.</span> Ab drei verschiedenen Clustern enthüllt die Schmiede überraschende Entdeckungsrollen. 😉
            </p>
          </div>

          <button
            onClick={dismiss}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
              rounded-full text-ink-muted hover:text-ink hover:bg-container transition-colors"
            aria-label="Banner schließen"
          >
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
