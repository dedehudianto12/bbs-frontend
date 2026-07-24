<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({ heading: { levels: [2, 3] } }),
    Placeholder.configure({ placeholder: 'Tulis konten artikel...' }),
  ],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
  editorProps: {
    attributes: {
      style: 'min-height:200px;padding:12px 16px;outline:none;font-size:14px;line-height:1.75;font-family:inherit',
    },
  },
})

watch(() => props.modelValue, (val) => {
  if (editor.value && val !== editor.value.getHTML()) {
    editor.value.commands.setContent(val, false)
  }
})

onBeforeUnmount(() => { editor.value?.destroy() })
</script>

<template>
  <div style="border:1px solid rgb(var(--line));border-radius:8px;overflow:hidden">
    <!-- Toolbar -->
    <div style="display:flex;gap:2px;padding:8px 10px;border-bottom:1px solid rgb(var(--line));background:rgb(var(--paper-soft));flex-wrap:wrap">
      <button type="button" @click="editor?.chain().focus().toggleBold().run()"
        :style="{background:editor?.isActive('bold')?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit',fontWeight:'700',color:'rgb(var(--ink))'}">B</button>
      <button type="button" @click="editor?.chain().focus().toggleItalic().run()"
        :style="{background:editor?.isActive('italic')?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit',fontStyle:'italic',color:'rgb(var(--ink))'}">I</button>
      <span style="width:1px;background:rgb(var(--line));margin:4px 4px" />
      <button type="button" @click="editor?.chain().focus().toggleHeading({level:2}).run()"
        :style="{background:editor?.isActive('heading',{level:2})?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'12px',fontFamily:'inherit',fontWeight:'600',color:'rgb(var(--ink))'}">H2</button>
      <button type="button" @click="editor?.chain().focus().toggleHeading({level:3}).run()"
        :style="{background:editor?.isActive('heading',{level:3})?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'12px',fontFamily:'inherit',fontWeight:'600',color:'rgb(var(--ink))'}">H3</button>
      <span style="width:1px;background:rgb(var(--line));margin:4px 4px" />
      <button type="button" @click="editor?.chain().focus().toggleBulletList().run()"
        :style="{background:editor?.isActive('bulletList')?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit',color:'rgb(var(--ink))'}">• List</button>
      <button type="button" @click="editor?.chain().focus().toggleOrderedList().run()"
        :style="{background:editor?.isActive('orderedList')?'rgb(var(--line))':'transparent',border:'none',padding:'6px 10px',borderRadius:'5px',cursor:'pointer',fontSize:'13px',fontFamily:'inherit',color:'rgb(var(--ink))'}">1. List</button>
    </div>
    <!-- Editor -->
    <EditorContent :editor="editor" />
  </div>
</template>
