import roles from './roles.json'

/**
 * SkillForge Matching Engine (offline, hardcoded)
 *
 * Scoring:
 *   60% required-tag coverage
 * + 20% bonus-tag coverage
 * + 15% cluster diversity
 * + 5%  level bonus
 *
 * Rules:
 * - Standard roles: score >= 25 (deliberately low!)
 * - Revelation roles: score >= 30 AND 3+ different clusters
 * - Fallback: always show at least 3 matches
 * - Max 8 standard + max 3 revelations
 */

export function computeMatches(forgedSkills) {
  if (!forgedSkills.length) return { matches: [], revelations: [] }

  // Collect all tags from forged skills
  const allTags = new Set()
  forgedSkills.forEach(skill => {
    skill.tags.forEach(tag => allTags.add(tag))
  })

  // Unique cluster count
  const clusterSet = new Set(forgedSkills.map(s => s.clusterId))
  const clusterCount = clusterSet.size

  // Average level of forged skills
  const avgLevel = forgedSkills.reduce((sum, s) => sum + s.level, 0) / forgedSkills.length

  // Score each role
  const scored = roles.map(role => {
    // Required tag coverage (60%)
    const requiredHits = role.requiredTags.filter(t => allTags.has(t)).length
    const requiredScore = role.requiredTags.length > 0
      ? (requiredHits / role.requiredTags.length) * 60
      : 0

    // Bonus tag coverage (20%)
    const bonusHits = (role.bonusTags || []).filter(t => allTags.has(t)).length
    const bonusTotal = (role.bonusTags || []).length
    const bonusScore = bonusTotal > 0
      ? (bonusHits / bonusTotal) * 20
      : 0

    // Cluster diversity (15%)
    const diversityScore = Math.min(clusterCount / Math.max(role.minClusters, 1), 2) * 7.5

    // Level bonus (5%)
    const levelScore = (avgLevel / 5) * 5

    const totalScore = requiredScore + bonusScore + diversityScore + levelScore

    return {
      ...role,
      score: Math.round(totalScore * 10) / 10,
    }
  })

  // Split standard vs revelation
  const standardCandidates = scored
    .filter(r => !r.isRevelation && r.score >= 25)
    .sort((a, b) => b.score - a.score)

  const revelationCandidates = scored
    .filter(r => r.isRevelation && r.score >= 30 && clusterCount >= 3)
    .sort((a, b) => b.score - a.score)

  // Limit results
  let matches = standardCandidates.slice(0, 8)
  const revelations = revelationCandidates.slice(0, 3)

  // Fallback: always at least 3 matches total
  if (matches.length < 3) {
    const fallbacks = scored
      .filter(r => !r.isRevelation && !matches.some(m => m.id === r.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3 - matches.length)
    matches = [...matches, ...fallbacks]
  }

  return { matches, revelations }
}
