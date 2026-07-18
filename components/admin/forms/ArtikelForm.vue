<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { articleSchema, type Article } from '~/types/article'

const props = defineProps<{
  mode: 'create' | 'edit'
  initialData?: Article
}>()

const emit = defineEmits<{
  submit: [data: Omit<Article, 'id' | 'slug'>]
}>()

// ── available tags from mock data ──
const tagOptions = ['Tips', 'Panduan', 'Proyek']

// ── form fields ──
const title = ref(props.initialData?.title ?? '')
const tag = ref(props.initialData?.tag ?? tagOptions[0])
const publishedAt = ref(props.initialData?.publishedAt ?? new Date().toISOString().slice(0, 10))
const excerpt = ref(props.initialData?.excerpt ?? '')

const errors = ref<Record<string, string>>({})

// ── Tiptap editor ──
const editor = useEditor({
  content: props.initialData?.content ?? '',
  extensions: [StarterKit],
})

// ── toolbar button helper ──
function toolbarBtn(action: string, attrs?: Record<string, unknown>) {
  if (!editor.value) return
  const chain = editor.value.chain().focus()
  ;(chain as Record<string, Function>)[action](attrs).run()
}

function isActive(action: string, attrs?: Record<string, unknown>) {
  if (!editor.value) return false
  return (editor.value as Record<string, Function>).isActive(action, attrs ?? {})
}

// ── validation ──
function validate(): boolean {
  errors.value = {}
  const html = editor.value?.getHTML() ?? ''

  const result = articleSchema.safeParse({
    id: props.mode === 'edit' ? props.initialData?.id : 'new',
    slug: 'temp',
    title: title.value,
    excerpt: excerpt.value,
    content: html,
    image: '/images/articles/placeholder.jpg',
    tag: tag.value,
    publishedAt: publishedAt.value,
    author: 'Tim BBS Conveyor',
  })

  if (result.success && html.trim().length === 0) {
    errors.value.content = 'Konten tidak boleh kosong.'
    return false
  }

  if (result.success) return true

  for (const [field, issue] of Object.entries(result.error.format())) {
    if (field === '_errors') continue
    const fieldErrors = (issue as { _errors: string[] })._errors
    if (fieldErrors?.length) {
      errors.value[field] = fieldErrors[0]
    }
  }

  return false
}

function onSubmit() {
  if (!validate()) return

  emit('submit', {
    title: title.value,
    excerpt: excerpt.value,
    content: editor.value?.getHTML() ?? '',
    image: '/images/articles/placeholder.jpg',
    tag: tag.value,
    publishedAt: publishedAt.value,
    author: 'Tim BBS Conveyor',
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div class="space-y-2">
      <Label for="art-title">Judul</Label>
      <Input id="art-title" v-model="title" placeholder="Judul artikel..." />
      <p v-if="errors.title" class="text-sm text-red-600">{{ errors.title }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-2">
        <Label for="art-tag">Kategori / Tag</Label>
        <select
          id="art-tag"
          v-model="tag"
          class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option v-for="t in tagOptions" :key="t" :value="t">{{ t }}</option>
        </select>
        <p v-if="errors.tag" class="text-sm text-red-600">{{ errors.tag }}</p>
      </div>

      <div class="space-y-2">
        <Label for="art-date">Tanggal Publikasi</Label>
        <Input id="art-date" v-model="publishedAt" type="date" />
        <p v-if="errors.publishedAt" class="text-sm text-red-600">{{ errors.publishedAt }}</p>
      </div>
    </div>

    <div class="space-y-2">
      <Label for="art-excerpt">Kutipan Singkat</Label>
      <textarea
        id="art-excerpt"
        v-model="excerpt"
        rows="2"
        placeholder="Ringkasan artikel dalam 1–2 kalimat untuk pratinjau kartu..."
        class="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <p v-if="errors.excerpt" class="text-sm text-red-600">{{ errors.excerpt }}</p>
    </div>

    <!-- Tiptap Editor -->
    <div class="space-y-2">
      <Label>Konten</Label>
      <div v-if="editor" class="rounded-md border border-input overflow-hidden">
        <!-- Toolbar -->
        <div class="flex flex-wrap gap-1 px-3 py-2 border-b border-input bg-neutral-50">
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('bold') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Bold"
            @click="toolbarBtn('toggleBold')"
          ><strong>B</strong></button>
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('italic') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Italic"
            @click="toolbarBtn('toggleItalic')"
          ><em>I</em></button>
          <span class="w-px bg-neutral-300 mx-1" />
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('heading', { level: 2 }) ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Heading 2"
            @click="toolbarBtn('toggleHeading', { level: 2 })"
          >H2</button>
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('heading', { level: 3 }) ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Heading 3"
            @click="toolbarBtn('toggleHeading', { level: 3 })"
          >H3</button>
          <span class="w-px bg-neutral-300 mx-1" />
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('bulletList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Bullet List"
            @click="toolbarBtn('toggleBulletList')"
          >• L</button>
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('orderedList') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Numbered List"
            @click="toolbarBtn('toggleOrderedList')"
          >1. L</button>
          <span class="w-px bg-neutral-300 mx-1" />
          <button
            type="button"
            class="p-1.5 rounded text-sm hover:bg-neutral-200 transition-colors"
            :class="isActive('link') ? 'bg-neutral-200 text-neutral-900' : 'text-neutral-600'"
            title="Link"
            @click="() => {
              const url = window.prompt('URL:')
              if (url) toolbarBtn('toggleLink', { href: url })
              else if (isActive('link')) toolbarBtn('toggleLink')
            }"
          >🔗</button>
        </div>
        <!-- Editor area -->
        <div class="p-4 min-h-[250px] prose prose-neutral max-w-none focus:outline-none" @click="editor?.chain().focus()">
          <EditorContent :editor="editor" class="min-h-[200px]" />
        </div>
      </div>
      <p v-else class="text-sm text-neutral-400">Memuat editor...</p>
      <p v-if="errors.content" class="text-sm text-red-600">{{ errors.content }}</p>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <Button type="submit">
        {{ mode === 'create' ? 'Simpan' : 'Perbarui' }}
      </Button>
    </div>
  </form>
</template>
