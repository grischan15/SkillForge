import { motion } from 'framer-motion'

const TAG_LABELS = {
  leadership: 'Leadership',
  coaching: 'Coaching',
  values: 'Werte',
  culture: 'Kultur',
  transformation: 'Transformation',
  'org-development': 'OE',
  'change-management': 'Change Mgmt',
  'adult-education': 'Erwachsenenbildung',
  'leadership-development': 'FK-Entwicklung',
  training: 'Training',
  curriculum: 'Curriculum',
  ai: 'KI',
  facilitation: 'Moderation',
  strategy: 'Strategie',
  communication: 'Kommunikation',
  systemic: 'Systemisch',
  'st-galler': 'St. Galler',
  'c-level': 'C-Level',
  hypnosystemic: 'Hypnosystemisch',
  'data-analysis': 'Datenanalyse',
  'prompt-engineering': 'Prompt Eng.',
  'machine-learning': 'ML',
  'ai-strategy': 'KI-Strategie',
  automation: 'Automation',
  'web-development': 'Web-Dev',
  'design-systems': 'Design Systems',
  engineering: 'Engineering',
  nvh: 'NVH',
  mechatronics: 'Mechatronik',
  'six-sigma': 'Six Sigma',
  dfss: 'DFSS',
  'tuev-certification': 'TÜV-Zert.',
  lean: 'Lean',
  patent: 'Patent',
  'pnl-responsibility': 'P&L',
  'business-development': 'Business Dev',
  mna: 'M&A',
  sales: 'Vertrieb',
  'startup-founding': 'Gründung',
  'intercultural': 'Interkulturell',
  didactics: 'Didaktik',
  'e-learning': 'E-Learning',
  'exam-design': 'Prüfungsdesign',
  'neurodiversity': 'Neurodiversität',
  'neuro-methodology': 'Neuro-Methodik',
  'process-optimization': 'Prozessopt.',
  'quality-management': 'QM',
  'team-coaching': 'Team-Coaching',
  'conflict-resolution': 'Konfliktlösung',
  resilience: 'Resilienz',
  'project-management': 'Projektmgmt',
  purpose: 'Purpose',
}

export default function SkillTag({ tag, isMatched }) {
  const label = TAG_LABELS[tag] || tag

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        transition-colors duration-200
        ${isMatched
          ? 'bg-p3-green/10 text-p3-green border border-p3-green/30'
          : 'bg-container text-ink-muted border border-border-light'
        }
      `}
    >
      {isMatched && (
        <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {label}
    </span>
  )
}
