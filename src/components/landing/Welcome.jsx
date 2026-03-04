import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import InfoModal from '../shared/InfoModal'

const proofPoints = [
  { icon: '⚙️', metric: '15+ Jahre', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Entwicklungsleiter' },
  { icon: '👥', metric: '3 Kontinente', label: 'Führungserfahrung', detail: 'Teams bis 17 MA, Note 1' },
  { icon: '🎯', metric: '4.96 / 5.0', label: 'Coaching-Bewertung', detail: '387 UE, 6 Diplome, ISO 17024' },
]

const myValues = [
  { icon: '🕊️', label: 'Freiheit', tooltip: 'Eigenverantwortung statt Micromanagement — Raum für echte Entwicklung.' },
  { icon: '❤️', label: 'Agape', tooltip: 'Bedingungslose Wertschätzung — Menschen sehen, nicht nur Funktionen.' },
  { icon: '💎', label: 'Klarheit', tooltip: 'Ehrliche Kommunikation — auch wenn es unbequem wird.' },
]

const myStrengths = [
  { icon: '✨', label: 'Positive Einstellung', tooltip: 'Ich sehe Potenzial, wo andere Probleme sehen.' },
  { icon: '🏆', label: 'Höchstleistung', tooltip: 'Ich finde den Hebel, der aus gut herausragend macht.' },
  { icon: '🧭', label: 'Selbstbewusstsein', tooltip: 'Vertrauen in die eigene Richtung — auch gegen den Strom.' },
  { icon: '🎼', label: 'Arrangeur', tooltip: 'Komplexität orchestrieren — die richtigen Menschen am richtigen Platz.' },
  { icon: '⚡', label: 'Tatkraft', tooltip: 'Weniger reden, mehr machen — vom Impuls zur Umsetzung.' },
]

export default function Welcome({ onStart, clusters }) {
  const reducedMotion = useReducedMotion()
  const [showInfo, setShowInfo] = useState(false)

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
      <motion.p variants={itemVariants} className="text-ink text-base sm:text-lg font-medium mb-3 max-w-lg leading-relaxed px-4 italic">
        Ich sehe Stärken, baue Strukturen und schaffe Räume,
        in denen Arbeit wirkt.
      </motion.p>

      {/* Emotional Hook */}
      <motion.p variants={itemVariants} className="text-ink-muted text-sm sm:text-base mb-8 max-w-lg leading-relaxed px-4">
        Vom Entwicklungsleiter Asien zum Master Coach&nbsp;—
        ich bringe zusammen, was zusammengehört: Menschen, Stärken und den richtigen Purpose.
        <span className="block mt-2 text-ink-light font-medium">
          Entdecke die Kompetenzen hinter dem Anspruch — und finde die passende Rolle.
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
        onClick={() => setShowInfo(true)}
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
        Rollen-Match starten →
        <span className="block text-sm font-normal opacity-80 mt-0.5">
          Stärken in Aktion sehen
        </span>
      </motion.button>

      {/* Cluster Preview */}
      <motion.div variants={itemVariants} className="mt-8 mb-2">
        <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-3">6 Kompetenz-Bereiche:</p>
        <div className="flex flex-wrap justify-center gap-3">
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
        </div>
      </motion.div>

      {/* Values & Strengths — with hover tooltips */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-xl mt-8 mb-2 px-4 space-y-4"
      >
        {/* Values */}
        <div>
          <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-2">Meine Werte</p>
          <div className="flex flex-wrap justify-center gap-2">
            {myValues.map(v => (
              <span
                key={v.label}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-ink bg-sand/50 border border-border-light cursor-default"
              >
                <span role="img" aria-hidden="true">{v.icon}</span>
                {v.label}
                <span className="
                  pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  px-3 py-2 rounded-lg bg-ink text-white text-xs leading-relaxed
                  w-56 text-center shadow-lg
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  hidden sm:block
                ">
                  {v.tooltip}
                </span>
              </span>
            ))}
          </div>
        </div>
        {/* Strengths */}
        <div>
          <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-2">Meine Stärken <span className="normal-case tracking-normal font-normal">(CliftonStrengths)</span></p>
          <div className="flex flex-wrap justify-center gap-2">
            {myStrengths.map(s => (
              <span
                key={s.label}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-ink bg-white border border-border-light cursor-default"
              >
                <span role="img" aria-hidden="true">{s.icon}</span>
                {s.label}
                <span className="
                  pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  px-3 py-2 rounded-lg bg-ink text-white text-xs leading-relaxed
                  w-56 text-center shadow-lg
                  opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  hidden sm:block
                ">
                  {s.tooltip}
                </span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Auto-Popup: explains the 3-step workflow before entering the forge */}
      <InfoModal
        open={showInfo}
        onClose={() => { setShowInfo(false); onStart() }}
        title="So funktioniert die Kompetenz-Schmiede"
        actionLabel="Los geht's →"
        onAction={() => { setShowInfo(false); onStart() }}
      >
        <p className="text-ink mb-2">
          Meine Kompetenzen stammen aus 6&nbsp;verschiedenen Fachgebieten&nbsp;— vom Engineering
          über Leadership bis zur Didaktik. Gerade diese Vielfalt ist entscheidend: Wer viele
          Fachsprachen spricht, eröffnet Rollen, die bei eindimensionaler Betrachtung unsichtbar bleiben.
        </p>
        <div className="space-y-4 pt-2">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-p3-red/10 text-p3-red flex items-center justify-center font-bold text-sm">1</span>
            <div>
              <p className="font-semibold text-ink mb-0.5">Kompetenzen auswählen</p>
              <p>Wählen Sie aus 6&nbsp;Bereichen die Skills, die Sie interessieren&nbsp;— Engineering, Leadership, Coaching, KI, Business oder Didaktik.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-p3-red/10 text-p3-red flex items-center justify-center font-bold text-sm">2</span>
            <div>
              <p className="font-semibold text-ink mb-0.5">Passende Rollen sehen</p>
              <p>Die Schmiede zeigt sofort Rollen, die zum ausgewählten Kompetenz-Mix passen.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-revelation-gold/20 text-revelation-gold flex items-center justify-center font-bold text-sm">3</span>
            <div>
              <p className="font-semibold text-ink mb-0.5">Entdeckungsrollen freischalten</p>
              <p>Ab 3&nbsp;verschiedenen Bereichen werden überraschende Rollen sichtbar&nbsp;— Positionen,
                die Ihr Unternehmen sonst vielleicht übersehen würde, weil sie erst durch die
                Kombination verschiedener Fachgebiete entstehen.</p>
            </div>
          </div>
        </div>
      </InfoModal>
    </motion.main>
  )
}
