import { motion, AnimatePresence } from 'framer-motion'
import clusters from '../../data/clusters.json'

const clusterMap = Object.fromEntries(clusters.map(c => [c.id, c]))

export default function DiscoveryTeaser({
  clusterCount,
  uniqueClusters,
  isUnlocked,
  progress,
  matchCount = 0,
  reducedMotion,
}) {
  const duration = reducedMotion ? 0 : 0.4

  return (
    <motion.div
      layout
      transition={{ duration, ease: 'easeInOut' }}
      className={`
        rounded-xl border overflow-hidden
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
                Entdeckungsrollen
              </h3>
            </div>

            {/* Subtext */}
            <p className="text-xs text-ink-muted mb-3 leading-relaxed">
              {clusterCount === 0
                ? 'Ihre regulären Rollenvorschläge erscheinen sofort. Aber die spannendsten Entdeckungen? Die brauchen Skills aus mindestens drei verschiedenen Clustern. 😉'
                : clusterCount === 1
                  ? 'Noch zwei Cluster – dann enthüllt die Schmiede überraschende Rollen, die Sie vielleicht nicht auf dem Radar hatten.'
                  : 'Noch ein Cluster – und die Entdeckungsrollen werden sichtbar. Fast geschafft!'
              }
            </p>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-ink-muted">
                  {clusterCount} von 3 Clustern aktiviert
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
                Entdeckungsrollen freigeschaltet 🎉
              </span>
              {matchCount > 0 && (
                <span className="ml-auto text-xs text-ink-muted">
                  {matchCount} {matchCount === 1 ? 'Rolle' : 'Rollen'} gefunden
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
