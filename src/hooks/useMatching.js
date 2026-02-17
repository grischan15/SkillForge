import { useMemo } from 'react'
import { computeMatches } from '../data/matchingEngine'

export function useMatching(forgedSkills) {
  return useMemo(() => {
    if (forgedSkills.length === 0) {
      return { matches: [], revelations: [] }
    }
    return computeMatches(forgedSkills)
  }, [forgedSkills])
}
