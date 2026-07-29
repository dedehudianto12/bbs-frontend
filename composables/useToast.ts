export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  leaving: boolean
}

let _nextId = 0

export function useToast() {
  const toasts = useState<Toast[]>('__toasts', () => [])

  function add(message: string, type: Toast['type']) {
    const id = _nextId++
    toasts.value = [...toasts.value, { id, message, type, leaving: false }]
    setTimeout(() => dismiss(id), 4000)
  }

  function dismiss(id: number) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx === -1) return
    toasts.value[idx] = { ...toasts.value[idx], leaving: true }
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 260)
  }

  return {
    toasts: computed(() => toasts.value),
    success: (m: string) => add(m, 'success'),
    error: (m: string) => add(m, 'error'),
    info: (m: string) => add(m, 'info'),
    dismiss,
  }
}
