import { useLang } from '../../i18n/LanguageContext'
import ClusterIcon from '../shared/ClusterIcon'
const clusterColorMap = {
  'engineering': 'border-cluster-engineering text-cluster-engineering bg-cluster-engineering-bg',
  'leadership': 'border-cluster-leadership text-cluster-leadership bg-cluster-leadership-bg',
  'coaching': 'border-cluster-coaching text-cluster-coaching bg-cluster-coaching-bg',
  'ai-digital': 'border-cluster-ai text-cluster-ai bg-cluster-ai-bg',
  'business': 'border-cluster-business text-cluster-business bg-cluster-business-bg',
  'didaktik': 'border-cluster-didaktik text-cluster-didaktik bg-cluster-didaktik-bg',
}

const clusterDescColorMap = {
  'engineering': 'text-cluster-engineering',
  'leadership': 'text-cluster-leadership',
  'coaching': 'text-cluster-coaching',
  'ai-digital': 'text-cluster-ai',
  'business': 'text-cluster-business',
  'didaktik': 'text-cluster-didaktik',
}

export default function ClusterTabs({ clusters, activeCluster, onSelect }) {
  const active = clusters.find(c => c.id === activeCluster)
  const { lang } = useLang()
  const heading = lang === 'en' ? '6 competence areas' : '6 Kompetenz-Bereiche'

  return (
    <div className="mb-4 p3-cut-box bg-white p-3">
      <p className="p3-eyebrow mb-2">
        {heading}
      </p>
      <nav
        className="flex flex-wrap gap-1.5"
        role="tablist"
        aria-label={heading}
      >
        {clusters.map(cluster => {
          const isActive = cluster.id === activeCluster
          const colors = clusterColorMap[cluster.id] || ''

          return (
            <button
              key={cluster.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(cluster.id)}
              className={`
                flex items-center gap-1.5 px-3 py-2
                rounded-sm border-2 text-sm font-semibold
                whitespace-nowrap min-h-[48px]
                transition-colors duration-normal
                cursor-pointer
                ${isActive
                  ? colors
                  : 'border-transparent text-ink-light bg-white hover:bg-salbei-tint hover:text-ink'
                }
              `}
            >
              <ClusterIcon id={cluster.id} size={18} />
              <span className="hidden sm:inline">{cluster.labelShort}</span>
            </button>
          )
        })}
      </nav>

      {/* Active cluster label - visible when tab text is hidden (small screens) */}
      {active && (
        <p className={`sm:hidden text-sm font-semibold mt-1 ${clusterDescColorMap[active.id] || 'text-ink'}`}>
          <span className="inline-flex items-center gap-1.5"><ClusterIcon id={active.id} /> {active.label}</span>
        </p>
      )}
    </div>
  )
}
