export type Appearance = 'system' | 'light' | 'dark'
export type Surface = 'glass' | 'solid'
export interface AppearancePreferences {
  appearance: Appearance
  surface: Surface
}

export function readPreferences(): AppearancePreferences {
  try {
    const appearance = localStorage.getItem('appearance')
    return {
      appearance:
        appearance === 'light' || appearance === 'dark' ? appearance : 'system',
      surface: localStorage.getItem('surface') === 'solid' ? 'solid' : 'glass',
    }
  } catch {
    return { appearance: 'system', surface: 'glass' }
  }
}

export function applyPreferences({
  appearance,
  surface,
}: AppearancePreferences) {
  document.documentElement.dataset.appearance = appearance
  document.documentElement.dataset.surface = surface
}

export function savePreferences(preferences: AppearancePreferences) {
  applyPreferences(preferences)
  try {
    if (preferences.appearance === 'system')
      localStorage.removeItem('appearance')
    else localStorage.setItem('appearance', preferences.appearance)
    if (preferences.surface === 'glass') localStorage.removeItem('surface')
    else localStorage.setItem('surface', preferences.surface)
  } catch {
    // Appearance still works when browser storage is unavailable.
  }
}
