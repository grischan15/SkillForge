import { Cog, Users, Sprout, Cpu, TrendingUp, GraduationCap, Circle } from 'lucide-react'

// Lucide replaces the emoji icons from clusters.json (P3 CD: no emoji on brand surfaces)
const ICONS = {
  engineering: Cog,
  leadership: Users,
  coaching: Sprout,
  'ai-digital': Cpu,
  business: TrendingUp,
  didaktik: GraduationCap,
}

export default function ClusterIcon({ id, size = 16, className = '' }) {
  const Icon = ICONS[id] || Circle
  return <Icon size={size} strokeWidth={2} className={className} aria-hidden="true" />
}
