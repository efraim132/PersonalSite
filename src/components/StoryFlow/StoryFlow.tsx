import type { CSSProperties } from 'react'
import styles from './StoryFlow.module.css'

export interface StoryFlowStep {
  label: string
  title: string
  detail: string
}

interface StoryFlowProps {
  title: string
  description?: string
  steps: StoryFlowStep[]
}

export default function StoryFlow({
  title,
  description,
  steps,
}: StoryFlowProps) {
  const flowStyle = {
    '--flow-columns': steps.length,
  } as CSSProperties

  return (
    <figure className={styles.figure}>
      <figcaption className={styles.caption}>
        <span className={styles.kicker}>Architecture flow</span>
        <strong className={styles.title}>{title}</strong>
        {description != null && (
          <span className={styles.description}>{description}</span>
        )}
      </figcaption>

      <ol className={styles.flow} style={flowStyle}>
        {steps.map((step) => (
          <li key={`${step.label}-${step.title}`} className={styles.step}>
            <span className={styles.label}>{step.label}</span>
            <strong>{step.title}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}
