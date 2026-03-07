import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import './hljs-theme.css'
import styles from './CodeBlock.module.css'

interface CodeBlockProps {
  codeString: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({
  codeString,
  language = 'typescript',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.removeAttribute('data-highlighted')
      hljs.highlightElement(codeRef.current)
    }
  }, [codeString, language])

  const trimmed = codeString.trim()
  const lines = trimmed.split('\n')

  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.language}>{language}</span>
        </div>
      )}
      <pre className={styles.pre}>
        {showLineNumbers && (
          <span className={styles.lineNumbers} aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i} className={styles.lineNumber}>{i + 1}</span>
            ))}
          </span>
        )}
        <code ref={codeRef} className={`language-${language} ${styles.code}`}>
          {trimmed}
        </code>
      </pre>
    </div>
  )
}
