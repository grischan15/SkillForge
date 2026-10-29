import { useLang } from '../../i18n/LanguageContext'

export default function Footer() {
  const { lang } = useLang()
  const en = lang === 'en'
  return (
    <footer className="mt-12 py-6 border-t border-border text-center text-sm text-ink-muted space-y-3">
      {/* LinkedIn CTA */}
      <a
        href="https://www.linkedin.com/in/christian-schmidt-p3coaching"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm no-underline
          bg-linkedin/10 text-linkedin hover:bg-linkedin/20 hover:text-linkedin
          font-semibold transition-colors duration-normal min-h-[48px]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        {en ? 'Christian Schmidt on LinkedIn' : 'Christian Schmidt auf LinkedIn'}
      </a>

      {/* Links */}
      <p>
        <a
          href="https://www.p3coaching.de"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-muted hover:text-terrakotta"
        >
          P3 Coaching
        </a>
        {' '}&middot;{' '}
        <a
          href="https://www.p3coaching.de/impressum"
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-muted hover:text-terrakotta"
        >
          {en ? 'Legal notice' : 'Impressum'}
        </a>
      </p>
    </footer>
  )
}
