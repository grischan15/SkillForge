import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import InfoModal from '../shared/InfoModal'
import { useLang } from '../../i18n/LanguageContext'

const TEXT = {
  de: {
    proofPoints: [
      { icon: '⚙️', metric: '15+ Jahre', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Entwicklungsleiter' },
      { icon: '👥', metric: '3 Kontinente', label: 'Führungserfahrung', detail: 'Teams bis 17 MA, Note 1' },
      { icon: '🎯', metric: '4.96 / 5.0', label: 'Coaching-Bewertung', detail: '387 UE, 6 Diplome, ISO 17024' },
    ],
    values: [
      { icon: '🕊️', label: 'Freiheit', tooltip: 'Eigenverantwortung statt Micromanagement — Raum für echte Entwicklung.' },
      { icon: '❤️', label: 'Agape', tooltip: 'Bedingungslose Wertschätzung — Menschen sehen, nicht nur Funktionen.' },
      { icon: '💎', label: 'Klarheit', tooltip: 'Ehrliche Kommunikation — auch wenn es unbequem wird.' },
    ],
    strengths: [
      { icon: '✨', label: 'Positive Einstellung', tooltip: 'Ich sehe Potenzial, wo andere Probleme sehen.' },
      { icon: '🏆', label: 'Höchstleistung', tooltip: 'Ich finde den Hebel, der aus gut herausragend macht.' },
      { icon: '🧭', label: 'Selbstbewusstsein', tooltip: 'Vertrauen in die eigene Richtung — auch gegen den Strom.' },
      { icon: '🎼', label: 'Arrangeur', tooltip: 'Komplexität orchestrieren — die richtigen Menschen am richtigen Platz.' },
      { icon: '⚡', label: 'Tatkraft', tooltip: 'Weniger reden, mehr machen — vom Impuls zur Umsetzung.' },
    ],
    claim: 'Ich sehe Stärken, baue Strukturen und schaffe Räume, in denen Arbeit wirkt.',
    hook: 'Vom Entwicklungsleiter Asien zum Master Coach\u00a0— ich bringe zusammen, was zusammengehört: Menschen, Stärken und den richtigen Purpose.',
    lead: 'Entdecke die Kompetenzen hinter dem Anspruch — und finde die passende Rolle.',
    cta: 'Rollen-Match starten →',
    ctaSub: 'Stärken in Aktion sehen',
    areas: '6 Kompetenz-Bereiche:',
    myValues: 'Meine Werte',
    myStrengths: 'Meine Stärken',
    modalTitle: 'So funktioniert die Kompetenz-Schmiede',
    modalAction: 'Los geht\'s →',
    modalIntro: 'Meine Kompetenzen stammen aus 6\u00a0verschiedenen Fachgebieten\u00a0— vom Engineering über Leadership bis zur Didaktik. Gerade diese Vielfalt ist entscheidend: Wer viele Fachsprachen spricht, eröffnet Rollen, die bei eindimensionaler Betrachtung unsichtbar bleiben.',
    steps: [
      { title: 'Kompetenzen auswählen', text: 'Wählen Sie aus 6\u00a0Bereichen die Skills, die Sie interessieren\u00a0— Engineering, Leadership, Coaching, KI, Business oder Didaktik.' },
      { title: 'Passende Rollen sehen', text: 'Die Schmiede zeigt sofort Rollen, die zum ausgewählten Kompetenz-Mix passen.' },
      { title: 'Entdeckungsrollen freischalten', text: 'Ab 3\u00a0verschiedenen Bereichen werden überraschende Rollen sichtbar\u00a0— Positionen, die Ihr Unternehmen sonst vielleicht übersehen würde, weil sie erst durch die Kombination verschiedener Fachgebiete entstehen.' },
    ],
  },
  en: {
    proofPoints: [
      { icon: '⚙️', metric: '15+ years', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Head of Engineering' },
      { icon: '👥', metric: '3 continents', label: 'Leadership experience', detail: 'Teams of up to 17, top rating' },
      { icon: '🎯', metric: '4.96 / 5.0', label: 'Coaching rating', detail: '387 teaching units, 6 diplomas, ISO 17024' },
    ],
    values: [
      { icon: '🕊️', label: 'Freedom', tooltip: 'Ownership instead of micromanagement — room for real growth.' },
      { icon: '❤️', label: 'Agape', tooltip: 'Unconditional appreciation — seeing people, not just functions.' },
      { icon: '💎', label: 'Clarity', tooltip: 'Honest communication — even when it gets uncomfortable.' },
    ],
    strengths: [
      { icon: '✨', label: 'Positivity', tooltip: 'I see potential where others see problems.' },
      { icon: '🏆', label: 'Maximizer', tooltip: 'I find the lever that turns good into outstanding.' },
      { icon: '🧭', label: 'Self-Assurance', tooltip: 'Trust in my own direction — even against the current.' },
      { icon: '🎼', label: 'Arranger', tooltip: 'Orchestrating complexity — the right people in the right place.' },
      { icon: '⚡', label: 'Activator', tooltip: 'Less talk, more action — from impulse to execution.' },
    ],
    claim: 'I see strengths, build structures and create spaces where work makes an impact.',
    hook: 'From Head of Engineering Asia to Master Coach\u00a0— I bring together what belongs together: people, strengths and the right purpose.',
    lead: 'Discover the competencies behind the claim — and find the right role.',
    cta: 'Start role match →',
    ctaSub: 'See strengths in action',
    areas: '6 competence areas:',
    myValues: 'My values',
    myStrengths: 'My strengths',
    modalTitle: 'How the competence forge works',
    modalAction: 'Let\'s go →',
    modalIntro: 'My competencies come from 6\u00a0different fields\u00a0— from engineering and leadership to teaching. This range is what matters: someone who speaks many professional languages opens up roles that stay invisible from a one-dimensional view.',
    steps: [
      { title: 'Choose competencies', text: 'Pick the skills that interest you from 6\u00a0areas\u00a0— Engineering, Leadership, Coaching, AI, Business or Teaching.' },
      { title: 'See matching roles', text: 'The forge instantly shows roles that fit the selected mix of competencies.' },
      { title: 'Unlock discovery roles', text: 'Once you combine 3\u00a0different areas, surprising roles appear\u00a0— positions your company might otherwise overlook, because they only emerge from combining different fields.' },
    ],
  },
}

export default function Welcome({ onStart, clusters }) {
  const reducedMotion = useReducedMotion()
  const [showInfo, setShowInfo] = useState(false)
  const { lang } = useLang()
  const t = TEXT[lang]

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
        {t.claim}
      </motion.p>

      {/* Emotional Hook */}
      <motion.p variants={itemVariants} className="text-ink-muted text-sm sm:text-base mb-8 max-w-lg leading-relaxed px-4">
        {t.hook}
        <span className="block mt-2 text-ink-light font-medium">
          {t.lead}
        </span>
      </motion.p>

      {/* Proof Points */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl mb-10 px-4"
      >
        {t.proofPoints.map((point) => (
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
        {t.cta}
        <span className="block text-sm font-normal opacity-80 mt-0.5">
          {t.ctaSub}
        </span>
      </motion.button>

      {/* Cluster Preview */}
      <motion.div variants={itemVariants} className="mt-8 mb-2">
        <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-3">{t.areas}</p>
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
          <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-2">{t.myValues}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.values.map(v => (
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
          <p className="text-xs font-semibold text-ink-light tracking-widest uppercase mb-2">{t.myStrengths} <span className="normal-case tracking-normal font-normal">(CliftonStrengths)</span></p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.strengths.map(s => (
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
        title={t.modalTitle}
        actionLabel={t.modalAction}
        onAction={() => { setShowInfo(false); onStart() }}
      >
        <p className="text-ink mb-2">{t.modalIntro}</p>
        <div className="space-y-4 pt-2">
          {t.steps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm ${i === 2 ? 'bg-revelation-gold/20 text-revelation-gold' : 'bg-p3-red/10 text-p3-red'}`}>{i + 1}</span>
              <div>
                <p className="font-semibold text-ink mb-0.5">{step.title}</p>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </InfoModal>
    </motion.main>
  )
}
