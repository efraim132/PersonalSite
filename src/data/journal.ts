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
    title: 'How GrebKey grew beyond license checks',
    summary:
      'How I kept cached license checks current, repaired billing mismatches, and fixed incomplete API authentication docs.',
    window: 'Spring–Summer 2026',
    type: 'Project notes',
    tags: ['Platform', 'APIs', 'SDKs'],
  },
  {
    slug: '/writing/realtime-operations',
    title: 'Keeping live transcription running during server failures',
    summary:
      'How I tested the real transcription path, prevented duplicate fallback servers, and drained live requests before cleanup.',
    window: 'Summer 2026',
    type: 'Private project notes',
    tags: ['Operations', 'Reliability', 'Transcription'],
    privateCaseStudy: true,
  },
  {
    slug: '/writing/private-event-media',
    title: 'Building a wedding image sharing service',
    summary:
      'How I made large phone photos load quickly, enforced a shared storage limit, and kept original files private.',
    window: 'Summer 2026',
    type: 'Private project notes',
    tags: ['Cloud', 'Media', 'Privacy'],
    privateCaseStudy: true,
  },
  {
    slug: '/projects/eenet',
    title: 'Building a tiny internet inside Minecraft',
    summary:
      'A browser, DNS, markup language, UI framework, and scripting sandbox for ComputerCraft.',
    window: 'October 2025',
    type: 'Project story',
    tags: ['Lua', 'ComputerCraft', 'Networking'],
  },
  {
    slug: '/projects/superlua',
    title: 'Teaching Lua a few new tricks',
    summary:
      'Why I tried writing a small transpiler, what broke, and why the parser stopped being a regular expression.',
    window: 'September 2025',
    type: 'Project story',
    tags: ['Python', 'Lua', 'Compilers'],
  },
]
