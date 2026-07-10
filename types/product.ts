export interface Product {
  id: string
  slug: string
  name: string
  category: string
  description: string
  image: string
  specs: Record<string, string>
}
