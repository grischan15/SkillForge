import { motion } from 'framer-motion'

const clusterChipColors = {
  'engineering': 'bg-cluster-engineering-light text-cluster-engineering border-cluster-engineering/30',
  'leadership': 'bg-cluster-leadership-light text-cluster-leadership border-cluster-leadership/30',
  'coaching': 'bg-cluster-coaching-light text-cluster-coaching border-cluster-coaching/30',
  'ai-digital': 'bg-cluster-ai-light text-cluster-ai border-cluster-ai/30',
  'data-process': 'bg-cluster-data-light text-cluster-data border-cluster-data/30',
  'business': 'bg-cluster-business-light text-cluster-business border-cluster-business/30',
  'didaktik': 'bg-cluster-didaktik-light text-cluster-didaktik border-cluster-didaktik/30',
}

export default function ForgedSkillChip({ skill, onRemove, reducedMotion }) {
  const colors = clusterChipColors[skill.clusterId] || 'bg-container text-ink border-border'

  return (
    <motion.span
      layout={!reducedMotion}
      initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={reducedMotion ? {} : { scale: 0.8, opacity: 0 }}
      className={`
        inline-flex items-center gap-1 px-2.5 py-1
        rounded-full text-xs font-medium
        border ${colors}
      `}
    >
      <span className="truncate max-w-[120px]">{skill.name}</span>
      <button
        onClick={() => onRemove(skill.id)}
        className="
          shrink-0 w-4 h-4 flex items-center justify-center
          rounded-full hover:bg-black/10
          text-current opacity-60 hover:opacity-100
          transition-opacity cursor-pointer
        "
        aria-label={`${skill.name} entfernen`}
      >
        &times;
      </button>
    </motion.span>
  )
}
