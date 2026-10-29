import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import InfoModal from '../shared/InfoModal'
import { useLang } from '../../i18n/LanguageContext'
import ClusterIcon from '../shared/ClusterIcon'
import { Cog, Users, Star, Feather, Heart, Gem, Sun, Trophy, Mountain, LayoutGrid, Zap } from 'lucide-react'

const ICONS = { cog: Cog, users: Users, star: Star, feather: Feather, heart: Heart, gem: Gem, sun: Sun, trophy: Trophy, mountain: Mountain, layout: LayoutGrid, zap: Zap }
const Icon = ({ name, size = 16, className = '' }) => {
  const C = ICONS[name]
  return C ? <C size={size} strokeWidth={2} className={className} aria-hidden="true" /> : null
}

const TEXT = {
  de: {
    proofPoints: [
      { icon: 'cog', metric: '15+ Jahre', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Entwicklungsleiter' },
      { icon: 'users', metric: '3 Kontinente', label: 'Führungserfahrung', detail: 'Teams bis 17 MA, Note 1' },
      { icon: 'star', metric: '4.96 / 5.0', label: 'Coaching-Bewertung', detail: '387 UE, 6 Diplome, ISO 17024' },
    ],
    values: [
      { icon: 'feather', label: 'Freiheit', tooltip: 'Eigenverantwortung statt Micromanagement — Raum für echte Entwicklung.' },
      { icon: 'heart', label: 'Agape', tooltip: 'Bedingungslose Wertschätzung — Menschen sehen, nicht nur Funktionen.' },
      { icon: 'gem', label: 'Klarheit', tooltip: 'Ehrliche Kommunikation — auch wenn es unbequem wird.' },
    ],
    strengths: [
      { icon: 'sun', label: 'Positive Einstellung', tooltip: 'Ich sehe Potenzial, wo andere Probleme sehen.' },
      { icon: 'trophy', label: 'Höchstleistung', tooltip: 'Ich finde den Hebel, der aus gut herausragend macht.' },
      { icon: 'mountain', label: 'Selbstbewusstsein', tooltip: 'Vertrauen in die eigene Richtung — auch gegen den Strom.' },
      { icon: 'layout', label: 'Arrangeur', tooltip: 'Komplexität orchestrieren — die richtigen Menschen am richtigen Platz.' },
      { icon: 'zap', label: 'Tatkraft', tooltip: 'Weniger reden, mehr machen — vom Impuls zur Umsetzung.' },
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
      { icon: 'cog', metric: '15+ years', label: 'Automotive Engineering', detail: 'NVH, Six Sigma, Head of Engineering' },
      { icon: 'users', metric: '3 continents', label: 'Leadership experience', detail: 'Teams of up to 17, top rating' },
      { icon: 'star', metric: '4.96 / 5.0', label: 'Coaching rating', detail: '387 teaching units, 6 diplomas, ISO 17024' },
    ],
    values: [
      { icon: 'feather', label: 'Freedom', tooltip: 'Ownership instead of micromanagement — room for real growth.' },
      { icon: 'heart', label: 'Agape', tooltip: 'Unconditional appreciation — seeing people, not just functions.' },
      { icon: 'gem', label: 'Clarity', tooltip: 'Honest communication — even when it gets uncomfortable.' },
    ],
    strengths: [
      { icon: 'sun', label: 'Positivity', tooltip: 'I see potential where others see problems.' },
      { icon: 'trophy', label: 'Maximizer', tooltip: 'I find the lever that turns good into outstanding.' },
      { icon: 'mountain', label: 'Self-Assurance', tooltip: 'Trust in my own direction — even against the current.' },
      { icon: 'layout', label: 'Arranger', tooltip: 'Orchestrating complexity — the right people in the right place.' },
      { icon: 'zap', label: 'Activator', tooltip: 'Less talk, more action — from impulse to execution.' },
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
        className="w-40 h-48 sm:w-44 sm:h-52 lg:w-48 lg:h-56 p3-box--tall bg-salbei overflow-hidden mb-5"
      >
        <img
          src="images/BW_MW20220613_34995.jpg"
          alt="Christian Schmidt"
          className="w-full h-full object-cover"
          style={{ objectPosition: '50% 25%' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.innerHTML = ''
          }}
        />
      </motion.div>

      {/* Name */}
      <motion.h2 variants={itemVariants} className="font-display font-black text-3xl sm:text-4xl text-ink mb-1">
        Christian Schmidt
      </motion.h2>

      {/* Signature */}
      <motion.img
        variants={itemVariants}
        src="images/signature_Schwarz.svg"
        alt=""
        className="h-8 sm:h-10 w-auto opacity-60 mb-5"
        aria-hidden="true"
      />

      {/* Claim */}
      <motion.p variants={itemVariants} className="text-ink text-lg sm:text-xl mb-3 max-w-lg leading-snug px-4 italic">
        {t.claim}
      </motion.p>

      {/* Emotional Hook */}
      <motion.p variants={itemVariants} className="text-ink-muted text-sm sm:text-base mb-8 max-w-lg leading-relaxed px-4">
        {t.hook}
        <span className="block mt-2 text-ink-light font-semibold">
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
            className="p3-cut-box flex flex-col items-center gap-1 p-4 bg-white"
          >
            <Icon name={point.icon} size={22} className="text-moosgruen mb-1" />
            <span className="font-display font-black text-xl sm:text-2xl text-terrakotta">{point.metric}</span>
            <span className="text-sm font-semibold text-ink">{point.label}</span>
            <span className="text-xs text-ink-muted">{point.detail}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => setShowInfo(true)}
        className="p3-button font-semibold text-base sm:text-lg px-10 py-4 min-h-[56px] cursor-pointer"
        data-variant="primary"
      >
        {t.cta}
        <span className="block text-sm font-normal mt-0.5">
          {t.ctaSub}
        </span>
      </motion.button>

      {/* Cluster Preview */}
      <motion.div variants={itemVariants} className="mt-8 mb-2">
        <p className="p3-eyebrow mb-3">{t.areas}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {clusters.map(cluster => (
            <span
              key={cluster.id}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5 rounded-sm
                text-sm text-ink
                bg-white border border-border
              "
            >
              <ClusterIcon id={cluster.id} className={`text-${cluster.color}`} />
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
          <p className="p3-eyebrow mb-2">{t.myValues}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.values.map(v => (
              <span
                key={v.label}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-semibold text-ink bg-salbei-tint border border-salbei cursor-default"
              >
                <Icon name={v.icon} size={14} className="text-moosgruen" />
                {v.label}
                <span className="
                  pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  px-3 py-2 rounded-sm bg-ink text-sand text-xs leading-relaxed font-normal
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
          <p className="p3-eyebrow mb-2">{t.myStrengths} <span className="font-sans normal-case tracking-normal font-normal text-ink-muted">(CliftonStrengths)</span></p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.strengths.map(s => (
              <span
                key={s.label}
                className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-sm font-semibold text-ink bg-white border border-border cursor-default"
              >
                <Icon name={s.icon} size={14} className="text-moosgruen" />
                {s.label}
                <span className="
                  pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                  px-3 py-2 rounded-sm bg-ink text-sand text-xs leading-relaxed font-normal
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
              <span className="flex-shrink-0 w-7 font-display font-black text-2xl leading-none text-terrakotta">{i + 1}</span>
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
