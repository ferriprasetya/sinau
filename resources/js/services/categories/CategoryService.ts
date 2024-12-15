import { buildParams } from '@/lib/buildParams'
import { mapCategoryList } from './CategoryMapper'

export const getListCategory = async (search: string) => {
  const queryParams = buildParams({ search })
  const response = await window.axios.get(`/api/categories${queryParams}`)
  console.log(response)
  return mapCategoryList(response?.data?.data)
}
