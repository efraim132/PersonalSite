export interface Project {
  id: string
  name: string
  platform: string
  date: string
  sortDate: string
  url: string
  description?: string
  featured?: boolean
  detailRoute?: string
  tags?: string[]
}

export const projects: Project[] = [
  {
    id: 'eenet',
    name: 'ComputerCraft EENet',
    platform: 'Lua',
    date: '10/28/2025',
    sortDate: '2025-10-28',
    url: 'https://github.com/GrebCo/CC-Tweaked-Amazon-OS',
    description: 'A networking and operating system framework for ComputerCraft Tweaked in Minecraft.',
    featured: true,
    detailRoute: '/projects/eenet',
    tags: ['Lua', 'ComputerCraft', 'Networking'],
  },
  {
    id: 'superlua',
    name: 'SuperLua Transpiler',
    platform: 'Python/Lua',
    date: '09/28/2025',
    sortDate: '2025-09-28',
    url: 'https://efraim132.github.io/SuperLua/index.html',
    description: 'A transpiler that compiles a superset of Lua with modern language features down to standard Lua.',
    featured: true,
    detailRoute: '/projects/superlua',
    tags: ['Python', 'Lua', 'Compiler Design'],
  },
  {
    id: 'react-todo-app',
    name: 'React Todo Web App',
    platform: 'Open Source Web',
    date: '08/10/2025',
    sortDate: '2025-08-10',
    url: 'https://reacttodo.efraim.us/',
    tags: ['React', 'TypeScript'],
  },
  {
    id: 'react-todo-repo',
    name: 'React Todo Repo',
    platform: 'Open Source Web',
    date: '08/10/2025',
    sortDate: '2025-08-10',
    url: 'https://github.com/efraim132/ReactTodo',
    tags: ['React', 'TypeScript'],
  },
  {
    id: 'primer-template',
    name: 'React Template for Primer',
    platform: 'Open Source Web',
    date: '08/08/2025',
    sortDate: '2025-08-08',
    url: 'https://github.com/efraim132/PrimerTemplate',
    tags: ['React', 'Open Source'],
  },
  {
    id: 'recipe-finder',
    name: 'Recipe Finder',
    platform: 'Web',
    date: '3/12/2025',
    sortDate: '2025-03-12',
    url: 'https://github.com/efraim132/RecipeSearcher',
    tags: ['Web'],
  },
  {
    id: 'weather-app',
    name: 'Weather Typescript Application',
    platform: 'Web',
    date: '11/11/2024',
    sortDate: '2024-11-11',
    url: 'https://github.com/efraim132/WeatherDashboard',
    tags: ['TypeScript', 'Web'],
  },
  {
    id: 'todo-app',
    name: 'Todo Typescript Application',
    platform: 'Web',
    date: '11/11/2024',
    sortDate: '2024-11-11',
    url: 'https://todo.efraim.us',
    tags: ['TypeScript', 'Web'],
  },
  {
    id: 'blog',
    name: 'Blog Website',
    platform: 'Web',
    date: '10/15/2024',
    sortDate: '2024-10-15',
    url: 'https://blog.efraim.us',
    tags: ['Web'],
  },
  {
    id: 'personal-site',
    name: 'Personal Website',
    platform: 'Web',
    date: '10/9/2024',
    sortDate: '2024-10-09',
    url: 'https://github.com/efraim132/PersonalSite',
    tags: ['React', 'Web'],
  },
  {
    id: 'lha6',
    name: 'LHA6 Landing Page',
    platform: 'Web',
    date: '9/16/2020',
    sortDate: '2020-09-16',
    url: 'https://efraim132.github.io/USSAmerica/',
    tags: ['Web'],
  },
  {
    id: 'happy-content',
    name: 'Happy Content Generator',
    platform: 'Web',
    date: '9/11/2018',
    sortDate: '2018-09-11',
    url: 'https://github.com/WilliamDann/hack2018',
    tags: ['Hackathon', 'Web'],
  },
  {
    id: 'little-knight',
    name: 'Little Knight',
    platform: 'Windows',
    date: '8/24/2018',
    sortDate: '2018-08-24',
    url: 'https://github.com/efraim132/LittleKnight',
    tags: ['Game', 'Windows'],
  },
]
