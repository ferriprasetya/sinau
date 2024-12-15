import {
  mapQuestionAnswers,
  mapQuestionDetail,
  mapQuestionList,
} from './QuestionMapper'
import { QuestionListFilter } from '@/types/question'
import { buildParams } from '@/lib/buildParams'
import convertObjectCamelToSnakeCase from '@/lib/convertObjectCamelToSnakeCase'

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

export const updateQuestionVote = async (
  questionId: string,
  isUpvote: boolean,
) => {
  await window.axios.post(
    `/question/vote`,
    convertObjectCamelToSnakeCase({
      questionId,
      isUpvote,
    }),
    {
      withCredentials: true,
    },
  )
  return true
}

export const updateAnswerVote = async (answerId: number, isUpvote: boolean) => {
  await window.axios.post(
    `/question/answer/vote`,
    convertObjectCamelToSnakeCase({
      answerId,
      isUpvote,
    }),
    {
      withCredentials: true,
    },
  )
  return true
}
