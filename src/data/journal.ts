export interface JournalEntry {
  slug: string
  title: string
  summary: string
  window: string
  type: string
  tags: string[]
  privateCaseStudy?: boolean
}

export const journalEntries: JournalEntry[] = [
  {
    slug: '/writing/grebkey',
    title: 'From license checks to a developer platform',
    summary:
      'How an API, dashboard, billing flow, documentation, and two SDKs became one coherent product.',
    window: 'Spring–Summer 2026',
    type: 'Build log',
    tags: ['Platform', 'APIs', 'SDKs'],
  },
  {
    slug: '/writing/realtime-operations',
    title: 'Making a real-time service operable',
    summary:
      'The feature work behind capacity controls, health signals, recovery paths, and useful operator tooling.',
    window: 'Summer 2026',
    type: 'Private case study',
    tags: ['Operations', 'Reliability', 'Product'],
    privateCaseStudy: true,
  },
  {
    slug: '/writing/private-event-media',
    title: 'A private event-media workflow that stayed simple',
    summary:
      'Guest uploads, mobile curation, progressive galleries, and careful sharing without exposing the event.',
    window: 'Summer 2026',
    type: 'Private case study',
    tags: ['Cloud', 'Media', 'Privacy'],
    privateCaseStudy: true,
  },
]
