import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

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
      {/* Photo - landscape source (2000x1333), cropped to circle, focus on face (left-center) */}
      <motion.div
        variants={itemVariants}
        className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full bg-sand border-4 border-white shadow-lg overflow-hidden mb-6"
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

      {/* Name + Claim */}
      <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-ink mb-1">
        Christian Schmidt
      </motion.h2>
      <motion.p variants={itemVariants} className="text-ink-light text-base sm:text-lg mb-6 leading-relaxed">
        Menschenorientierter Systemarchitekt<br />
        mit Pioniercharakter
      </motion.p>

      {/* Description */}
      <motion.p variants={itemVariants} className="text-ink-muted text-sm sm:text-base mb-8 max-w-md leading-relaxed px-4">
        Ziehe meine Kompetenzen in die Schmiede und entdecke,
        welche Rollen zu deinem Unternehmen passen.
      </motion.p>

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
