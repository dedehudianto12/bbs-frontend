interface ConfirmOptions {
  title: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
}

interface ConfirmState {
  open: boolean
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  resolve: ((v: boolean) => void) | null
}

export function useConfirm() {
  const state = useState<ConfirmState | null>('__confirm', () => null)

  function open(opts: ConfirmOptions): Promise<boolean> {
    return new Promise((resolve) => {
      state.value = {
        open: true,
        title: opts.title,
        message: opts.message ?? '',
        confirmLabel: opts.confirmLabel ?? 'Hapus',
        cancelLabel: opts.cancelLabel ?? 'Batal',
        resolve,
      }
    })
  }

  function close(value: boolean) {
    if (state.value?.resolve) {
      state.value.resolve(value)
    }
    state.value = null
  }

  return {
    state: computed(() => state.value),
    open,
    close,
  }
}
