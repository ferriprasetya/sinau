import { Category } from '@/types/category'

export function mapCategoryList(response: any): Category[] {
  return response?.map((category: any) => ({
    id: category.id,
    slug: category.slug,
    label: category.label,
  }))
}
