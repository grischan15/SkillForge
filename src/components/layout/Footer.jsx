export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-border-light text-center text-sm text-ink-muted">
      <p>
        <a
          href="https://www.p3coaching.de"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-p3-red transition-colors duration-normal"
        >
          P3 Coaching
        </a>
        {' '}&middot;{' '}
        <a
          href="https://www.linkedin.com/in/christian-schmidt-p3coaching"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-p3-red transition-colors duration-normal"
        >
          Christian Schmidt
        </a>
        {' '}&middot;{' '}
        <a
          href="https://www.p3coaching.de/impressum"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-p3-red transition-colors duration-normal"
        >
          Impressum
        </a>
      </p>
    </footer>
  )
}
