import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useLang } from '../../i18n/LanguageContext'

export default function InfoModal({ open, onClose, title, children, actionLabel, onAction }) {
  const closeRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { lang } = useLang()
  const duration = reducedMotion ? 0 : 0.25

  useEffect(() => {
    if (!open) return

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
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[8dvh] px-4 pb-4"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-tannenblau/50"
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
          aria-labelledby="info-modal-title"
          className="relative w-full max-w-lg max-h-[80dvh] overflow-y-auto bg-white rounded-sm shadow-lg"
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-3 right-3 w-12 h-12 rounded-sm
              flex items-center justify-center
              text-ink-light hover:text-tannenblau hover:bg-salbei
              transition-colors z-10 cursor-pointer"
            aria-label={lang === 'en' ? 'Close' : 'Schließen'}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6">
            {title && (
              <h2 id="info-modal-title" className="text-2xl font-black text-ink leading-none mb-5 pr-10">
                {title}
              </h2>
            )}
            <div className="text-sm text-ink-light leading-relaxed space-y-4">
              {children}
            </div>

            {actionLabel && (
              <button
                onClick={onAction || onClose}
                className="p3-button mt-6 w-full font-semibold text-base px-6 py-3 min-h-[52px] cursor-pointer"
                data-variant="primary"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}
