import { Education, EducationList } from '@/types/education'

export function mapEducationList(response: any): EducationList {
  return {
    currentPage: response.current_page,
    lastPage: response.last_page,
    data: response.data?.length
      ? response.data?.map(
          (item: any): Education => ({
            id: item.id,
            slug: item.slug,
            label: item.label,
          }),
        )
      : [],
  }
}
