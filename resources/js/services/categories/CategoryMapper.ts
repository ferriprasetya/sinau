import { Category, CategoryList } from '@/types/category'

export function mapCategoryList(response: any): Category[] {
  return response?.map((category: any) => ({
    id: category.id,
    slug: category.slug,
    label: category.label,
  }))
}

export function mapPaginatedCategoryList(response: any): CategoryList {
  return {
    currentPage: response.current_page,
    lastPage: response.last_page,
    data: response.data?.length
      ? response.data?.map(
          (item: any): Category => ({
            id: item.id,
            slug: item.slug,
            label: item.label,
          }),
        )
      : [],
  }
}
