const clusterColorMap = {
  'engineering': 'border-cluster-engineering text-cluster-engineering bg-cluster-engineering-bg',
  'leadership': 'border-cluster-leadership text-cluster-leadership bg-cluster-leadership-bg',
  'coaching': 'border-cluster-coaching text-cluster-coaching bg-cluster-coaching-bg',
  'ai-digital': 'border-cluster-ai text-cluster-ai bg-cluster-ai-bg',
  'data-process': 'border-cluster-data text-cluster-data bg-cluster-data-bg',
  'business': 'border-cluster-business text-cluster-business bg-cluster-business-bg',
  'didaktik': 'border-cluster-didaktik text-cluster-didaktik bg-cluster-didaktik-bg',
}

const clusterDescColorMap = {
  'engineering': 'text-cluster-engineering',
  'leadership': 'text-cluster-leadership',
  'coaching': 'text-cluster-coaching',
  'ai-digital': 'text-cluster-ai',
  'data-process': 'text-cluster-data',
  'business': 'text-cluster-business',
  'didaktik': 'text-cluster-didaktik',
}

export default function ClusterTabs({ clusters, activeCluster, onSelect }) {
  const active = clusters.find(c => c.id === activeCluster)

  return (
    <div className="mb-4">
      <nav
        className="flex flex-wrap gap-1.5 pb-2 -mx-1 px-1"
        role="tablist"
        aria-label="Kompetenz-Cluster"
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
                rounded-lg border-2 text-sm font-medium
                whitespace-nowrap min-h-[48px]
                transition-all duration-normal ease-out
                cursor-pointer
                ${isActive
                  ? colors
                  : 'border-transparent text-ink-muted bg-white hover:bg-container hover:text-ink-light'
                }
              `}
            >
              <span role="img" aria-hidden="true" className="text-base">{cluster.icon}</span>
              <span className="hidden sm:inline">{cluster.labelShort}</span>
            </button>
          )
        })}
      </nav>

      {/* Active cluster label - visible when tab text is hidden (small screens) */}
      {active && (
        <p className={`sm:hidden text-sm font-semibold mt-1 px-1 ${clusterDescColorMap[active.id] || 'text-ink'}`}>
          {active.icon} {active.label}
        </p>
      )}
    </div>
  )
}
