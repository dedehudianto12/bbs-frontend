// TODO: Ganti dengan fetch ke backend Go saat API sudah tersedia.
import { settingsSchema, type Settings } from '~/types/settings'
import { mockSettings } from '~/data/mock/settings'

// ponytail: useState for shared reactivity across admin + public pages
export function useSettings() {
  const settings = useState<Settings>('bbs-settings', () => ({ ...mockSettings }))

  // Validate mock data on first load
  const result = settingsSchema.safeParse(settings.value)
  if (!result.success) {
    console.error('Invalid mock settings data:', result.error.format())
  }

  function update(data: Settings) {
    settings.value = { ...data }
  }

  return { settings, update }
}
