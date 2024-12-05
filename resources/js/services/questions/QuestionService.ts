import {
  mapQuestionAnswers,
  mapQuestionDetail,
  mapQuestionList,
} from './QuestionMapper'
import { QuestionListFilter } from '@/types/question'
import { buildParams } from '@/lib/buildParams'

export const getListQuestion = async (filter: QuestionListFilter) => {
  const queryString = buildParams(filter)
  const response = await window.axios.get(`/api/questions${queryString}`)
  return mapQuestionList(response?.data)
}

export const getQuestionDetail = async (slug: string) => {
  const response = await window.axios.get(`/api/questions/${slug}`)
  return mapQuestionDetail(response?.data)
}

export const getQuestionAnswers = async (questionId: string) => {
  const response = await window.axios.get(
    `/api/questions/${questionId}/answers`,
  )
  return mapQuestionAnswers(response?.data?.data)
}
