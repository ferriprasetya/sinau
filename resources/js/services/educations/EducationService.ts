import { buildParams } from '@/lib/buildParams'
import { mapEducationList } from './EducationMapper'

export const getListEducation = async (page: number) => {
  const queryParams = buildParams({ page })
  const response = await window.axios.get(`/educations${queryParams}`)
  return mapEducationList(response?.data)
}
