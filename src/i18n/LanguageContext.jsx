import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const LANGS = ['de', 'en']
const STORAGE_KEY = 'skillforge-lang'

const META = {
  de: {
    title: 'SkillForge – Christian Schmidt',
    description: 'Interaktive Kompetenz-Schmiede: Entdecke, welche Rollen zu deinem Unternehmen passen.',
  },
  en: {
    title: 'SkillForge – Christian Schmidt',
    description: 'Interactive competence forge: discover which roles fit your company.',
  },
}

// Order: ?lang= in the URL (shareable link) > saved choice > browser language
function detectLang() {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')
    if (LANGS.includes(fromUrl)) return fromUrl
  } catch { /* ignore */ }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(saved)) return saved
  } catch { /* ignore */ }
  const browser = (navigator.language || 'de').toLowerCase()
  return browser.startsWith('de') ? 'de' : 'en'
}

const LanguageContext = createContext({ lang: 'de', setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectLang)

  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return
    setLangState(next)
    try { window.localStorage.setItem(STORAGE_KEY, next) } catch { /* ignore */ }
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', next)
      window.history.replaceState(null, '', url)
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = META[lang].title
    document.querySelector('meta[name="description"]')?.setAttribute('content', META[lang].description)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  return useContext(LanguageContext)
}
