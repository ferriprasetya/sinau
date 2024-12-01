import axios from 'axios'
import {
  mapQuestionAnswers,
  mapQuestionDetail,
  mapQuestionList,
} from './QuestionMapper'
import { AnswerQuestionRequest, QuestionListFilter } from '@/types/question'
import { buildParams } from '@/lib/buildParams'
import convertObjectCamelToSnakeCase from '@/lib/convertObjectCamelToSnakeCase'

export const getListQuestion = async (filter: QuestionListFilter) => {
  const queryString = buildParams(filter)
  const response = await axios.get(`/api/questions${queryString}`)
  return mapQuestionList(response?.data)
}

export const getQuestionDetail = async (slug: string) => {
  const response = await axios.get(`/api/questions/${slug}`)
  return mapQuestionDetail(response?.data)
}

export const getQuestionAnswers = async (questionId: string) => {
  const response = await axios.get(`/api/questions/${questionId}/answers`)
  return mapQuestionAnswers(response?.data?.data)
}

export const submitAnswerQuestion = async (payload: AnswerQuestionRequest) => {
  const response = await axios.post(
    '/api/questions/answer',
    convertObjectCamelToSnakeCase(payload),
  )
  return response
}

export const markAnswerAsCorrect = async (answerId: number) => {
  const response = await axios.patch(
    `/api/questions/answer/${answerId}/correct`,
  )
  return response
}

export const removeAnswerAsCorrect = async (answerId: number) => {
  const response = await axios.patch(
    `/api/questions/answer/${answerId}/removeCorrect`,
  )
  return response
}
