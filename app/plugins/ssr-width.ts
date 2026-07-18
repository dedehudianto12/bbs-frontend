// Plugin SSR width untuk mencegah hydration error komponen shadcn-vue
// yang membaca lebar viewport saat SSR (Sidebar, dll).
// Sumber: https://www.shadcn-vue.com/docs/installation/nuxt
export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const style = document.createElement('style')
  style.textContent = `
    @media (width < 768px) {
      html:not(.ssr-width) body:before { content: 'xs' }
    }
    @media (768px <= width < 1024px) {
      html:not(.ssr-width) body:before { content: 'sm' }
    }
    @media (1024px <= width < 1280px) {
      html:not(.ssr-width) body:before { content: 'md' }
    }
    @media (1280px <= width) {
      html:not(.ssr-width) body:before { content: 'lg' }
    }
  `
  document.head.appendChild(style)
  document.documentElement.classList.add('ssr-width')
})
