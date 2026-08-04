<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

let externalUpdate = false

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    Placeholder.configure({ placeholder: 'Tulis konten artikel...' }),
    TextStyle,
    Color,
  ],
  onUpdate: ({ editor }) => {
    if (externalUpdate) return
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      class: 'prose-mirror-editor',
      style: 'min-height:200px;padding:16px;outline:none;font-size:14px;line-height:1.75;font-family:inherit',
    },
  },
})

const ACTIVE_BG = 'rgb(var(--line))'

const PRESET_COLORS = [
  '#1C1E22', // ink
  '#d6b045', // gold
  '#5B6068', // muted
  '#E4571B', // orange (for legacy / warnings)
  '#2E965C', // green / signal
  '#2563EB', // blue
  '#DC2626', // red
  '#7C3AED', // purple
]

const showColorPicker = ref(false)
const colorBtnRef = ref<HTMLElement | null>(null)
const colorPickerRef = ref<HTMLElement | null>(null)

const currentColor = computed(() =>
  editor.value?.getAttributes('textStyle').color || ''
)

function applyColor(color: string) {
  if (color === '') {
    editor.value?.chain().focus().unsetColor().run()
  } else {
    editor.value?.chain().focus().setColor(color).run()
  }
  showColorPicker.value = false
}

function onCustomColorInput(e: Event) {
  const input = e.target as HTMLInputElement
  applyColor(input.value)
}

// Close on outside click
function onClickOutside(e: MouseEvent) {
  if (
    showColorPicker.value &&
    colorPickerRef.value &&
    !colorPickerRef.value.contains(e.target as Node) &&
    colorBtnRef.value &&
    !colorBtnRef.value.contains(e.target as Node)
  ) {
    showColorPicker.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  editor.value?.destroy()
})

function setLink() {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL:', previousUrl ?? 'https://')
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().unsetLink().run()
    return
  }
  editor.value?.chain().focus().setLink({ href: url }).run()
}

watch(() => props.modelValue, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    externalUpdate = true
    editor.value.commands.setContent(val, { emitUpdate: false })
    externalUpdate = false
  }
})
</script>

