import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('mindshift-lang')
    return saved === 'he' || saved === 'en' ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem('mindshift-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [lang])

  const value = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === 'en' ? 'he' : 'en')),
    t: translations[lang],
    isRTL: lang === 'he',
  }

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
