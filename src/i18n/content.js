// German data is the source (synced from Jobhunt). English text lives in overlay files keyed by id,
// so a data sync never has to touch the translations. Missing English entries fall back to German.
import skillsEn from '../data/i18n/en/skills.json'
import rolesEn from '../data/i18n/en/roles.json'
import clustersEn from '../data/i18n/en/clusters.json'

const OVERLAYS = {
  en: { skills: skillsEn, roles: rolesEn, clusters: clustersEn },
}

function overlay(item, kind, lang) {
  const t = OVERLAYS[lang]?.[kind]?.[item.id]
  return t ? { ...item, ...t } : item
}

export const localizeSkill = (skill, lang) => overlay(skill, 'skills', lang)
export const localizeRole = (role, lang) => overlay(role, 'roles', lang)
export const localizeCluster = (cluster, lang) => overlay(cluster, 'clusters', lang)