<template>
  <div style="border:1px solid rgb(var(--line));border-radius:8px;overflow:hidden">
    <!-- Toolbar -->
    <div style="display:flex;gap:2px;padding:8px 10px;border-bottom:1px solid rgb(var(--line));background:rgb(var(--paper-soft));flex-wrap:wrap;align-items:center">
      <!-- Text style -->
      <button type="button" @click="editor?.chain().focus().toggleBold().run()"
        :style="{ background: editor?.isActive('bold') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="font-weight:700">B</button>
      <button type="button" @click="editor?.chain().focus().toggleItalic().run()"
        :style="{ background: editor?.isActive('italic') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="font-style:italic">I</button>
      <button type="button" @click="editor?.chain().focus().toggleUnderline().run()"
        :style="{ background: editor?.isActive('underline') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="text-decoration:underline">U</button>
      <button type="button" @click="editor?.chain().focus().toggleStrike().run()"
        :style="{ background: editor?.isActive('strike') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="text-decoration:line-through">S</button>

      <span class="toolbar-divider" />

      <!-- Color picker -->
      <div style="position:relative">
        <button
          ref="colorBtnRef"
          type="button"
          @click.stop="showColorPicker = !showColorPicker"
          :style="{ background: showColorPicker || editor?.isActive('textStyle') ? ACTIVE_BG : 'transparent' }"
          class="toolbar-btn" title="Warna teks"
        >
          <span style="display:flex;align-items:center;gap:3px">
            <span
              style="display:inline-block;width:12px;height:12px;border-radius:3px;border:1px solid rgb(var(--line))"
              :style="{ background: currentColor || 'rgb(var(--ink))' }"
            />
            <span style="font-size:12px;font-weight:600">A</span>
          </span>
        </button>

        <!-- Color dropdown -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="translate-y-1 opacity-0 scale-95"
          enter-to-class="translate-y-0 opacity-100 scale-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="translate-y-0 opacity-100 scale-100"
          leave-to-class="translate-y-1 opacity-0 scale-95"
        >
          <div
            v-if="showColorPicker"
            ref="colorPickerRef"
            style="position:absolute;top:calc(100% + 6px);left:0;background:white;border:1px solid rgb(var(--line));border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,0.1);padding:10px;z-index:50;min-width:200px"
            @click.stop
          >
            <!-- Preset swatches -->
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
              <button
                v-for="c in PRESET_COLORS"
                :key="c"
                type="button"
                @click="applyColor(c)"
                :style="{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: c,
                  border: currentColor === c ? '2px solid rgb(var(--ink))' : '2px solid transparent',
                  cursor: 'pointer',
                  outline: currentColor === c ? '2px solid white' : 'none',
                  boxShadow: currentColor === c ? '0 0 0 2px rgb(var(--line))' : 'none',
                  padding: 0,
                }"
                :title="c"
              />
            </div>

            <!-- Divider -->
            <div style="height:1px;background:rgb(var(--line));margin:0 0 8px 0" />

            <!-- Custom color input -->
            <label
              style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:12px;color:rgb(var(--muted));transition:background 0.15s"
              class="hover:bg-[rgb(var(--paper-soft))]"
            >
              <span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;border:1px dashed rgb(var(--line));overflow:hidden">
                <span style="font-size:13px">+</span>
              </span>
              <span>Custom...</span>
              <input
                type="color"
                :value="currentColor || '#1C1E22'"
                @input="onCustomColorInput"
                style="position:absolute;opacity:0;width:0;height:0"
              />
            </label>

            <!-- Remove color -->
            <button
              v-if="currentColor"
              type="button"
              @click="applyColor('')"
              style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;cursor:pointer;font-size:12px;color:rgb(var(--muted));border:none;background:transparent;width:100%;margin-top:2px;font-family:inherit;transition:background 0.15s"
              class="hover:bg-[rgb(var(--paper-soft))]"
            >
              <span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px">✕</span>
              <span>Hapus warna</span>
            </button>
          </div>
        </Transition>
      </div>

      <span class="toolbar-divider" />

      <!-- Headings -->
      <button type="button" @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :style="{ background: editor?.isActive('heading', { level: 2 }) ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="font-weight:600;font-size:12px">H2</button>
      <button type="button" @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :style="{ background: editor?.isActive('heading', { level: 3 }) ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" style="font-weight:600;font-size:12px">H3</button>

      <span class="toolbar-divider" />

      <!-- Lists -->
      <button type="button" @click="editor?.chain().focus().toggleBulletList().run()"
        :style="{ background: editor?.isActive('bulletList') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn">•</button>
      <button type="button" @click="editor?.chain().focus().toggleOrderedList().run()"
        :style="{ background: editor?.isActive('orderedList') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn">1.</button>

      <span class="toolbar-divider" />

      <!-- Block elements -->
      <button type="button" @click="editor?.chain().focus().toggleBlockquote().run()"
        :style="{ background: editor?.isActive('blockquote') ? ACTIVE_BG : 'transparent' }"
        class="toolbar-btn" title="Kutipan">❝</button>
      <button type="button" @click="setLink"
        :style="{ color: editor?.isActive('link') ? 'rgb(var(--accent))' : 'inherit', background: editor?.isActive('link') ? 'rgb(var(--line))' : 'transparent' }"
        class="toolbar-btn" title="Tautan">🔗</button>
      <button type="button" @click="editor?.chain().focus().setHorizontalRule().run()"
        class="toolbar-btn" title="Garis pemisah">—</button>
    </div>

    <!-- Editor -->
    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped>
.toolbar-btn {
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-family: inherit;
  color: rgb(var(--ink));
  background: transparent;
  transition: background 0.15s;
}
.toolbar-btn:hover {
  background: rgb(var(--line) / 0.5);
}
.toolbar-divider {
  width: 1px;
  background: rgb(var(--line));
  margin: 4px 4px;
  align-self: stretch;
}
</style>
