import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export default function InfoModal({ open, onClose, title, children, actionLabel, onAction }) {
  const closeRef = useRef(null)
  const reducedMotion = useReducedMotion()
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
          aria-labelledby="info-modal-title"
          className="relative w-full max-w-lg max-h-[80dvh] overflow-y-auto bg-white rounded-2xl shadow-xl"
        >
          {/* Close button */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute top-3 right-3 w-10 h-10 rounded-full
              flex items-center justify-center
              text-ink-muted hover:text-ink hover:bg-container
              transition-colors z-10 cursor-pointer"
            aria-label="Schließen"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>

          {/* Content */}
          <div className="p-6">
            {title && (
              <h2 id="info-modal-title" className="text-lg font-bold text-ink mb-4 pr-8">
                {title}
              </h2>
            )}
            <div className="text-sm text-ink-light leading-relaxed space-y-4">
              {children}
            </div>

            {actionLabel && (
              <button
                onClick={onAction || onClose}
                className="mt-6 w-full bg-p3-red hover:bg-p3-red-hover text-white font-semibold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-normal ease-out min-h-[48px] cursor-pointer"
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
