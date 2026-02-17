import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const proofPoints = [
  { icon: '⚙️', metric: '15+ Jahre', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Entwicklungsleiter' },
  { icon: '👥', metric: '3 Kontinente', label: 'Führungserfahrung', detail: 'Teams bis 17 MA, Note 1' },
  { icon: '🎯', metric: '4.96 / 5.0', label: 'Coaching-Bewertung', detail: '387 UE, 6 Diplome, ISO 17024' },
]

export default function Welcome({ onStart, clusters }) {
  const reducedMotion = useReducedMotion()

  const containerVariants = reducedMotion ? {} : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = reducedMotion ? {} : {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.main
      className="flex flex-col items-center text-center py-8 sm:py-12 lg:py-16 max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Photo */}
      <motion.div
        variants={itemVariants}
        className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full bg-sand border-4 border-white shadow-lg overflow-hidden mb-4"
      >
        <img
          src="images/BW_MW20220613_34995.jpg"
          alt="Christian Schmidt"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 25%' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = '<span class="flex items-center justify-center w-full h-full text-5xl">👤</span>'
          }}
        />
      </motion.div>

      {/* Name */}
      <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-ink mb-1">
        Christian Schmidt
      </motion.h2>

      {/* Signature */}
      <motion.img
        variants={itemVariants}
        src="images/signature_Schwarz.svg"
        alt=""
        className="h-8 sm:h-10 w-auto opacity-50 mb-5"
        aria-hidden="true"
      />

      {/* Claim */}
      <motion.p variants={itemVariants} className="text-ink-light text-lg sm:text-xl font-medium mb-3 leading-relaxed italic">
        Menschenorientierter Systemarchitekt<br />
        mit Pioniercharakter
      </motion.p>

      {/* Emotional Hook */}
      <motion.p variants={itemVariants} className="text-ink-muted text-sm sm:text-base mb-8 max-w-lg leading-relaxed px-4">
        Vom Entwicklungsleiter Asien zum Master Coach&nbsp;—
        ich baue auf, was bleibt: Teams, Strukturen, Menschen.
        <span className="block mt-2 text-ink-light font-medium">
          Entdecke die Kompetenzen hinter dem Anspruch.
        </span>
      </motion.p>

      {/* Proof Points */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl mb-10 px-4"
      >
        {proofPoints.map((point) => (
          <div
            key={point.label}
            className="flex flex-col items-center gap-1 p-4 rounded-xl bg-white border border-border-light shadow-xs"
          >
            <span className="text-2xl" role="img" aria-hidden="true">{point.icon}</span>
            <span className="text-lg sm:text-xl font-bold text-ink">{point.metric}</span>
            <span className="text-xs font-semibold text-ink-light tracking-wide uppercase">{point.label}</span>
            <span className="text-xs text-ink-muted">{point.detail}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        onClick={onStart}
        className="
          bg-p3-red hover:bg-p3-red-hover text-white
          font-semibold text-base sm:text-lg
          px-8 py-4 rounded-xl
          shadow-md hover:shadow-lg
          transition-all duration-normal ease-out
          min-h-[56px] cursor-pointer
        "
        whileHover={reducedMotion ? {} : { scale: 1.03 }}
        whileTap={reducedMotion ? {} : { scale: 0.98 }}
      >
        Kompetenzen entdecken →
      </motion.button>

      {/* Cluster Preview */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-3 mt-10"
      >
        {clusters.map(cluster => (
          <span
            key={cluster.id}
            className="
              inline-flex items-center gap-1.5
              px-3 py-1.5 rounded-full
              text-sm text-ink-light
              bg-white border border-border-light
              shadow-xs
            "
          >
            <span role="img" aria-hidden="true">{cluster.icon}</span>
            {cluster.labelShort}
          </span>
        ))}
      </motion.div>
    </motion.main>
  )
}
