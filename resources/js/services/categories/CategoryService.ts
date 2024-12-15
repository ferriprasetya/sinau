import { buildParams } from '@/lib/buildParams'
import { mapCategoryList, mapPaginatedCategoryList } from './CategoryMapper'

export const getListCategory = async (search: string) => {
  const queryParams = buildParams({ search })
  const response = await window.axios.get(`/api/categories${queryParams}`)
  return mapCategoryList(response?.data?.data)
}

export const getPaginatedListCategory = async (page: number) => {
  const queryParams = buildParams({ page })
  const response = await window.axios.get(`/categories${queryParams}`)
  return mapPaginatedCategoryList(response?.data?.data)
}
