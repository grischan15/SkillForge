// Checks that every skill, role and cluster has an English overlay entry with matching list lengths.
// Run after each data sync from Jobhunt: npm run check:i18n
import { readFileSync } from 'node:fs'

const load = (p) => JSON.parse(readFileSync(new URL(`../src/data/${p}`, import.meta.url), 'utf8'))
const problems = []

const checks = [
  ['skills.json', 'i18n/en/skills.json', ['name', 'keyMetric']],
  ['roles.json', 'i18n/en/roles.json', ['title', 'description']],
  ['clusters.json', 'i18n/en/clusters.json', ['label', 'labelShort']],
]

for (const [src, en, required] of checks) {
  const items = load(src)
  const overlay = load(en)
  const ids = new Set(items.map((i) => i.id))
  for (const item of items) {
    const t = overlay[item.id]
    if (!t) { problems.push(`${src}: ${item.id} has no English entry`); continue }
    for (const f of required) if (!t[f]) problems.push(`${src}: ${item.id} missing English ${f}`)
    for (const f of ['evidence', 'positions']) {
      if (Array.isArray(item[f]) && Array.isArray(t[f]) && item[f].length !== t[f].length) {
        problems.push(`${src}: ${item.id} ${f} has ${item[f].length} German but ${t[f].length} English entries`)
      }
    }
    for (const f of ['uniqueValue', 'businessImpact', 'whyFit']) {
      if (item[f] && !t[f]) problems.push(`${src}: ${item.id} missing English ${f}`)
    }
  }
  for (const id of Object.keys(overlay)) if (!ids.has(id)) problems.push(`${en}: ${id} no longer exists in ${src}`)
}

if (problems.length) {
  console.error(`${problems.length} i18n problem(s):\n- ` + problems.join('\n- '))
  process.exit(1)
}
console.log('i18n OK: all skills, roles and clusters have English text')
