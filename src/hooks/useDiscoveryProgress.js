import { useMemo } from 'react'

export function useDiscoveryProgress(forgedSkills) {
  return useMemo(() => {
    if (forgedSkills.length === 0) {
      return {
        clusterCount: 0,
        uniqueClusters: [],
        isUnlocked: false,
        progress: 0,
      }
    }

    const clusterSet = new Set(forgedSkills.map(s => s.clusterId))
    const clusterCount = clusterSet.size
    const uniqueClusters = [...clusterSet]
    const isUnlocked = clusterCount >= 3
    const progress = Math.min(clusterCount / 3, 1)

    return {
      clusterCount,
      uniqueClusters,
      isUnlocked,
      progress,
    }
  }, [forgedSkills])
}
