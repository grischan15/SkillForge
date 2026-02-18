import { useMemo } from 'react'
import { computeMatches } from '../data/matchingEngine'

export function useMatching(forgedSkills) {
  return useMemo(() => {
    if (forgedSkills.length === 0) {
      return { matches: [], revelations: [], forgedTags: new Set() }
    }

    const forgedTags = new Set()
    forgedSkills.forEach(s => s.tags.forEach(t => forgedTags.add(t)))

    const results = computeMatches(forgedSkills)
    return { ...results, forgedTags }
  }, [forgedSkills])
}
