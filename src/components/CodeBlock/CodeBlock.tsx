import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import lua from 'highlight.js/lib/languages/lua'
import plaintext from 'highlight.js/lib/languages/plaintext'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import './hljs-theme.css'
import styles from './CodeBlock.module.css'

hljs.registerLanguage('json', json)
hljs.registerLanguage('lua', lua)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('python', python)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)

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
  const trimmed = codeString.trim()
  const lines = trimmed.split('\n')
  const normalizedLanguage = language.toLowerCase()
  let highlightLanguage = normalizedLanguage

  if (normalizedLanguage === 'superlua') {
    highlightLanguage = 'lua'
  }

  if (normalizedLanguage === 'minimark') {
    highlightLanguage = 'plaintext'
  }

  useEffect(() => {
    if (codeRef.current != null) {
      codeRef.current.textContent = trimmed
      codeRef.current.removeAttribute('data-highlighted')
      hljs.highlightElement(codeRef.current)
    }
  }, [highlightLanguage, trimmed])

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
        <code ref={codeRef} className={`language-${highlightLanguage} ${styles.code}`}>
          {trimmed}
        </code>
      </pre>
    </div>
  )
}
